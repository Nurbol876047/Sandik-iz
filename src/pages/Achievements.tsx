import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Award, Trash2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SIMULATIONS = [
  { id: 'detective', name: 'Детектив: Айяның парақшасы' },
  { id: 'exif', name: 'Фотодағы жасырын ақпарат' },
  { id: 'postOrNot', name: 'Жариялаймын ба, жоқ па?' },
  { id: 'password', name: 'Құпиясөз тексеру' },
  { id: 'footprintSize', name: 'Сенің ізің қаншалықты үлкен?' },
  { id: 'fakeOrTrue', name: 'Фейк немесе шын?' }
];

export const Achievements: React.FC = () => {
  const { achievements, resetProgress } = useAppContext();

  const isAllCompleted = achievements.length === SIMULATIONS.length;

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-4xl mx-auto w-full">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Жетістіктер</h1>
        <p className="text-gray-600">Барлық симуляцияларды өтіп, виртуалды марапатқа ие бол!</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-gray-100 relative overflow-hidden">
        {isAllCompleted && (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-amber-50 z-0 opacity-50"></div>
        )}
        
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Award className={isAllCompleted ? 'text-yellow-500' : 'text-gray-400'} size={32} />
              Сенің медальдарың
            </h2>
            <div className="text-lg font-bold text-gray-500">
              <span className="text-[var(--color-accent)] text-2xl">{achievements.length}</span> / {SIMULATIONS.length}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SIMULATIONS.map(sim => {
              const isDone = achievements.includes(sim.id);
              return (
                <div 
                  key={sim.id} 
                  className={`p-4 rounded-xl border-2 flex flex-col items-center text-center gap-3 transition-all ${
                    isDone 
                      ? 'bg-emerald-50 border-emerald-200 shadow-sm transform hover:-translate-y-1' 
                      : 'bg-gray-50 border-dashed border-gray-300 opacity-70 grayscale'
                  }`}
                >
                  <div className={`p-3 rounded-full ${isDone ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-400'}`}>
                    {isDone ? <CheckCircle size={32} /> : <Award size={32} />}
                  </div>
                  <h3 className="font-semibold text-sm h-10 flex items-center justify-center">{sim.name}</h3>
                  {!isDone && (
                    <Link to={`/simulations/${sim.id}`} className="text-xs bg-[var(--color-accent)] text-white px-3 py-1 rounded-full hover:opacity-80">
                      Өту
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {isAllCompleted && (
            <div className="mt-8 bg-yellow-100 text-yellow-800 p-6 rounded-xl border border-yellow-200 text-center animate-bounce-short">
              <h3 className="text-xl font-bold mb-2">🎉 Құттықтаймыз! 🎉</h3>
              <p>Сен барлық тапсырмаларды сәтті аяқтадың! Енді интернетте өз ізіңді қалай қорғау керектігін жақсы білесің.</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button 
          onClick={() => {
            if (window.confirm('Барлық жетістіктерді өшіргіңіз келе ме? Бұл әрекетті қайтара алмайсыз.')) {
              resetProgress();
            }
          }}
          className="flex items-center gap-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-4 py-2 rounded-lg transition font-medium"
        >
          <Trash2 size={20} />
          <span>Прогресті өшіру</span>
        </button>
      </div>
    </div>
  );
};
