import React, { useState } from 'react';
import simulationsData from '../../data/simulations.json';
import { useAppContext } from '../../contexts/AppContext';
import { AlertTriangle, CheckCircle2, MessageSquareWarning } from 'lucide-react';

export const FakeOrTrue: React.FC = () => {
  const { addAchievement } = useAppContext();
  const scenarios = simulationsData.fakeOrTrue;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);

  const handleAnswer = (userGuessIsFake: boolean) => {
    setLastAnswerCorrect(userGuessIsFake === scenarios[currentIndex].isFake);
    setShowExplanation(true);
  };

  const nextScenario = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
      setLastAnswerCorrect(null);
    } else {
      setIsFinished(true);
      addAchievement('fake-or-true');
    }
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 animate-fade-in py-12 text-center max-w-lg mx-auto">
        <div className="bg-white p-10 rounded-3xl shadow-sm border-2 border-gray-100 w-full">
          <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Жарайсың!</h2>
          <p className="text-gray-600 mb-8">
            Сен фишинг мен шын хабарламаларды ажырата алатыныңды дәлелдедің. Медаль алдың!
          </p>
          <button 
            onClick={() => {
              setCurrentIndex(0);
              setShowExplanation(false);
              setIsFinished(false);
            }}
            className="bg-[var(--color-primary)] hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition w-full"
          >
            Тағы ойнау
          </button>
        </div>
      </div>
    );
  }

  const currentMsg = scenarios[currentIndex];

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-3xl mx-auto w-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Фейк немесе шын?</h1>
        <p className="text-gray-500">Келген хабарламаның алдау екенін тап.</p>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border-2 border-gray-100">
        {currentMsg.image && (
          <div className="mb-6 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <img src={currentMsg.image} alt="Сценарий иллюстрациясы" className="w-full h-auto max-h-64 object-cover" />
          </div>
        )}
        <div className="bg-gray-100 p-6 rounded-2xl mb-8 relative border-l-4 border-blue-500">
          <MessageSquareWarning size={24} className="absolute -top-3 -left-3 text-blue-500 bg-white rounded-full" />
          <p className="text-lg font-medium font-mono whitespace-pre-wrap">{currentMsg.message}</p>
        </div>

        {!showExplanation ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => handleAnswer(true)}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold p-4 rounded-xl border border-rose-200 transition flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 shadow-sm"
            >
              <AlertTriangle size={20} /> Бұл ФЕЙК (Алаяқтар)
            </button>
            <button 
              onClick={() => handleAnswer(false)}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold p-4 rounded-xl border border-emerald-200 transition flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 shadow-sm"
            >
              <CheckCircle2 size={20} /> Бұл ШЫН
            </button>
          </div>
        ) : (
          <div className="animate-fade-in space-y-6">
            <div className={`p-5 rounded-2xl border-2 shadow-sm ${lastAnswerCorrect ? 'bg-emerald-50 border-emerald-200 animate-pop' : 'bg-rose-50 border-rose-200 animate-shake'}`}>
              <h3 className={`font-bold text-xl mb-2 flex items-center gap-2 ${lastAnswerCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                {lastAnswerCorrect ? <CheckCircle2 className="animate-pulse" /> : <AlertTriangle className="animate-pulse" />}
                {lastAnswerCorrect ? 'Дұрыс!' : 'Қате!'} (Бұл {currentMsg.isFake ? 'ФЕЙК' : 'ШЫН'})
              </h3>
              <p className="text-gray-800">{currentMsg.explanation}</p>
            </div>
            
            <button 
              onClick={nextScenario}
              className="bg-[var(--color-primary)] hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-xl transition w-full hover:scale-[1.02] active:scale-95"
            >
              Келесі
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
