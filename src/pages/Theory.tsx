import React from 'react';
import theoryData from '../data/theory.json';
import { Info, Footprints, AlertTriangle, Users } from 'lucide-react';

export const Theory: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 animate-fade-in">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Сандық із деген не?</h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-700 bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[var(--color-accent)]">
          {theoryData.definition}
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {theoryData.types.map((type, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border-2 border-gray-100 hover:border-[var(--color-accent)] transition">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-full ${index === 0 ? 'bg-purple-100 text-[var(--color-accent)]' : 'bg-emerald-100 text-[var(--color-success)]'}`}>
                <Footprints size={28} />
              </div>
              <h2 className="text-2xl font-bold">{type.name}</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">{type.description}</p>
            <div>
              <h3 className="font-bold text-gray-500 uppercase tracking-wide text-sm mb-2">Мысалдар:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                {type.examples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-rose-50 p-8 rounded-2xl border-2 border-rose-200">
        <div className="flex items-center gap-3 mb-6 text-rose-600">
          <AlertTriangle size={32} />
          <h2 className="text-3xl font-bold">Ол несімен қауіпті?</h2>
        </div>
        <ul className="space-y-4">
          {theoryData.dangers.map((danger, index) => (
            <li key={index} className="flex gap-4 items-start">
              <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-rose-500 shadow-sm shrink-0">
                {index + 1}
              </div>
              <p className="text-lg pt-1">{danger}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white p-8 rounded-2xl shadow-sm border-2 border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <Users size={32} className="text-blue-500" />
          <h2 className="text-3xl font-bold">Сенің ізіңді кімдер көре алады?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {theoryData.whoSees.map((item, index) => (
            <div key={index} className="bg-blue-50 rounded-xl p-6 border border-blue-100 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-blue-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                <h3 className="font-bold text-xl mb-2">{item.role}</h3>
                <p className="text-sm opacity-90">{item.impact}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-6 flex items-center justify-center gap-2">
          <Info size={16} /> Карточкалардың үстіне апарып көріңіз
        </p>
      </section>
    </div>
  );
};
