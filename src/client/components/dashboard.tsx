import React from 'react';
import { Button, Spinner } from '@heroui/react';
import SearchInput from './search-input';
import LeadTable from './lead-table';
import LeadModal from './lead-modal';
import type { Lead } from './lead';

interface DashboardProps {
  rows: Lead[];
  total: number;
  highScore: number;
  query: string;
  onQueryChange: (value: string) => void;
  isLoading: boolean;
  error: string;
  selected: Lead | null;
  onSelectLead: (lead: Lead) => void;
  onCloseModal: () => void;
}

// Vista do dashboard de Leads: cabeçalho (título + pesquisa + nova lead), tabela e modal.
// Componente apresentacional — todos os dados e callbacks vêm via props.
const Dashboard: React.FC<DashboardProps> = ({
  rows,
  total,
  highScore,
  query,
  onQueryChange,
  isLoading,
  error,
  selected,
  onSelectLead,
  onCloseModal,
}) => (
  <>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight text-foreground">Leads</h1>
        <p className="mt-1 text-[13px] text-default-foreground">
          {total} leads no total · {highScore} com score elevado
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <SearchInput
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
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
      <LeadTable leads={rows} total={total} onSelectLead={onSelectLead} />
    )}

    <LeadModal lead={selected} onClose={onCloseModal} />
  </>
);

export default Dashboard;
