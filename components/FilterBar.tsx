import React from 'react';
import { AnalysisFilters } from '../types';
import { Filter, Users, Tag } from 'lucide-react';

interface FilterBarProps {
  filters: AnalysisFilters;
  onChange: (key: keyof AnalysisFilters, value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm animate-fade-in-up">
      <div className="flex items-center gap-2 text-slate-400 text-sm font-medium min-w-fit">
        <Filter size={16} />
        <span>Filtreler:</span>
      </div>
      
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
                value={filters.category}
                onChange={(e) => onChange('category', e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none"
            >
                <option value="">Tüm Kategoriler</option>
                <option value="Jewelry">Takı & Mücevher</option>
                <option value="Home & Living">Ev & Yaşam</option>
                <option value="Clothing">Giyim</option>
                <option value="Accessories">Aksesuar</option>
                <option value="Craft Supplies">Hobi Malzemeleri</option>
                <option value="Digital Prints">Dijital Ürünler</option>
                <option value="Weddings">Düğün</option>
                <option value="Vintage">Vintage</option>
            </select>
        </div>

        <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
                value={filters.audience}
                onChange={(e) => onChange('audience', e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none"
            >
                <option value="">Genel Hedef Kitle</option>
                <option value="Women">Kadınlar</option>
                <option value="Men">Erkekler</option>
                <option value="Kids">Çocuklar</option>
                <option value="Gifts">Hediye Arayanlar</option>
                <option value="Collectors">Koleksiyoncular</option>
            </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;