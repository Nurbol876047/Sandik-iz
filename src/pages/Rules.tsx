import React from 'react';
import rulesData from '../data/rules.json';
import { ShieldAlert, BrainCircuit, KeyRound, MapPinOff, Link, Lock, MessageCircleHeart, Users, Printer } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ShieldAlert, BrainCircuit, KeyRound, MapPinOff, Link, Lock, MessageCircleHeart, Users
};

export const Rules: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-10 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-100">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Кибергигиена ережелері</h1>
          <p className="text-gray-600">Осы ережелерді сақтап, интернетте қауіпсіз бол!</p>
        </div>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#FFC53D] hover:bg-yellow-500 text-yellow-900 font-bold py-3 px-6 rounded-xl shadow transition"
        >
          <Printer size={20} />
          <span className="hidden sm:inline">Басып шығару</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 print:grid-cols-2 print:gap-4 print:text-black">
        {rulesData.map((rule, index) => {
          const IconComponent = iconMap[rule.icon] || ShieldAlert;
          return (
            <div key={rule.id} className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-100 flex flex-col h-full print:border-gray-400 print:shadow-none">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl shrink-0 print:bg-transparent print:text-black">
                  <IconComponent size={28} />
                </div>
                <h3 className="font-bold text-lg leading-tight">
                  <span className="text-gray-400 text-sm block mb-1">Ереже #{index + 1}</span>
                  {rule.title}
                </h3>
              </div>
              <p className="text-gray-700 text-sm mt-auto print:text-black">
                {rule.description}
              </p>
            </div>
          );
        })}
      </div>
      
      <div className="hidden print:block mt-10 text-center text-sm text-gray-500">
        <p>«Сандық із: интернеттегі ізіміз» ғылыми жобасы аясында дайындалған жадынама.</p>
      </div>
      
      {/* Print styles inserted locally */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
          }
          header, footer, nav, button {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};
