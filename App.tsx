
import React, { useState } from 'react';
import { 
  Search, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award, 
  Loader2,
  Sparkles,
  Type,
  LayoutGrid,
  Link as LinkIcon
} from 'lucide-react';
import { analyzeEtsy } from './services/geminiService';
import { AnalysisResult, AnalysisMode, AnalysisFilters } from './types';
import MetricCard from './components/MetricCard';
import TrendChart from './components/TrendChart';
import KeywordTable from './components/KeywordTable';
import TitleAnalysis from './components/TitleAnalysis';
import TitleOptimizerResult from './components/TitleOptimizerResult';
import ListingAnalysisResult from './components/ListingAnalysisResult';
import DataSidebar from './components/DataSidebar';
import FilterBar from './components/FilterBar';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<AnalysisMode>('keyword');
  const [filters, setFilters] = useState<AnalysisFilters>({ category: '', audience: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeEtsy(input, mode, filters);
      setResult(data);
    } catch (err) {
      setError("Analiz tamamlanamadı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof AnalysisFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const switchMode = (newMode: AnalysisMode) => {
    setMode(newMode);
    setResult(null);
    setInput('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-2 rounded-lg">
                <Sparkles className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-slate-900">EtsySıralama <span className="text-orange-600">AI</span></span>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Gemini 3 Pro
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Etsy'de Satışlarınızı Artırın</h1>
            <p className="text-slate-600">
              {mode === 'keyword' 
                ? "Derinlemesine pazar analizi ve anahtar kelime fırsatları." 
                : mode === 'title'
                ? "Başlıklarınızı SEO ve müşteri psikolojisine göre optimize edin."
                : "Rakip veya kendi ürün linkinizi analiz edin, satış ve etiket verilerini görün."}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm inline-flex flex-wrap justify-center gap-1">
              <button
                onClick={() => switchMode('keyword')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  mode === 'keyword' 
                    ? 'bg-orange-50 text-orange-700 shadow-sm ring-1 ring-orange-200' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <LayoutGrid size={16} />
                Kelime Analizi
              </button>
              <button
                onClick={() => switchMode('title')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  mode === 'title' 
                    ? 'bg-orange-50 text-orange-700 shadow-sm ring-1 ring-orange-200' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Type size={16} />
                Başlık Portalı
              </button>
              <button
                onClick={() => switchMode('listing')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  mode === 'listing' 
                    ? 'bg-orange-50 text-orange-700 shadow-sm ring-1 ring-orange-200' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <LinkIcon size={16} />
                Ürün Linki Analizi
              </button>
            </div>
          </div>
          
          {/* Search Area */}
          <form onSubmit={handleSearch} className="relative z-10">
            <div className="relative shadow-lg rounded-xl">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                    mode === 'keyword' ? "Ürün anahtar kelimesi girin (ör. 'el yapımı gümüş yüzük')" 
                    : mode === 'title' ? "Analiz edilecek Etsy başlığını buraya yapıştırın..."
                    : "Etsy ürün linkini yapıştırın (https://etsy.com/listing/...)"
                }
                className="w-full pl-14 pr-32 py-5 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-400 text-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all shadow-sm"
                disabled={loading}
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                {loading ? (
                    <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Analiz...</span>
                    </>
                ) : (
                    'Analiz Et'
                )}
                </button>
            </div>
            
            {/* Filters */}
            <FilterBar filters={filters} onChange={handleFilterChange} />
          </form>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm text-center animate-shake">
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="animate-fade-in space-y-8">
            {/* KEYWORD MODE VIEW */}
            {result.mode === 'keyword' && result.keywordData && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <MetricCard 
                            title="Fırsat Puanı" 
                            value={result.keywordData.score} 
                            icon={Award}
                            subValue="100 üzerinden"
                            colorClass={result.keywordData.score > 70 ? "text-green-600" : result.keywordData.score > 40 ? "text-yellow-600" : "text-orange-600"}
                        />
                        <MetricCard 
                            title="Arama Hacmi" 
                            value={result.keywordData.searchVolumeLabel}
                            icon={BarChart3}
                            colorClass="text-slate-900"
                        />
                        <MetricCard 
                            title="Rekabet" 
                            value={result.keywordData.competitionLabel}
                            icon={Users}
                            colorClass={result.keywordData.competitionLabel.toLowerCase().includes('yüksek') || result.keywordData.competitionLabel.toLowerCase().includes('high') ? "text-red-600" : "text-green-600"}
                        />
                        <MetricCard 
                            title="Trend" 
                            value="Mevsimsel"
                            subValue="Grafiği inceleyin"
                            icon={TrendingUp}
                            colorClass="text-orange-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <TitleAnalysis 
                                generatedTitles={result.keywordData.generatedTitles}
                                marketLeaders={result.keywordData.marketLeaders}
                            />
                            <TrendChart data={result.keywordData.trendData} />
                            <KeywordTable keywords={result.keywordData.relatedKeywords} />
                        </div>
                        <div className="lg:col-span-1">
                            <DataSidebar sources={result.sources} />
                        </div>
                    </div>
                </>
            )}

            {/* TITLE ANALYSIS MODE VIEW */}
            {result.mode === 'title' && result.titleData && (
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <TitleOptimizerResult data={result.titleData} />
                    </div>
                    <div className="lg:col-span-1">
                         <DataSidebar sources={result.sources} />
                    </div>
                 </div>
            )}

             {/* LISTING ANALYSIS MODE VIEW */}
             {result.mode === 'listing' && result.listingData && (
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ListingAnalysisResult data={result.listingData} />
                    </div>
                    <div className="lg:col-span-1">
                         <DataSidebar sources={result.sources} />
                    </div>
                 </div>
            )}
          </div>
        )}
        
        {!result && !loading && (
           <div className="mt-20 text-center opacity-60">
             <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-6">
                {mode === 'keyword' && <BarChart3 className="text-slate-400" size={40} />}
                {mode === 'title' && <Type className="text-slate-400" size={40} />}
                {mode === 'listing' && <LinkIcon className="text-slate-400" size={40} />}
             </div>
             <h3 className="text-slate-900 font-semibold text-lg mb-2">
                {mode === 'keyword' ? "Anahtar Kelime Analizi Bekleniyor" : mode === 'title' ? "Başlık Analizi Bekleniyor" : "Ürün Linki Analizi Bekleniyor"}
             </h3>
             <p className="text-slate-500 max-w-md mx-auto">
                {mode === 'keyword' 
                 ? "Gemini, Etsy üzerinde derinlemesine bir arama simülasyonu yaparak en iyi anahtar kelime fırsatlarını bulur."
                 : mode === 'title'
                 ? "Mevcut bir ürün başlığını yapıştırın. Yapay zeka, SEO ve müşteri psikolojisi açısından puanlasın ve rakiplerle karşılaştırsın."
                 : "Bir ürün linki yapıştırın. Yapay zeka satışları tahmin etsin, etiketleri ve başlık SEO puanını analiz etsin."}
             </p>
           </div>
        )}
      </main>
    </div>
  );
};

export default App;
