import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  colorClass?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subValue, icon: Icon, trend, colorClass = "text-slate-800" }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between transition-all hover:shadow-md">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className={`text-2xl font-bold ${colorClass}`}>{value}</h3>
        {subValue && <p className="text-xs text-slate-400 mt-2">{subValue}</p>}
      </div>
      <div className={`p-3 rounded-lg ${colorClass.includes('orange') ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
        <Icon size={24} />
      </div>
    </div>
  );
};

export default MetricCard;
