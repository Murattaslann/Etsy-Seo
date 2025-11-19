import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendPoint } from '../types';

interface TrendChartProps {
  data: TrendPoint[];
}

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[400px]">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Mevsimsel Arama Trendleri</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
            }}
            itemStyle={{ color: '#F1641E' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#F1641E" 
            fill="url(#colorValue)" 
            strokeWidth={3}
          />
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F1641E" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#F1641E" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;