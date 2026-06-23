import React, { useEffect, useMemo, useRef, useState } from 'react';
import MainLayout from '../../components/main-layout';
import MainContent from '../../components/main-content';
import Dashboard from '../../components/dashboard';
import ShareFormModal from '../../components/share-form-modal';
import { formatDate, type Lead } from '../../components/lead';
import { getLeads, createForm, type ApiLead } from '../../lib/api';

// Score ainda não existe no modelo de dados — valor random inserido no carregamento.
// Por agora é o mesmo para todas as linhas.
const RANDOM_SCORE = Math.floor(Math.random() * 101);

// Converte o lead vindo do servidor para o tipo usado pela UI.
const toLead = (l: ApiLead): Lead => ({
  id: l.id,
  name: l.name,
  email: l.email,
  contact: l.contact,
  score: RANDOM_SCORE,
  budget: l.budget,
  local: [l.district, l.town].filter(Boolean).join(', '),
  added: formatDate(l.createdAt),
  tipologia: l.type.join(', ') || '—',
  credito: l.approved ? 'Sim' : 'Não',
  extras: l.notes || '—',
});

// Rota /dashboard — detém todo o estado/lógica e compõe o layout da app autenticada.
const DashboardPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Lead | null>(null);

  // Modal de partilha do formulário (gerar link + copiar).
  const [shareOpen, setShareOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareError, setShareError] = useState('');
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { leads: data } = await getLeads(100, 0);
        if (active) setLeads(data.map(toLead));
      } catch {
        if (active) setError('Não foi possível carregar as leads.');
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  // Abre a modal e gera um novo formulário; o link público é construído a partir do formId.
  const handleNewLead = async () => {
    setShareOpen(true);
    setCopied(false);
    setShareError('');
    setShareLink('');
    setIsGenerating(true);
    try {
      const { formId } = await createForm();
      setShareLink(`${window.location.origin}/form/${formId}`);
    } catch {
      setShareError('Não foi possível gerar o link. Tenta novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = shareLink;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* ignora — clipboard indisponível */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1800);
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? leads.filter((l) => (l.name + ' ' + l.email + ' ' + l.local).toLowerCase().includes(q))
      : leads;
  }, [query, leads]);

  const highScore = leads.filter((l) => l.score >= 80).length;

  return (
    <MainLayout>
      <MainContent>
        <Dashboard
          rows={rows}
          total={leads.length}
          highScore={highScore}
          query={query}
          onQueryChange={setQuery}
          isLoading={isLoading}
          error={error}
          selected={selected}
          onSelectLead={setSelected}
          onCloseModal={() => setSelected(null)}
          onNewLead={handleNewLead}
        />
        <ShareFormModal
          isOpen={shareOpen}
          link={shareLink}
          isGenerating={isGenerating}
          copied={copied}
          error={shareError}
          onCopy={handleCopy}
          onClose={() => setShareOpen(false)}
        />
      </MainContent>
    </MainLayout>
  );
};

export default DashboardPage;
