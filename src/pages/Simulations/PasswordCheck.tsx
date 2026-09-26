import React, { useState, useEffect } from 'react';
import { KeyRound, ShieldAlert, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

export const PasswordCheck: React.FC = () => {
  const { addAchievement } = useAppContext();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return { score: 0, time: '0 секунд', color: 'bg-gray-200', text: 'Құпиясөз жазыңыз' };
    
    if (pwd.length > 6) score += 1;
    if (pwd.length > 10) score += 1;
    if (pwd.length >= 14) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 2;
    
    // Penalize simple patterns
    if (/^[a-zA-Z]+$/.test(pwd)) score -= 1; // only letters
    if (/^[0-9]+$/.test(pwd)) score -= 1; // only numbers
    if (/^(123+45|qwerty|password|admin)$/i.test(pwd)) score = 1; // exactly common password
    else if (/(12345|qwerty|password)/i.test(pwd)) score -= 1; // contains common sequence

    score = Math.max(1, Math.min(6, score));

    const timeMap: Record<number, string> = {
      1: 'Лезде',
      2: 'Бірнеше секунд',
      3: 'Бірнеше минут',
      4: 'Бірнеше күн',
      5: 'Жүздеген жыл',
      6: 'Миллиондаған жыл'
    };

    const colorMap: Record<number, string> = {
      1: 'bg-rose-500',
      2: 'bg-orange-500',
      3: 'bg-yellow-500',
      4: 'bg-lime-500',
      5: 'bg-emerald-500',
      6: 'bg-teal-500'
    };

    const textMap: Record<number, string> = {
      1: 'Өте әлсіз',
      2: 'Әлсіз',
      3: 'Орташа',
      4: 'Мықты',
      5: 'Өте мықты',
      6: 'Бұзылмайды'
    };

    return { score, time: timeMap[score], color: colorMap[score], text: textMap[score] };
  };

  const strength = calculateStrength(password);

  useEffect(() => {
    if (strength.score >= 5) {
      addAchievement('password');
    }
  }, [strength.score, addAchievement]);

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-3xl mx-auto w-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Құпиясөз тексеруші</h1>
        <p className="text-gray-600">
          Сенің пароліңді хакерлер қанша уақытта бұза алады? Тексеріп көрейік. 
          <br/><span className="text-emerald-600 font-bold">Уайымдама, бұл пароль ешқайда сақталмайды және жіберілмейді.</span>
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
        <div className="relative mb-8">
          <input 
            type={showPassword ? 'text' : 'password'} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Құпиясөзіңізді жазыңыз..."
            className="w-full text-xl p-4 pr-12 rounded-xl border-2 border-gray-300 focus:border-[var(--color-accent)] focus:outline-none font-mono transition"
          />
          <button 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        </div>

        {password.length > 0 && (
          <div className="animate-fade-in space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-gray-700">Мықтылығы: {strength.text}</span>
                <span className="text-sm font-bold opacity-70">
                  Бұзуға кететін уақыт: <span className="text-black text-lg ml-1">{strength.time}</span>
                </span>
              </div>
              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden flex gap-1">
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <div 
                    key={level} 
                    className={`h-full flex-1 transition-colors duration-500 ${level <= strength.score ? strength.color : 'bg-transparent'}`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-blue-900 text-sm">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <KeyRound size={20} />
                Мықты құпиясөздің құпиясы:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  {password.length >= 10 ? <ShieldCheck className="text-emerald-500" size={16}/> : <ShieldAlert className="text-rose-400" size={16}/>}
                  Ұзындығы кем дегенде 10 таңба (одан да ұзақ болса жақсы)
                </li>
                <li className="flex items-center gap-2">
                  {/[A-Z]/.test(password) ? <ShieldCheck className="text-emerald-500" size={16}/> : <ShieldAlert className="text-rose-400" size={16}/>}
                  Үлкен әріптер (A, B, C...)
                </li>
                <li className="flex items-center gap-2">
                  {/[0-9]/.test(password) ? <ShieldCheck className="text-emerald-500" size={16}/> : <ShieldAlert className="text-rose-400" size={16}/>}
                  Сандар (1, 2, 3...)
                </li>
                <li className="flex items-center gap-2">
                  {/[^A-Za-z0-9]/.test(password) ? <ShieldCheck className="text-emerald-500" size={16}/> : <ShieldAlert className="text-rose-400" size={16}/>}
                  Арнайы белгілер (!, @, #, $, %, ^...)
                </li>
              </ul>
            </div>

            {strength.score >= 5 && (
              <div className="bg-emerald-100 text-emerald-800 p-4 rounded-xl border border-emerald-200 font-bold text-center">
                Жарайсың! Өте мықты пароль құрастырдың. Енді осыны ұмытпайтын жерге сақтап қой. Медаль берілді!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
