
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle, 
  Star, 
  Share2, 
  BookOpen, 
  Maximize2,
  Minimize2,
  Loader2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Module, Lesson } from '../types';
import { getLessonContent } from '../services/geminiService';

interface LessonViewProps {
  modules: Module[];
  onComplete: (id: string) => void;
  onFavorite: (id: string) => void;
  favoriteIds: string[];
}

const LessonView: React.FC<LessonViewProps> = ({ modules, onComplete, onFavorite, favoriteIds }) => {
  const { moduleId, lessonId } = useParams<{ moduleId: string, lessonId: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const module = modules.find(m => m.id === moduleId);
  const lesson = module?.lessons.find(l => l.id === lessonId);
  const isFavorited = favoriteIds.includes(lessonId || '');

  useEffect(() => {
    if (lesson && module) {
      setLoading(true);
      getLessonContent(lesson.title, module.title).then(res => {
        setContent(res);
        setLoading(false);
      });
    }
  }, [lessonId, moduleId]);

  if (!lesson || !module) return null;

  return (
    <div className={`min-h-screen bg-white ${isFullScreen ? 'fixed inset-0 z-50 overflow-y-auto' : ''}`}>
      {/* Sticky Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{module.title}</p>
            <h1 className="text-lg font-bold text-slate-900 line-clamp-1">{lesson.title}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onFavorite(lesson.id)}
            className={`p-2 rounded-full transition-colors ${isFavorited ? 'bg-amber-50 text-amber-500' : 'hover:bg-slate-100 text-slate-400'}`}
          >
            <Star size={20} fill={isFavorited ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
          >
            {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </header>

      {/* Reader Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-6" />
            <p className="text-slate-500 font-medium text-lg animate-pulse">Acessando base de conhecimento profunda...</p>
            <p className="text-slate-400 text-sm mt-2">Isso pode levar alguns segundos devido à profundidade do conteúdo.</p>
          </div>
        ) : (
          <article className="prose prose-financial prose-slate mx-auto">
            <div className="mb-10 pb-10 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-slate-400 mb-6 font-medium text-sm">
                <BookOpen size={16} />
                <span>Estudo Profundo</span>
                <span>•</span>
                <span>{lesson.estimatedMinutes} min de leitura</span>
              </div>
              <h2 className="text-5xl font-serif text-slate-900 leading-tight mb-4">
                {lesson.title}
              </h2>
              <p className="text-xl text-slate-500 font-medium">
                {lesson.description}
              </p>
            </div>

            <div className="markdown-body">
              <ReactMarkdown 
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-slate-900 mt-12 mb-6" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-5" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4" {...props} />,
                  p: ({node, ...props}) => <p className="text-lg text-slate-700 leading-relaxed mb-6" {...props} />,
                  li: ({node, ...props}) => <li className="text-lg text-slate-700 mb-2" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-emerald-500 bg-emerald-50 p-6 rounded-r-2xl italic text-emerald-900 mb-8" {...props} />,
                  code: ({node, ...props}) => <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-sm" {...props} />
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            <div className="mt-20 p-10 bg-slate-900 text-white rounded-[2rem] shadow-xl">
              <h4 className="text-2xl font-bold mb-4">Ação Prática</h4>
              <p className="text-slate-400 mb-8">Conhecimento sem aplicação é apenas entretenimento. Realize o exercício acima antes de prosseguir.</p>
              <button 
                onClick={() => {
                  onComplete(lesson.id);
                  navigate('/library');
                }}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center space-x-3 ${
                  lesson.isCompleted 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-emerald-500 text-slate-900 hover:bg-emerald-400'
                }`}
              >
                <CheckCircle size={24} />
                <span>{lesson.isCompleted ? 'Lição Concluída' : 'Marcar como Concluído'}</span>
              </button>
            </div>
          </article>
        )}
      </div>

      {/* Progress Footer */}
      {!loading && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex items-center justify-between z-40 md:left-64">
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Seu Progresso no Módulo</p>
            <div className="w-48 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-1000" 
                style={{ width: `${(module.lessons.filter(l => l.isCompleted).length / module.lessons.length) * 100}%` }} 
              />
            </div>
          </div>
          <button 
            onClick={() => {
              const nextIdx = module.lessons.findIndex(l => l.id === lessonId) + 1;
              if (module.lessons[nextIdx]) {
                navigate(`/lesson/${module.id}/${module.lessons[nextIdx].id}`);
              } else {
                navigate('/library');
              }
            }}
            className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800"
          >
            <span>Próxima Lição</span>
            <ChevronRight size={18} />
          </button>
        </footer>
      )}
    </div>
  );
};

export default LessonView;
