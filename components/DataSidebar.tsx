import React from 'react';
import { GroundingSource } from '../types';
import { ExternalLink, Database } from 'lucide-react';

interface DataSidebarProps {
  sources: GroundingSource[];
}

const DataSidebar: React.FC<DataSidebarProps> = ({ sources }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 h-full">
       <div className="p-6 border-b border-slate-100 flex items-center gap-2">
        <Database size={18} className="text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-800">Kanıt Kaynakları</h3>
      </div>
      <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
        {sources.length === 0 ? (
            <div className="text-sm text-slate-400 text-center py-4">Doğrudan kaynak bulunamadı.</div>
        ) : (
            sources.map((source, idx) => (
            <a 
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
            >
                <div className="text-xs font-semibold text-slate-700 mb-1 line-clamp-2 group-hover:text-orange-600">
                {source.title}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <ExternalLink size={10} />
                <span className="truncate">{new URL(source.uri).hostname}</span>
                </div>
            </a>
            ))
        )}
      </div>
    </div>
  );
};

export default DataSidebar;