import React, { useState } from 'react';
import simulationsData from '../../data/simulations.json';
import { useAppContext } from '../../contexts/AppContext';
import { ThumbsUp, ThumbsDown, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export const PostOrNot: React.FC = () => {
  const { addAchievement } = useAppContext();
  const scenarios = simulationsData.postOrNot;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (choice: boolean) => {
    if (showExplanation) return;
    
    const isCorrect = choice === scenarios[currentIndex].isSafe;
    setLastAnswerCorrect(isCorrect);
    if (isCorrect) setScore(prev => prev + 1);
    
    setShowExplanation(true);
  };

  const nextScenario = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
      setLastAnswerCorrect(null);
    } else {
      setIsFinished(true);
      addAchievement('post-or-not');
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowExplanation(false);
    setLastAnswerCorrect(null);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 animate-fade-in py-12">
        <div className="bg-white p-10 rounded-3xl shadow-sm border-2 border-gray-100 text-center max-w-lg w-full">
          <h2 className="text-3xl font-bold mb-2">Нәтиже</h2>
          <div className="text-6xl font-black text-[var(--color-accent)] mb-6">{score} / {scenarios.length}</div>
          
          {score === scenarios.length ? (
            <p className="text-emerald-600 font-bold text-lg bg-emerald-50 p-4 rounded-xl mb-6">
              Керемет! Сен интернетке не жариялау керектігін өте жақсы білесің!
            </p>
          ) : score > scenarios.length / 2 ? (
            <p className="text-blue-600 font-bold text-lg bg-blue-50 p-4 rounded-xl mb-6">
              Жаман емес, бірақ кейбір жағдайларда мұқият болу керек.
            </p>
          ) : (
            <p className="text-rose-600 font-bold text-lg bg-rose-50 p-4 rounded-xl mb-6">
              Қауіпті! Саған кибергигиена ережелерін қайталап оқу керек.
            </p>
          )}
          
          <button 
            onClick={restart}
            className="bg-[var(--color-primary)] hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition w-full"
          >
            Қайта ойнау
          </button>
        </div>
      </div>
    );
  }

  const currentScenario = scenarios[currentIndex];

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-3xl mx-auto w-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Жариялаймын ба, жоқ па?</h1>
        <div className="flex justify-between items-center text-sm font-bold text-gray-400 bg-white p-3 rounded-xl border border-gray-100">
          <span>Сұрақ: {currentIndex + 1} / {scenarios.length}</span>
          <span>Дұрыс жауап: {score}</span>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border-2 border-gray-100 min-h-[300px] flex flex-col relative overflow-hidden">
        {showExplanation && (
          <div className={`absolute top-0 left-0 w-full h-2 ${lastAnswerCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
        )}
        
        <h2 className="text-2xl font-semibold text-center mb-8 flex-grow flex items-center justify-center">
          "{currentScenario.scenario}"
        </h2>

        {!showExplanation ? (
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <button 
              onClick={() => handleAnswer(true)}
              className="flex flex-col items-center gap-3 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 text-emerald-700 p-6 rounded-2xl transition group"
            >
              <ThumbsUp size={48} className="group-hover:scale-110 transition" />
              <span className="font-bold text-lg">Жариялаймын</span>
            </button>
            <button 
              onClick={() => handleAnswer(false)}
              className="flex flex-col items-center gap-3 bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 text-rose-700 p-6 rounded-2xl transition group"
            >
              <ThumbsDown size={48} className="group-hover:scale-110 transition" />
              <span className="font-bold text-lg">Жоқ, қауіпті</span>
            </button>
          </div>
        ) : (
          <div className="mt-auto animate-fade-in flex flex-col gap-6">
            <div className={`flex items-start gap-4 p-5 rounded-2xl border-2 shadow-sm ${lastAnswerCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800 animate-pop' : 'bg-rose-50 border-rose-200 text-rose-800 animate-shake'}`}>
              <div className="shrink-0 mt-1">
                {lastAnswerCorrect ? <CheckCircle size={32} className="animate-pulse" /> : <XCircle size={32} />}
              </div>
              <div>
                <p className="font-black text-xl mb-1">{lastAnswerCorrect ? 'Дұрыс!' : 'Қате!'}</p>
                <p className="text-base opacity-90">{currentScenario.explanation}</p>
              </div>
            </div>
            <button 
              onClick={nextScenario}
              className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-xl transition w-full hover:scale-[1.02] active:scale-95"
            >
              Келесі сұрақ <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
