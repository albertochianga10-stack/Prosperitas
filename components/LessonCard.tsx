
import React from 'react';
import { CheckCircle, Lock, Clock } from 'lucide-react';
import { Lesson } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  onClick: (lesson: Lesson) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onClick }) => {
  return (
    <button
      onClick={() => lesson.isUnlocked && onClick(lesson)}
      disabled={!lesson.isUnlocked}
      className={`w-full text-left p-5 rounded-xl border transition-all duration-200 group relative ${
        lesson.isUnlocked 
          ? 'bg-white border-slate-200 hover:border-emerald-500 hover:shadow-md' 
          : 'bg-slate-50 border-slate-100 opacity-75 cursor-not-allowed'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className={`font-bold ${lesson.isUnlocked ? 'text-slate-900' : 'text-slate-400'}`}>
          {lesson.title}
        </h4>
        {lesson.isCompleted ? (
          <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-50" />
        ) : !lesson.isUnlocked ? (
          <Lock className="w-5 h-5 text-slate-300" />
        ) : null}
      </div>
      <p className="text-sm text-slate-500 line-clamp-2 mb-4">
        {lesson.description}
      </p>
      <div className="flex items-center text-xs text-slate-400">
        <Clock className="w-3 h-3 mr-1" />
        {lesson.estimatedMinutes} min
      </div>
      
      {!lesson.isUnlocked && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-slate-900 text-white text-[10px] px-2 py-1 rounded uppercase tracking-widest font-bold">Bloqueado</span>
        </div>
      )}
    </button>
  );
};

export default LessonCard;
