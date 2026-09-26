import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Footprints, Monitor, Award } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

export const Layout: React.FC = () => {
  const { isPresentationMode, togglePresentationMode, achievements } = useAppContext();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Басты бет' },
    { path: '/theory', label: 'Теория' },
    { path: '/simulations', label: 'Симуляциялар' },
    { path: '/rules', label: 'Ережелер' },
    { path: '/results', label: 'Нәтижелер' },
    { path: '/about', label: 'Жоба туралы' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-primary)]">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 md:px-10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-[var(--color-primary)] hover:opacity-80 transition">
            <Footprints className="text-[var(--color-accent)]" size={32} />
            <span>Сандық Із</span>
          </Link>
          
          <nav className="hidden md:flex gap-6 font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-[var(--color-accent)] transition ${
                  location.pathname === link.path ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/achievements" className="relative flex items-center gap-1 font-bold text-[var(--color-secondary)] hover:opacity-80">
              <Award size={24} />
              <span className="hidden sm:inline">Жетістіктер</span>
              {achievements.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-warning)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {achievements.length}
                </span>
              )}
            </Link>
            
            <button
              onClick={togglePresentationMode}
              className={`p-2 rounded-full border-2 transition ${
                isPresentationMode ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]' : 'border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-gray-100'
              }`}
              title="Презентация режимі"
            >
              <Monitor size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation - scrollable horizontal list */}
        <div className="md:hidden mt-4 overflow-x-auto pb-2 flex gap-4 font-semibold text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`whitespace-nowrap px-3 py-1 rounded-full ${
                location.pathname === link.path ? 'bg-[var(--color-accent)] text-white' : 'bg-white border'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#17224D] text-white py-6 text-center mt-auto">
        <p className="opacity-80">«Зерде» ғылыми жобасы © {new Date().getFullYear()}</p>
        <p className="text-sm mt-2 opacity-60">Интернеттегі ізіңді қауіпсіз басқар!</p>
      </footer>
    </div>
  );
};
