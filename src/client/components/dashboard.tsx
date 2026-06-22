import React, { useEffect, useMemo, useState } from 'react';
import { Button, Spinner } from '@heroui/react';
import SearchInput from './search-input';
import LeadTable from './lead-table';
import { formatDate, type Lead } from './lead';
import { getLeads, type ApiLead } from '../lib/api';

// Score ainda não existe no modelo de dados — valor random inserido no render.
// Por agora é o mesmo para todas as linhas.
const RANDOM_SCORE = Math.floor(Math.random() * 101);

const toLead = (l: ApiLead): Lead => ({
  id: l.id,
  name: l.name,
  email: l.email,
  score: RANDOM_SCORE,
  budget: l.budget,
  local: l.town,
  added: formatDate(l.createdAt),
  tipologia: l.type.join(', ') || '—',
  credito: l.approved ? 'Sim' : 'Não',
  extras: l.notes || '—',
});

// Conteúdo do dashboard de Leads: cabeçalho (título + pesquisa + nova lead) e tabela.
const Dashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? leads.filter((l) => (l.name + ' ' + l.email + ' ' + l.local).toLowerCase().includes(q))
      : leads;
  }, [query, leads]);

  const highScore = leads.filter((l) => l.score >= 80).length;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight text-foreground">Leads</h1>
          <p className="mt-1 text-[13px] text-default-foreground">
            {leads.length} leads no total · {highScore} com score elevado
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar leads"
            containerClassName="w-56"
          />
          <Button className="bg-accent font-semibold text-white hover:brightness-95">+ Nova lead</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : error ? (
        <p className="py-16 text-center text-[14px] text-danger">{error}</p>
      ) : (
        <LeadTable leads={rows} total={leads.length} />
      )}
    </>
  );
};

export default Dashboard;
