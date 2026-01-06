import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  TrendingUp, 
  LayoutDashboard, 
  Calculator, 
  Award,
  ChevronRight,
  User,
  Star,
  Search,
  Lightbulb
} from 'lucide-react';
import { INITIAL_MODULES } from './constants';
import { Lesson, Module, UserProgress, ModuleCategory } from './types';
import Dashboard from './components/Dashboard';
import LessonCard from './components/LessonCard';
import LessonView from './components/LessonView';
import CompoundInterestCalculator from './components/CompoundInterestCalculator';

const App: React.FC = () => {
  const [modules, setModules] = useState<Module[]>(() => {
    const saved = localStorage.getItem('prosperitas_modules');
    return saved ? JSON.parse(saved) : INITIAL_MODULES;
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('prosperitas_progress');
    return saved ? JSON.parse(saved) : {
      completedLessonIds: [],
      favoriteLessonIds: [],
      totalPoints: 0,
      currentLevel: 1
    };
  });

  useEffect(() => {
    localStorage.setItem('prosperitas_modules', JSON.stringify(modules));
    localStorage.setItem('prosperitas_progress', JSON.stringify(progress));
  }, [modules, progress]);

  const completeLesson = (lessonId: string) => {
    if (progress.completedLessonIds.includes(lessonId)) return;

    setProgress(prev => ({
      ...prev,
      completedLessonIds: [...prev.completedLessonIds, lessonId],
      totalPoints: prev.totalPoints + 100
    }));

    setModules(prevModules => {
      const newModules = JSON.parse(JSON.stringify(prevModules)) as Module[];
      let found = false;
      for (let m = 0; m < newModules.length; m++) {
        for (let l = 0; l < newModules[m].lessons.length; l++) {
          if (newModules[m].lessons[l].id === lessonId) {
            newModules[m].lessons[l].isCompleted = true;
            if (newModules[m].lessons[l + 1]) {
              newModules[m].lessons[l + 1].isUnlocked = true;
            } else if (newModules[m + 1]) {
              newModules[m + 1].lessons[0].isUnlocked = true;
            }
            found = true;
            break;
          }
        }
        if (found) break;
      }
      return newModules;
    });
  };

  const toggleFavorite = (lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      favoriteLessonIds: prev.favoriteLessonIds.includes(lessonId)
        ? prev.favoriteLessonIds.filter(id => id !== lessonId)
        : [...prev.favoriteLessonIds, lessonId]
    }));
  };

  return (
    <Router>
      <div className="min-h-screen flex bg-slate-50 text-slate-900">
        {/* Sidebar Nav */}
        <nav className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col border-r border-slate-800">
          <div className="p-8">
            <Link to="/" className="flex items-center space-x-2 mb-10 cursor-pointer">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-900">P</div>
              <h1 className="text-xl font-bold tracking-tight">PROSPERITAS</h1>
            </Link>

            <div className="space-y-1">
              <NavLink to="/" icon={<LayoutDashboard size={20} />} label="Início" />
              <NavLink to="/library" icon={<BookOpen size={20} />} label="Biblioteca" />
              <NavLink to="/simulator" icon={<Calculator size={20} />} label="Simulador" />
              <NavLink to="/favorites" icon={<Star size={20} />} label="Favoritos" />
            </div>
          </div>

          <div className="mt-auto p-6 border-t border-slate-800">
            <div className="flex items-center space-x-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <User className="text-emerald-400" size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Nível {Math.floor(progress.totalPoints / 1000) + 1}</p>
                <p className="text-sm font-bold text-white">Investidor Elite</p>
              </div>
            </div>
          </div>
        </nav>

        {/* Main View */}
        <main className="flex-grow overflow-y-auto relative">
          <Routes>
            <Route path="/" element={<Dashboard modules={modules} progress={progress} />} />
            <Route path="/library" element={<Library modules={modules} />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/lesson/:moduleId/:lessonId" element={<LessonView modules={modules} onComplete={completeLesson} onFavorite={toggleFavorite} favoriteIds={progress.favoriteLessonIds} />} />
            <Route path="/favorites" element={<FavoritesPage modules={modules} favoriteIds={progress.favoriteLessonIds} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const NavLink: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
        isActive ? 'bg-emerald-500 text-slate-900 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Library: React.FC<{ modules: Module[] }> = ({ modules }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredModules = modules.filter(m => {
    const matchesFilter = filter === 'Todos' || m.category === filter;
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.lessons.some(l => l.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const categories = ['Todos', ...Object.values(ModuleCategory)];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Academia de Riqueza</h2>
          <p className="text-slate-500">Módulos fundamentais para sua transformação financeira.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar lição..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-64"
          />
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
              filter === cat ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {filteredModules.length > 0 ? filteredModules.map((module) => (
          <section key={module.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">
                  Nível {module.level} • {module.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{module.title}</h3>
                <p className="text-slate-500">{module.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {module.lessons.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  onClick={() => navigate(`/lesson/${module.id}/${lesson.id}`)} 
                />
              ))}
            </div>
          </section>
        )) : (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">Nenhum módulo encontrado para sua busca.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SimulatorPage: React.FC = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <div className="mb-10 text-center">
      <h2 className="text-4xl font-serif text-slate-900 mb-4">O Motor da Independência</h2>
      <p className="text-slate-500 text-lg">A matemática não mente: tempo e disciplina vencem qualquer sorte.</p>
    </div>
    <CompoundInterestCalculator />
    <div className="mt-12 bg-emerald-900 text-white p-8 rounded-3xl relative overflow-hidden">
      <div className="relative z-10">
        <h4 className="text-2xl font-bold mb-4">Dica do Mentor</h4>
        <p className="text-emerald-100 leading-relaxed max-w-2xl">
          Observe como a curva se torna exponencial após o 15º ano. A maioria das pessoas desiste antes de chegar lá. 
          O segredo não é a taxa de juros mais alta, mas a capacidade de permanecer no jogo pelo tempo necessário.
        </p>
      </div>
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Lightbulb size={120} />
      </div>
    </div>
  </div>
);

const FavoritesPage: React.FC<{ modules: Module[], favoriteIds: string[] }> = ({ modules, favoriteIds }) => {
  const navigate = useNavigate();
  const favoriteLessons = modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id }))).filter(l => favoriteIds.includes(l.id));

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Seu Cofre de Conhecimento</h2>
      {favoriteLessons.length === 0 ? (
        <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-slate-200 text-center">
          <Star className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-400">Nenhuma lição favoritada ainda.</h3>
          <p className="text-slate-400 mt-2">Salve lições importantes para acessá-las rapidamente.</p>
          <Link to="/library" className="inline-block mt-8 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold">Explorar Biblioteca</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteLessons.map(lesson => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson} 
              onClick={() => navigate(`/lesson/${lesson.moduleId}/${lesson.id}`)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;