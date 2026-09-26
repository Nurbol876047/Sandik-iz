import React from 'react';
import projectData from '../data/project.json';
import { Target, CheckCircle2, User, BookOpen } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-4xl mx-auto w-full">
      <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-gray-100 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{projectData.title}</h1>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
            <User size={18} className="text-[var(--color-accent)]" />
            <span className="font-semibold">Авторы:</span> {projectData.author}, {projectData.grade}
          </div>
          <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
            <BookOpen size={18} className="text-[var(--color-success)]" />
            <span className="font-semibold">Жетекші:</span> {projectData.supervisor}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
          <div className="flex items-center gap-2 mb-4 text-[var(--color-accent)]">
            <Target size={24} />
            <h2 className="text-2xl font-bold">Жоба мақсаты</h2>
          </div>
          <p className="text-gray-800 text-lg">{projectData.purpose}</p>
        </div>

        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <div className="flex items-center gap-2 mb-4 text-[var(--color-success)]">
            <CheckCircle2 size={24} />
            <h2 className="text-2xl font-bold">Гипотеза</h2>
          </div>
          <p className="text-gray-800 text-lg">{projectData.hypothesis}</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-gray-100">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Міндеттері</h2>
        <ul className="space-y-3">
          {projectData.tasks.map((task, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <span className="text-[var(--color-accent)] font-bold mt-1">{idx + 1}.</span>
              <span className="text-gray-800 text-lg">{task}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Зерттеу әдістері</h2>
          <div className="flex flex-wrap gap-2">
            {projectData.methods.map((method, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                {method}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
          <h2 className="text-xl font-bold mb-4 text-yellow-900">Қорытынды</h2>
          <p className="text-gray-800">{projectData.conclusion}</p>
        </div>
      </div>
    </div>
  );
};
