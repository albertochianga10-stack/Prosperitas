
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { SimulationResult } from '../types';

const CompoundInterestCalculator: React.FC = () => {
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(30);

  const data = useMemo(() => {
    const results: SimulationResult[] = [];
    const monthlyRate = rate / 100 / 12;
    let total = initial;
    let contributions = initial;

    for (let i = 0; i <= years; i++) {
      results.push({
        year: i,
        total: Math.round(total),
        contributions: Math.round(contributions),
        interest: Math.round(total - contributions)
      });

      // Simple yearly jump for simulation clarity
      for (let m = 0; m < 12; m++) {
        total = (total + monthly) * (1 + monthlyRate);
        contributions += monthly;
      }
    }
    return results;
  }, [initial, monthly, rate, years]);

  const finalAmount = data[data.length - 1].total;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Simulador de Liberdade Financeira</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Investimento Inicial (R$)</label>
            <input 
              type="number" 
              value={initial} 
              onChange={(e) => setInitial(Number(e.target.value))}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Aporte Mensal (R$)</label>
            <input 
              type="number" 
              value={monthly} 
              onChange={(e) => setMonthly(Number(e.target.value))}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Taxa de Juros Anual (%)</label>
            <input 
              type="number" 
              value={rate} 
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tempo (Anos)</label>
            <input 
              type="range" 
              min="1" 
              max="50"
              value={years} 
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="text-right text-sm text-slate-500">{years} anos</div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl flex flex-col justify-center text-center">
          <p className="text-slate-600 text-sm uppercase tracking-wider font-semibold">Patrimônio Estimado</p>
          <p className="text-4xl font-bold text-emerald-600 my-2">
            R$ {finalAmount.toLocaleString('pt-BR')}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="text-slate-500">Total Investido</p>
              <p className="font-semibold text-slate-800">R$ {data[data.length - 1].contributions.toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-slate-500">Juros Acumulados</p>
              <p className="font-semibold text-emerald-600">R$ {data[data.length - 1].interest.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(val: number) => [`R$ ${val.toLocaleString('pt-BR')}`, 'Total']}
            />
            <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
