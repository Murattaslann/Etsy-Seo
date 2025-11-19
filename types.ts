
export interface TrendPoint {
  month: string;
  value: number;
}

export interface RelatedKeyword {
  keyword: string;
  volume: string;
  competition: 'High' | 'Medium' | 'Low';
  ctr: string;
  cpc: string;
}

export interface MarketLeader {
  title: string;
  price: string;
  shopName?: string;
  url?: string;
  views?: string;
}

export interface EtsyAnalysisData {
  score: number;
  searchVolumeLabel: string;
  competitionLabel: string;
  sentiment?: string;
  trendData: TrendPoint[];
  relatedKeywords: RelatedKeyword[];
  marketLeaders: MarketLeader[];
  generatedTitles: string[];
}

export interface TitleCritique {
  pros: string[];
  cons: string[];
}

export interface ImprovedTitle {
  style: string; // e.g., "SEO Odaklı", "Müşteri Odaklı", "Dengeli"
  title: string;
  reasoning: string;
}

export interface TitleAnalysisData {
  seoScore: number;
  marketingScore: number;
  critique: TitleCritique;
  improvedTitles: ImprovedTitle[];
  topCompetitors: MarketLeader[];
}

export interface TagMetric {
  tag: string;
  seoScore: number; // 0-100 based on volume/competition
  volumeLabel: string; // "High", "Medium", "Low"
  competition: string;
}

export interface ListingAnalysisData {
  productTitle: string;
  shopName: string;
  estimatedSales: {
    total: string; // e.g. "1,250+"
    daily: string; // e.g. "3-5"
    revenueEstimate?: string;
  };
  overallSeoScore: number;
  tags: TagMetric[];
  titleAnalysis: {
    score: number;
    strengths: string[];
    weaknesses: string[];
  };
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export type AnalysisMode = 'keyword' | 'title' | 'listing';

export interface AnalysisFilters {
  category: string;
  audience: string;
}

export interface AnalysisResult {
  mode: AnalysisMode;
  keywordData?: EtsyAnalysisData;
  titleData?: TitleAnalysisData;
  listingData?: ListingAnalysisData;
  sources: GroundingSource[];
}
