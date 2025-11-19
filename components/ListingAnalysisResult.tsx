
import React from 'react';
import { ListingAnalysisData } from '../types';
import { ShoppingBag, Calendar, DollarSign, Tag, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

interface ListingAnalysisResultProps {
  data: ListingAnalysisData;
}

const ListingAnalysisResult: React.FC<ListingAnalysisResultProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      
      {/* Product Header & Sales Stats */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="mb-6 border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2 py-1 rounded mb-2 inline-block">
                {data.shopName}
            </span>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
                {data.productTitle}
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm">
                    <ShoppingBag size={16} />
                    Toplam Satış (Tahmini)
                </div>
                <div className="text-2xl font-bold text-slate-800">{data.estimatedSales.total}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm">
                    <Calendar size={16} />
                    Günlük Satış
                </div>
                <div className="text-2xl font-bold text-slate-800">{data.estimatedSales.daily}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm">
                    <TrendingUp size={16} />
                    Genel SEO Puanı
                </div>
                <div className={`text-2xl font-bold ${data.overallSeoScore >= 70 ? 'text-green-600' : data.overallSeoScore >= 50 ? 'text-orange-600' : 'text-red-600'}`}>
                    {data.overallSeoScore}/100
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Title Audit */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-slate-600" />
                Başlık Analizi
            </h3>
            <div className="mb-4 flex items-center gap-2">
                <div className="h-2 bg-slate-100 rounded-full flex-1 overflow-hidden">
                    <div className={`h-full rounded-full ${data.titleAnalysis.score >= 70 ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${data.titleAnalysis.score}%` }}></div>
                </div>
                <span className="font-bold text-slate-700">{data.titleAnalysis.score} Puan</span>
            </div>
            
            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1">
                        <CheckCircle2 size={14} /> Artılar
                    </h4>
                    <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                        {data.titleAnalysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-1">
                         <AlertCircle size={14} /> İyileştirilmeli
                    </h4>
                    <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                        {data.titleAnalysis.weaknesses.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>
            </div>
        </div>

        {/* Tag Analysis Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full">
             <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Tag className="text-slate-600" />
                Etiket (Tag) Analizi
            </h3>
            <div className="overflow-auto max-h-[400px]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 sticky top-0">
                        <tr>
                            <th className="px-4 py-2 font-medium">Etiket</th>
                            <th className="px-4 py-2 font-medium">SEO Puanı</th>
                            <th className="px-4 py-2 font-medium">Hacim</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.tags.map((tag, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium text-slate-700">{tag.tag}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                            <div className={`h-full ${tag.seoScore > 70 ? 'bg-green-500' : tag.seoScore > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${tag.seoScore}%` }}></div>
                                        </div>
                                        <span className="text-xs text-slate-500">{tag.seoScore}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs px-2 py-1 rounded-full ${tag.volumeLabel === 'Yüksek' ? 'bg-green-100 text-green-700' : tag.volumeLabel === 'Düşük' ? 'bg-slate-100 text-slate-600' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {tag.volumeLabel}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ListingAnalysisResult;
