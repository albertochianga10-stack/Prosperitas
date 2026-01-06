
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Award, 
  ChevronRight, 
  Zap, 
  Clock, 
  ShieldCheck,
  Target
} from 'lucide-react';
import { Module, UserProgress } from '../types';
import { getDailyQuote } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  modules: Module[];
  progress: UserProgress;
}

const Dashboard: React.FC<DashboardProps> = ({ modules, progress }) => {
  const [quote, setQuote] = useState("O tempo é o maior aliado do investidor disciplinado.");
  const navigate = useNavigate();

  useEffect(() => {
    getDailyQuote().then(setQuote);
  }, []);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = progress.completedLessonIds.length;
  const completionPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const nextLesson = modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id, moduleTitle: m.title })))
                            .find(l => !l.isCompleted && l.isUnlocked);

  // Recommendations logic: pick some unlocked but not completed lessons
  const recommended = modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id })))
                             .filter(l => l.isUnlocked && !l.isCompleted)
                             .slice(0, 3);

  return (
    <div className="p-8 max-w-6xl mx-auto pb-20 animate-in fade-in duration-700">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif text-slate-900 mb-2">Bem-vindo, Visionário.</h1>
          <p className="text-slate-500 text-lg">Sua jornada para a liberdade financeira continua.</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center space-x-6 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progresso</p>
            <p className="text-xl font-bold text-emerald-600">{completionPercentage}%</p>
          </div>
          <div className="w-[1px] h-10 bg-slate-100" />
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pontos</p>
            <p className="text-xl font-bold text-slate-900">{progress.totalPoints}</p>
          </div>
        </div>
      </header>

      <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] mb-12 relative overflow-hidden shadow-2xl shadow-emerald-900/10">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-2 text-emerald-400 mb-4">
            <Zap size={18} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Sabedoria do Dia</span>
          </div>
          <p className="text-3xl font-serif leading-tight italic">"{quote}"</p>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <Target size={20} className="text-emerald-500" />
              <span>Continue de onde parou</span>
            </h3>
            {nextLesson ? (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 group hover:border-emerald-500 transition-all cursor-pointer shadow-sm hover:shadow-md"
                   onClick={() => navigate(`/lesson/${nextLesson.moduleId}/${nextLesson.id}`)}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{nextLesson.moduleTitle}</span>
                    <h4 className="text-2xl font-bold text-slate-900 mt-2">{nextLesson.title}</h4>
                    <p className="text-slate-500 mt-1">{nextLesson.description}</p>
                  </div>
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChevronRight size={24} />
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm font-medium text-slate-500">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{nextLesson.estimatedMinutes} min</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-600">
                    <Award size={16} />
                    <span>+100 XP</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 text-center">
                <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-emerald-900">Parabéns! Você concluiu tudo.</h4>
                <p className="text-emerald-700 mt-2">Você agora possui uma base sólida. Fique atento para novos módulos.</p>
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">Suas Conquistas</h3>
              <button className="text-emerald-600 font-bold text-sm hover:underline" onClick={() => alert('Sistema de medalhas em expansão!')}>Ver tudo</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Badge icon={<TrendingUp />} label="Primeiros Passos" date="Hoje" />
              <Badge icon={<Award />} label="Poupador" date="Bloqueado" locked />
              <Badge icon={<Zap />} label="Investidor" date="Bloqueado" locked />
              <Badge icon={<ShieldCheck />} locked label="Milionário" date="Bloqueado" />
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-emerald-600 text-white p-8 rounded-3xl shadow-lg shadow-emerald-600/20">
            <h4 className="text-xl font-bold mb-4">Calculadora de Liberdade</h4>
            <p className="text-emerald-100 text-sm mb-6">Descubra quanto tempo falta para você viver de renda.</p>
            <button 
              onClick={() => navigate('/simulator')}
              className="w-full bg-white text-emerald-600 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-sm"
            >
              Simular Agora
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="text-lg font-bold text-slate-900 mb-4">Recomendações</h4>
            <div className="space-y-4">
              {recommended.length > 0 ? recommended.map(item => (
                <RecommendedItem 
                  key={item.id}
                  title={item.title} 
                  category={item.category} 
                  time={`${item.estimatedMinutes} min`} 
                  onClick={() => navigate(`/lesson/${item.moduleId}/${item.id}`)}
                />
              )) : (
                <p className="text-xs text-slate-400 italic">Continue explorando a biblioteca para novas lições.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Badge: React.FC<{ icon: React.ReactNode, label: string, date: string, locked?: boolean }> = ({ icon, label, date, locked }) => (
  <div className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all ${locked ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 shadow-sm hover:scale-105'}`}>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${locked ? 'bg-slate-200 text-slate-400' : 'bg-emerald-100 text-emerald-600'}`}>
      {icon}
    </div>
    <p className={`text-xs font-bold ${locked ? 'text-slate-400' : 'text-slate-900'}`}>{label}</p>
    <p className="text-[10px] text-slate-400 mt-1">{date}</p>
  </div>
);

const RecommendedItem: React.FC<{ title: string, category: string, time: string, onClick: () => void }> = ({ title, category, time, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between group cursor-pointer p-2 hover:bg-slate-50 rounded-xl transition-colors"
  >
    <div>
      <p className="text-xs font-bold text-emerald-600 mb-0.5">{category}</p>
      <p className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">{title}</p>
    </div>
    <span className="text-[10px] text-slate-400 font-medium">{time}</span>
  </div>
);

export default Dashboard;
