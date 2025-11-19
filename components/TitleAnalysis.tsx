import React from 'react';
import { CheckCircle2, Trophy, ExternalLink, Search } from 'lucide-react';
import { MarketLeader } from '../types';

interface TitleAnalysisProps {
  generatedTitles: string[];
  marketLeaders: MarketLeader[];
}

const TitleAnalysis: React.FC<TitleAnalysisProps> = ({ generatedTitles, marketLeaders }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* AI Recommended */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
            <div className="bg-orange-100 p-2 rounded-lg">
                <CheckCircle2 className="text-orange-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Yapay Zeka Destekli Başlıklar</h3>
        </div>
        <div className="space-y-4">
          {generatedTitles.map((title, idx) => (
            <div key={idx} className="p-4 bg-orange-50/50 border border-orange-100 rounded-lg transition-colors group hover:border-orange-300">
              <p className="text-slate-700 text-sm leading-relaxed mb-3 font-medium">
                {title}
              </p>
              <div className="flex justify-end">
                  <a 
                    href={`https://www.etsy.com/search?q=${encodeURIComponent(title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-orange-200 rounded-md text-xs font-semibold text-orange-600 shadow-sm hover:bg-orange-50 hover:border-orange-300 transition-all"
                  >
                    <Search size={12} />
                    Etsy'de İncele
                  </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
            <div className="bg-slate-100 p-2 rounded-lg">
                <Trophy className="text-slate-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Pazar Liderleri (Rakipler)</h3>
        </div>
        <div className="space-y-4">
          {marketLeaders.map((leader, idx) => (
            <a 
              key={idx} 
              href={leader.url || `https://www.etsy.com/search?q=${encodeURIComponent(leader.title)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 transition-all group"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-slate-700 text-sm font-medium line-clamp-2 group-hover:text-orange-600 transition-colors pr-4">
                    {leader.title}
                </p>
                <ExternalLink size={14} className="text-slate-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold bg-white px-2 py-1 rounded border border-slate-200">
                    {leader.price}
                </span>
                <span className="text-slate-400">Etsy'de Bulundu</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TitleAnalysis;