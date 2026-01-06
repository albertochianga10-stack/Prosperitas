
export enum ModuleCategory {
  MINDSET = 'Mentalidade e Gestão',
  FINANCE = 'Finanças Pessoais',
  ECONOMY = 'Economia',
  INVESTMENT = 'Investimentos',
  BUSINESS = 'Negócios e Empreendedorismo',
  MATH = 'Juros e Patrimônio'
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content?: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  category: ModuleCategory;
  estimatedMinutes: number;
}

export interface Module {
  id: string;
  title: string;
  category: ModuleCategory;
  description: string;
  lessons: Lesson[];
  level: number;
}

export interface UserProgress {
  completedLessonIds: string[];
  favoriteLessonIds: string[];
  totalPoints: number;
  currentLevel: number;
}

export interface SimulationResult {
  year: number;
  total: number;
  contributions: number;
  interest: number;
}
