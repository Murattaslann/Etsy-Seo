
import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, EtsyAnalysisData, TitleAnalysisData, ListingAnalysisData, GroundingSource, AnalysisFilters, AnalysisMode } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeEtsy = async (
  query: string, 
  mode: AnalysisMode, 
  filters?: AnalysisFilters
): Promise<AnalysisResult> => {
  const modelId = 'gemini-3-pro-preview';
  
  const filterContext = filters 
    ? `CONTEXT: Category: "${filters.category || 'General'}", Target Audience: "${filters.audience || 'General'}"` 
    : '';

  let prompt = '';

  if (mode === 'keyword') {
    prompt = `
      Act as a Senior Etsy SEO Specialist and Data Analyst. Perform a deep evidence-based analysis for the keyword: "${query}".
      ${filterContext}
      
      LANGUAGE: TURKISH. All labels, descriptions, and generated text must be in Turkish.
      
      You MUST use the Google Search tool to simulate a market scrape.
      CRITICAL CONSTRAINT: You must ONLY search for information related to etsy.com. Use queries like "site:etsy.com ${query} sales", "site:etsy.com ${query} price", "best selling ${query} on etsy".

      Your goal is to calculate metrics based on search snippets rather than hallucinating arbitrary numbers.

      Return a PURE JSON object with the following structure:
      {
        "score": number (0-100, calculated based on high demand and low/medium competition),
        "searchVolumeLabel": string (e.g., "Yüksek (2k+/ay)", "Orta (500/ay)"),
        "competitionLabel": string (e.g., "Çok Yüksek", "Düşük", "Orta"),
        "trendData": [ {"month": "Oca", "value": 50}, ... ] (12 months seasonality curve estimation based on product type, use Turkish month abbreviations),
        "relatedKeywords": [
          { "keyword": "string", "volume": "string", "competition": "High"|"Medium"|"Low", "ctr": "string", "cpc": "string" }
        ] (extract at least 5 long-tail variations found in titles),
        "marketLeaders": [
          { "title": "string", "price": "string", "url": "string" }
        ] (Top 5 actual listing titles found in search. If specific item URL is not found, use a generic search URL for that title on Etsy),
        "generatedTitles": [ "string" ] (3 SEO-optimized titles using the best keywords found, in Turkish or English depending on the keyword market, but instructions in Turkish)
      }
    `;
  } else if (mode === 'title') {
    // Title Analysis Prompt
    prompt = `
      Act as a Senior Etsy SEO Expert. Analyze this specific product title: "${query}".
      ${filterContext}

      LANGUAGE: TURKISH.
      
      Task:
      1. Analyze the title for SEO strength (keyword placement, length, relevance).
      2. Analyze the title for Customer Appeal (readability, emotion, clarity).
      3. Identify the TOP 5 competing listings on Etsy that rank for the main keywords in this title.
      
      Use Google Search to find REAL competitors on Etsy. Query example: "site:etsy.com ${query.split(' ').slice(0, 3).join(' ')}"

      Return a PURE JSON object with this structure:
      {
        "seoScore": number (0-100),
        "marketingScore": number (0-100),
        "critique": {
          "pros": ["string", "string"],
          "cons": ["string", "string"]
        },
        "improvedTitles": [
          { 
            "style": "SEO Odaklı (Maksimum Görünürlük)", 
            "title": "string", 
            "reasoning": "string" 
          },
          { 
            "style": "Müşteri Odaklı (Daha Yüksek Tıklama)", 
            "title": "string", 
            "reasoning": "string" 
          },
          { 
            "style": "Hibrit (Dengeli)", 
            "title": "string", 
            "reasoning": "string" 
          }
        ],
        "topCompetitors": [
          { "title": "string", "price": "string", "url": "string", "views": "string" }
        ] (Top 5 actual competitors. Include approximate views/sales if inferable from snippets, e.g., "2k+ reviews")
      }
    `;
  } else if (mode === 'listing') {
    // Listing/Link Analysis Prompt
    prompt = `
      Act as a Senior Etsy Analytics Expert. Analyze this Etsy product URL: "${query}".
      
      LANGUAGE: TURKISH.

      Task:
      1. Use Google Search to find details about this specific listing or shop if the direct URL content is not fully available. Search for the title if extracted or the shop name.
      2. Estimate TOTAL SALES and DAILY SALES based on public signals (review count, shop total sales, listing creation date estimation).
         - Rule of thumb: Listings often have 1 review per 10-50 sales. Use this to estimate if explicit data isn't found.
      3. Extract/Infer likely TAGS (Etiketler) from the title and description context.
      4. Analyze the SEO Score of the Title and each Tag based on probable search volume and relevance.

      Return a PURE JSON object with this structure:
      {
        "productTitle": "string",
        "shopName": "string",
        "estimatedSales": {
          "total": "string" (e.g., "1,500+ (Tahmini)"),
          "daily": "string" (e.g., "3-6 Satış/Gün"),
          "revenueEstimate": "string" (Optional, e.g. "$20k+")
        },
        "overallSeoScore": number (0-100),
        "titleAnalysis": {
            "score": number (0-100),
            "strengths": ["string"],
            "weaknesses": ["string"]
        },
        "tags": [
          { 
            "tag": "string", 
            "seoScore": number (0-100), 
            "volumeLabel": "Yüksek"|"Orta"|"Düşük", 
            "competition": "Yüksek"|"Düşük" 
          }
        ] (List 13 potential tags or keywords this listing is targeting)
      }
    `;
  }

  prompt += `\nReturn ONLY the JSON. Do not include markdown blocks.`;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        temperature: 0.1,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "{}";
    const jsonString = text.replace(/```json\n|\n```|```/g, "").trim();
    
    let data;
    try {
      data = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse JSON from AI:", text);
      throw new Error("Yapay zeka yanıtı geçerli bir JSON değildi. Lütfen tekrar deneyin.");
    }

    // Extract grounding chunks
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = [];

    groundingChunks.forEach((chunk) => {
      if (chunk.web?.uri && chunk.web?.title) {
        const uri = chunk.web.uri;
        if (uri.includes("etsy.com")) {
          sources.push({
            title: chunk.web.title,
            uri: uri
          });
        }
      }
    });

    return {
      mode,
      keywordData: mode === 'keyword' ? (data as EtsyAnalysisData) : undefined,
      titleData: mode === 'title' ? (data as TitleAnalysisData) : undefined,
      listingData: mode === 'listing' ? (data as ListingAnalysisData) : undefined,
      sources
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
