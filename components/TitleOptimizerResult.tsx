import React from 'react';
import { TitleAnalysisData } from '../types';
import { CheckCircle2, AlertCircle, ArrowRight, Trophy, ExternalLink, Star } from 'lucide-react';

interface TitleOptimizerResultProps {
  data: TitleAnalysisData;
}

const TitleOptimizerResult: React.FC<TitleOptimizerResultProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      {/* Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
             <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-slate-100"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={351} // 2 * pi * 56
                  strokeDashoffset={351 - (351 * data.seoScore) / 100}
                  className={`${data.seoScore > 70 ? 'text-green-500' : 'text-orange-500'} transition-all duration-1000 ease-out`}
                />
             </svg>
             <span className="absolute text-3xl font-bold text-slate-800">{data.seoScore}</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-800">SEO Skoru</h3>
          <p className="text-sm text-slate-500 mt-2">Anahtar kelime yerleşimi ve teknik uygunluk</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
           <div className="relative w-32 h-32 flex items-center justify-center mb-4">
             <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-slate-100"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={351}
                  strokeDashoffset={351 - (351 * data.marketingScore) / 100}
                  className={`${data.marketingScore > 70 ? 'text-blue-500' : 'text-purple-500'} transition-all duration-1000 ease-out`}
                />
             </svg>
             <span className="absolute text-3xl font-bold text-slate-800">{data.marketingScore}</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Müşteri Etkileşimi</h3>
          <p className="text-sm text-slate-500 mt-2">Okunabilirlik ve tıklama potansiyeli (CTR)</p>
        </div>
      </div>

      {/* Critique */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} />
                Güçlü Yönler
            </h3>
            <ul className="space-y-2">
                {data.critique.pros.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></span>
                        {item}
                    </li>
                ))}
            </ul>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
            <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                <AlertCircle size={20} />
                Geliştirilmesi Gerekenler
            </h3>
            <ul className="space-y-2">
                {data.critique.cons.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></span>
                        {item}
                    </li>
                ))}
            </ul>
         </div>
      </div>

      {/* Optimized Titles */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <Star className="text-yellow-500" />
            Optimize Edilmiş Öneriler
        </h3>
        <div className="space-y-6">
            {data.improvedTitles.map((item, idx) => (
                <div key={idx} className="border border-slate-100 rounded-lg p-4 hover:border-orange-200 transition-colors bg-slate-50/50">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2 py-1 rounded">
                            {item.style}
                        </span>
                    </div>
                    <p className="text-base font-medium text-slate-800 mb-2 selection:bg-orange-100">
                        {item.title}
                    </p>
                    <div className="flex items-start gap-2 text-sm text-slate-500 bg-white p-3 rounded border border-slate-100">
                        <ArrowRight size={16} className="mt-0.5 text-slate-400 flex-shrink-0" />
                        {item.reasoning}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Competitors */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <Trophy className="text-slate-600" />
            En İyi SEO'ya Sahip Rakipler (Top 5)
        </h3>
        <div className="overflow-hidden rounded-lg border border-slate-100">
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-3 font-medium">Ürün Başlığı</th>
                        <th className="px-6 py-3 font-medium w-32">Fiyat</th>
                        <th className="px-6 py-3 font-medium w-24">İşlem</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {data.topCompetitors.map((comp, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="text-sm font-medium text-slate-800 line-clamp-2">
                                    {comp.title}
                                </div>
                                {comp.views && (
                                    <span className="text-xs text-green-600 mt-1 inline-block bg-green-50 px-2 py-0.5 rounded">
                                        {comp.views}
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                                {comp.price}
                            </td>
                            <td className="px-6 py-4">
                                <a 
                                    href={comp.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-orange-100 hover:text-orange-600 transition-all"
                                    title="Etsy'de Gör"
                                >
                                    <ExternalLink size={16} />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default TitleOptimizerResult;