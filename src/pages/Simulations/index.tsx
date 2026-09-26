import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Image as ImageIcon, MessageSquare, Key, Footprints, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const SIMULATIONS = [
  { id: 'detective', name: 'Детектив: Айяның парақшасы', desc: 'Бейтаныс адамның парақшасынан қандай жеке деректерді табуға болады?', icon: Search, color: 'bg-blue-100 text-blue-600', borderColor: 'hover:border-blue-400' },
  { id: 'exif', name: 'Фотодағы жасырын ақпарат', desc: 'Сенің суреттерің қандай құпияларды сақтайтынын біл (EXIF).', icon: ImageIcon, color: 'bg-purple-100 text-purple-600', borderColor: 'hover:border-purple-400' },
  { id: 'post-or-not', name: 'Жариялаймын ба, жоқ па?', desc: 'Интернетке қандай сурет пен мәтін салуға болатынын шеш.', icon: MessageSquare, color: 'bg-emerald-100 text-emerald-600', borderColor: 'hover:border-emerald-400' },
  { id: 'password', name: 'Құпиясөз тексеру', desc: 'Сенің пароліңді бұзу қанша уақыт алады?', icon: Key, color: 'bg-amber-100 text-amber-600', borderColor: 'hover:border-amber-400' },
  { id: 'footprint-size', name: 'Сенің ізің қаншалықты үлкен?', desc: 'Тест тапсырып, сандық ізіңнің көлемін анықта.', icon: Footprints, color: 'bg-indigo-100 text-indigo-600', borderColor: 'hover:border-indigo-400' },
  { id: 'fake-or-true', name: 'Фейк немесе шын?', desc: 'Алаяқтардың хаттарын тани аласың ба?', icon: AlertTriangle, color: 'bg-rose-100 text-rose-600', borderColor: 'hover:border-rose-400' }
];

export const SimulationsIndex: React.FC = () => {
  const { achievements } = useAppContext();

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Симуляциялар</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Бұл бөлімде сіз өз біліміңізді іс жүзінде тексере аласыз. Әр тапсырманы орындап, медаль жинаңыз!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SIMULATIONS.map(sim => {
          const isDone = achievements.includes(sim.id);
          const IconComponent = sim.icon;
          
          return (
            <Link 
              key={sim.id}
              to={`/simulations/${sim.id}`}
              className={`bg-white p-6 rounded-2xl shadow-sm border-2 transition-all duration-300 block flex flex-col h-full relative hover:scale-[1.03] active:scale-[0.98] ${sim.borderColor} ${isDone ? 'border-gray-200' : 'border-transparent'}`}
            >
              {isDone && (
                <div className="absolute top-4 right-4 text-emerald-500 bg-emerald-50 rounded-full p-1" title="Орындалды">
                  <CheckCircle size={24} />
                </div>
              )}
              
              <div className={`p-4 rounded-xl inline-flex mb-4 w-16 h-16 items-center justify-center ${sim.color}`}>
                <IconComponent size={32} />
              </div>
              
              <h2 className="text-xl font-bold mb-2 pr-8">{sim.name}</h2>
              <p className="text-gray-600 flex-grow">{sim.desc}</p>
              
              <div className="mt-6 font-bold text-[var(--color-accent)] group-hover:underline">
                Бастау →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
