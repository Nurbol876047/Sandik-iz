import React from 'react';
import surveyData from '../data/survey.json';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Users } from 'lucide-react';

const COLORS = ['#5B3DF5', '#2BB39A', '#FFC53D', '#FF5C84', '#17224D'];

export const Results: React.FC = () => {
  if (!surveyData || !surveyData.questions || surveyData.questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <h2 className="text-2xl font-bold mb-2">Зерттеу нәтижелері</h2>
        <p>Нәтижелер әлі енгізілмеген.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Зерттеу нәтижелері</h1>
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
          <Users size={20} />
          <span>Сауалнамаға қатысқан оқушылар саны: {surveyData.totalParticipants}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {surveyData.questions.map((q, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-100">
            <h3 className="font-bold text-xl mb-6 text-center">{q.question}</h3>
            <div className="h-72 w-full">
              {index % 2 === 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={q.options}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      {q.options.map((_, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} адам`, 'Саны']} />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={q.options} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      interval={0} 
                      angle={-15} 
                      textAnchor="end" 
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip formatter={(value) => [`${value} адам`, 'Саны']} cursor={{fill: 'transparent'}} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {q.options.map((_, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
