import React from 'react';
import { RelatedKeyword } from '../types';
import { TrendingUp, Search, MousePointer2 } from 'lucide-react';

interface KeywordTableProps {
  keywords: RelatedKeyword[];
}

const KeywordTable: React.FC<KeywordTableProps> = ({ keywords }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800">Uzun Kuyruklu Fırsatlar (Long-Tail)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="px-6 py-4 font-medium">Anahtar Kelime</th>
              <th className="px-6 py-4 font-medium">Hacim</th>
              <th className="px-6 py-4 font-medium">Rekabet</th>
              <th className="px-6 py-4 font-medium">Tah. TO (CTR)</th>
              <th className="px-6 py-4 font-medium">Tah. TBM (CPC)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {keywords.map((kw, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-2">
                  <Search size={16} className="text-slate-400" />
                  {kw.keyword}
                </td>
                <td className="px-6 py-4 text-slate-600">{kw.volume}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${kw.competition === 'Low' ? 'bg-green-100 text-green-800' : 
                      kw.competition === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {kw.competition}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 flex items-center gap-1">
                  <MousePointer2 size={14} className="text-slate-400" />
                  {kw.ctr}
                </td>
                <td className="px-6 py-4 text-slate-600">{kw.cpc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KeywordTable;