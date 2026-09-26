import React, { useState } from 'react';
import simulationsData from '../../data/simulations.json';
import { useAppContext } from '../../contexts/AppContext';
import { UserCircle2, Search, CheckCircle2, ChevronRight } from 'lucide-react';

export const Detective: React.FC = () => {
  const { addAchievement } = useAppContext();
  const data = simulationsData.detective;
  
  const [foundClues, setFoundClues] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePostClick = (id: number) => {
    if (!foundClues.includes(id)) {
      const newClues = [...foundClues, id];
      setFoundClues(newClues);
      
      if (newClues.length === data.posts.length) {
        setIsCompleted(true);
        addAchievement('detective');
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-5xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Детектив: Айяның парақшасы</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Бұл – Айя есімді қыздың ашық парақшасы. Оның посттарын оқып, қандай жеке деректерін аңдамай жариялап жібергенін табыңыз (посттарды басыңыз).
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Fake Social Profile */}
        <div className="lg:w-2/3 bg-gray-50 border-2 border-gray-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-8 border-b-2 border-gray-200 pb-6">
            <UserCircle2 size={80} className="text-gray-400 bg-white rounded-full" />
            <div>
              <h2 className="text-2xl font-bold">{data.profileName}</h2>
              <p className="text-gray-600">{data.bio}</p>
            </div>
          </div>

          <div className="space-y-4">
            {data.posts.map(post => {
              const isFound = foundClues.includes(post.id);
              return (
                <div 
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${
                    isFound 
                      ? 'bg-rose-50 border-rose-200 shadow-inner' 
                      : 'bg-white border-gray-100 shadow-sm hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex gap-3">
                    <UserCircle2 size={40} className="text-gray-400 shrink-0" />
                    <div>
                      <div className="font-bold text-sm mb-1">{data.profileName}</div>
                      <p className="text-gray-800">{post.content}</p>
                    </div>
                  </div>
                  {isFound && (
                    <div className="mt-3 text-sm font-bold text-rose-600 bg-white p-2 rounded border border-rose-100 flex items-start gap-2 animate-pop">
                      <Search size={16} className="mt-0.5 shrink-0" />
                      <span>{post.clue}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Notebook (Clues) */}
        <div className="lg:w-1/3">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 sticky top-24 shadow-sm font-mono transform rotate-1">
            <h3 className="text-xl font-bold mb-4 text-yellow-900 border-b border-yellow-300 pb-2 flex items-center gap-2">
              <Search size={20} />
              Детектив дәптері
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-gray-500 mb-2">
                <span>Табылған айғақтар:</span>
                <span>{foundClues.length} / {data.posts.length}</span>
              </div>
              
              {data.posts.map(post => {
                const isFound = foundClues.includes(post.id);
                return (
                  <div key={post.id} className="flex gap-2 text-yellow-900">
                    <div className={`mt-1 shrink-0 ${isFound ? 'text-emerald-600' : 'text-yellow-400'}`}>
                      {isFound ? <CheckCircle2 size={18} /> : <ChevronRight size={18} />}
                    </div>
                    <span className={isFound ? 'line-through opacity-70' : ''}>
                      {isFound ? 'Айғақ табылды' : '???'}
                    </span>
                  </div>
                );
              })}
            </div>

            {isCompleted && (
              <div className="mt-8 bg-emerald-100 text-emerald-800 p-4 rounded-xl border border-emerald-200 animate-bounce-short">
                <p className="font-bold mb-1">Тамаша!</p>
                <p className="text-sm">Сен барлық қателерді таптың. Енді өз парақшаңда мұндай ақпаратты ашық жариялама.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
