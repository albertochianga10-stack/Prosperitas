
import { Module, ModuleCategory } from './types';

export const APP_THEME = {
  primary: 'emerald-600',
  secondary: 'slate-900',
  accent: 'amber-500',
};

export const INITIAL_MODULES: Module[] = [
  {
    id: 'm1',
    title: 'O Despertar da Riqueza',
    category: ModuleCategory.MINDSET,
    level: 1,
    description: 'Fundamentos da psicologia do dinheiro e mentalidade milionária.',
    lessons: [
      { id: 'm1-l1', title: 'Psicologia do Investidor', description: 'Como o cérebro sabota sua riqueza.', category: ModuleCategory.MINDSET, isUnlocked: true, isCompleted: false, estimatedMinutes: 15 },
      { id: 'm1-l2', title: 'Hábitos de 1%', description: 'A rotina financeira dos multimilionários.', category: ModuleCategory.MINDSET, isUnlocked: false, isCompleted: false, estimatedMinutes: 20 },
      { id: 'm1-l3', title: 'Dívidas Boas vs Ruins', description: 'O uso estratégico da alavancagem.', category: ModuleCategory.MINDSET, isUnlocked: false, isCompleted: false, estimatedMinutes: 18 }
    ]
  },
  {
    id: 'm2',
    title: 'Domínio do Fluxo',
    category: ModuleCategory.FINANCE,
    level: 1,
    description: 'Gestão prática de recursos e planejamento de curto a longo prazo.',
    lessons: [
      { id: 'm2-l1', title: 'Orçamento Inabalável', description: 'Criando um sistema que trabalha por você.', category: ModuleCategory.FINANCE, isUnlocked: true, isCompleted: false, estimatedMinutes: 25 },
      { id: 'm2-l2', title: 'Proteção Patrimonial', description: 'Seguros e reservas de emergência.', category: ModuleCategory.FINANCE, isUnlocked: false, isCompleted: false, estimatedMinutes: 15 }
    ]
  },
  {
    id: 'm3',
    title: 'A Engrenagem do Mundo',
    category: ModuleCategory.ECONOMY,
    level: 2,
    description: 'Entendendo ciclos, inflação e macroeconomia global.',
    lessons: [
      { id: 'm3-l1', title: 'Inflação e Deflação', description: 'O inimigo invisível do seu poder de compra.', category: ModuleCategory.ECONOMY, isUnlocked: false, isCompleted: false, estimatedMinutes: 30 },
      { id: 'm3-l2', title: 'Geopolítica Financeira', description: 'Como o cenário global afeta seu bolso.', category: ModuleCategory.ECONOMY, isUnlocked: false, isCompleted: false, estimatedMinutes: 40 }
    ]
  },
  {
    id: 'm4',
    title: 'Máquina de Juros Compostos',
    category: ModuleCategory.MATH,
    level: 2,
    description: 'A oitava maravilha do mundo explicada matematicamente.',
    lessons: [
      { id: 'm4-l1', title: 'A Matemática da Liberdade', description: 'Cálculos de independência financeira.', category: ModuleCategory.MATH, isUnlocked: false, isCompleted: false, estimatedMinutes: 20 },
      { id: 'm4-l2', title: 'O Poder do Tempo', description: 'Simulações de 10 a 40 anos.', category: ModuleCategory.MATH, isUnlocked: false, isCompleted: false, estimatedMinutes: 25 }
    ]
  },
  {
    id: 'm5',
    title: 'O Jogo dos Grandes',
    category: ModuleCategory.INVESTMENT,
    level: 3,
    description: 'Renda variável, Ações, ETFs e análise fundamentalista.',
    lessons: [
      { id: 'm5-l1', title: 'Introdução à Bolsa', description: 'Como se tornar sócio de grandes empresas.', category: ModuleCategory.INVESTMENT, isUnlocked: false, isCompleted: false, estimatedMinutes: 45 },
      { id: 'm5-l2', title: 'ETFs e Fundos', description: 'Diversificação passiva de alto nível.', category: ModuleCategory.INVESTMENT, isUnlocked: false, isCompleted: false, estimatedMinutes: 35 },
      { id: 'm5-l3', title: 'Gestão de Risco', description: 'Como nunca ser tirado do jogo.', category: ModuleCategory.INVESTMENT, isUnlocked: false, isCompleted: false, estimatedMinutes: 30 }
    ]
  },
  {
    id: 'm6',
    title: 'Império Próprio',
    category: ModuleCategory.BUSINESS,
    level: 3,
    description: 'Empreendedorismo do zero à escala global.',
    lessons: [
      { id: 'm6-l1', title: 'Modelos de Negócios', description: 'Identificando oportunidades lucrativas.', category: ModuleCategory.BUSINESS, isUnlocked: false, isCompleted: false, estimatedMinutes: 50 },
      { id: 'm6-l2', title: 'Escalabilidade Digital', description: 'Vendendo para o mundo enquanto dorme.', category: ModuleCategory.BUSINESS, isUnlocked: false, isCompleted: false, estimatedMinutes: 45 }
    ]
  }
];
