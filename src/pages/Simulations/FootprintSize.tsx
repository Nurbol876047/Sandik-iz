import React, { useState } from 'react';
import simulationsData from '../../data/simulations.json';
import { useAppContext } from '../../contexts/AppContext';

export const FootprintSize: React.FC = () => {
  const { addAchievement } = useAppContext();
  const questions = simulationsData.footprintSize;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (isYes: boolean) => {
    if (isYes) {
      setScore(prev => prev + questions[currentQuestion].weight);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsFinished(true);
      addAchievement('footprint-size');
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsFinished(false);
  };

  const maxScore = questions.reduce((acc, q) => acc + q.weight, 0);

  if (isFinished) {
    let resultMessage = '';
    let resultColor = '';
    
    if (score < 4) {
      resultMessage = 'Тамаша! Сенің сандық ізің өте кішкентай және қауіпсіз. Сен интернетте өте абайсың.';
      resultColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (score < 8) {
      resultMessage = 'Орташа! Сенің сандық ізің бар, бірақ оны әлі де бақылауда ұстап тұрсың. Кейбір әдеттеріңді өзгерткен дұрыс.';
      resultColor = 'bg-yellow-50 text-yellow-800 border-yellow-200';
    } else {
      resultMessage = 'Қауіпті! Сенің сандық ізің өте үлкен. Жеке деректеріңді қорғау үшін кибергигиена ережелерін шұғыл түрде қолдануың керек!';
      resultColor = 'bg-rose-50 text-rose-800 border-rose-200';
    }

    return (
      <div className="flex flex-col items-center justify-center gap-6 animate-fade-in py-12">
        <div className="bg-white p-10 rounded-3xl shadow-sm border-2 border-gray-100 text-center max-w-lg w-full">
          <h2 className="text-3xl font-bold mb-6">Сенің сандық ізің</h2>
          
          <div className="relative w-48 h-64 mx-auto mb-8">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center items-end" style={{ transform: `translateX(-50%) scale(${0.5 + (score / maxScore) * 1.5})`, transformOrigin: 'bottom center', transition: 'all 1s ease-out' }}>
              <svg viewBox="0 0 100 150" className="w-32 h-auto text-[var(--color-accent)] fill-current opacity-80" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 140 c-20 0-35-15-40-35 c-5-25 5-45 15-60 c10-15 20-30 25-40 c5 10 15 25 25 40 c10 15 20 35 15 60 c-5 20-20 35-40 35 z" />
                <circle cx="25" cy="25" r="8" />
                <circle cx="45" cy="15" r="9" />
                <circle cx="65" cy="18" r="8" />
                <circle cx="80" cy="35" r="7" />
              </svg>
            </div>
          </div>
          
          <div className={`p-6 rounded-2xl border-2 mb-6 font-bold text-lg ${resultColor}`}>
            {resultMessage}
          </div>
          
          <button 
            onClick={restart}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full transition w-full"
          >
            Қайта тапсыру
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-2xl mx-auto w-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Ізің қаншалықты үлкен?</h1>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
          <div 
            className="bg-[var(--color-accent)] h-full rounded-full transition-all duration-300" 
            style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border-2 border-gray-100 text-center min-h-[300px] flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-10">
          {questions[currentQuestion].question}
        </h2>

        <div className="grid grid-cols-2 gap-4 mt-auto">
          <button 
            onClick={() => handleAnswer(true)}
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold p-4 rounded-xl border border-indigo-200 transition text-xl hover:scale-[1.02] active:scale-95 shadow-sm"
          >
            Иә
          </button>
          <button 
            onClick={() => handleAnswer(false)}
            className="bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold p-4 rounded-xl border border-gray-200 transition text-xl hover:scale-[1.02] active:scale-95 shadow-sm"
          >
            Жоқ
          </button>
        </div>
      </div>
    </div>
  );
};
