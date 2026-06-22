// Tipo de lead usado pela UI do dashboard.
// Nota: o modelo do servidor (src/server/types/lead.ts) ainda não tem `score`,
// por isso o score é um valor random inserido no render (ver dashboard.tsx).
export interface Lead {
  id: string;
  name: string;
  email: string;
  score: number; // 0–100 (random por agora)
  budget: number; // em euros
  local: string; // concelho
  added: string; // data já formatada (ex.: "18 Jun 2026")
  tipologia: string; // T0/T1/T2/T3/Moradia
  credito: 'Sim' | 'Não';
  extras: string;
}

export const euro = (n: number) => '€' + n.toLocaleString('pt-PT');

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// Formata uma data ISO para o estilo do design: "18 Jun 2026".
export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};
