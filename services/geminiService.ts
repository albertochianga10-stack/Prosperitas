import { GoogleGenAI } from "@google/genai";

export async function getLessonContent(lessonTitle: string, moduleTitle: string): Promise<string> {
  if (!process.env.API_KEY) {
    return "A chave de API não foi configurada. Entre em contato com o suporte.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Você é um mentor financeiro de elite, PHD em economia e investidor bilionário.
        Sua tarefa é escrever um capítulo EXTREMAMENTE APROFUNDADO e PROFISSIONAL sobre o tema: "${lessonTitle}" que faz parte do módulo "${moduleTitle}".

        O conteúdo deve ser estruturado em Markdown e incluir:
        1. Uma introdução provocativa sobre a importância do tema.
        2. Conceitos fundamentais explicados com rigor técnico, mas linguagem acessível.
        3. No mínimo 5 sub-tópicos densos.
        4. Exemplos práticos reais e estudos de caso.
        5. Analogias poderosas para fixação.
        6. Uma seção de "Estratégia Milionária" (conselhos práticos).
        7. Um resumo executivo ao final.
        8. Um exercício de aplicação real.

        O tom deve ser inspirador, estratégico e focado em LONGO PRAZO. 
        Evite promessas de dinheiro rápido. 
        O texto deve ser longo, detalhado e educativo.
      `,
      config: {
        temperature: 0.7,
        topP: 0.95,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "Desculpe, não conseguimos carregar este conteúdo agora.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com a base de conhecimento. Verifique sua conexão ou a validade da sua chave de API.";
  }
}

export async function getDailyQuote(): Promise<string> {
  if (!process.env.API_KEY) return "O sucesso financeiro é o resultado de pequenos hábitos diários.";

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Gere uma frase curta e poderosa de sabedoria financeira para o dia, focada em longo prazo e disciplina.",
    });
    return response.text || "O tempo é o maior aliado do investidor disciplinado.";
  } catch {
    return "O sucesso financeiro é o resultado de pequenos hábitos diários.";
  }
}