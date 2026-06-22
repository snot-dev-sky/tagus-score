import React, { useState } from 'react';
import { Button } from '@heroui/react';
import ScoreCircle from './score-circle';
import LeadModal from './lead-modal';
import { euro, type Lead } from './lead';

const COLS = 'grid grid-cols-[0.7fr_1.6fr_2fr_1.1fr_1.1fr_0.9fr] items-center gap-4';
const PAGE_SIZE = 10;

interface LeadTableProps {
  leads: Lead[];
  total: number;
}

// Tabela de leads (cartão): cabeçalho, linhas clicáveis com realce accent no hover,
// rodapé com contagem + paginação. Ao clicar numa linha abre a modal de detalhe.
const LeadTable: React.FC<LeadTableProps> = ({ leads, total }) => {
  const [selected, setSelected] = useState<Lead | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-default bg-surface shadow-sm">
        <div className={[COLS, 'border-b border-default bg-default/40 px-6 py-3.5'].join(' ')}>
          {['Score', 'Nome', 'Email', 'Orçamento', 'Local'].map((h) => (
            <span key={h} className="text-[11px] font-semibold uppercase tracking-wider text-default-foreground">
              {h}
            </span>
          ))}
          <span className="text-right text-[11px] font-semibold uppercase tracking-wider text-default-foreground">
            Adicionado
          </span>
        </div>

        {leads.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setSelected(l)}
            className={[
              COLS,
              'w-full cursor-pointer border-b border-default px-6 py-3.5 text-left shadow-[inset_3px_0_0_transparent] transition-all hover:bg-accent/[0.07] hover:shadow-[inset_3px_0_0_var(--accent)]',
            ].join(' ')}
          >
            <ScoreCircle score={l.score} />
            <span className="truncate text-[14px] font-semibold text-foreground">{l.name}</span>
            <span className="truncate text-[13px] text-default-foreground">{l.email}</span>
            <span className="text-[14px] font-semibold text-foreground">{euro(l.budget)}</span>
            <span className="truncate text-[13px] text-foreground">{l.local}</span>
            <span className="text-right text-[13px] text-default-foreground">{l.added}</span>
          </button>
        ))}

        <div className="flex items-center justify-between px-6 py-3.5">
          <span className="text-[12px] text-default-foreground">
            A mostrar {leads.length} de {total} leads
          </span>
          {total > PAGE_SIZE && (
            <div className="flex gap-1.5">
              <Button variant="outline" size="sm" className="border border-default">
                Anterior
              </Button>
              <Button size="sm" className="bg-accent text-white">
                1
              </Button>
              <Button variant="outline" size="sm" className="border border-default">
                Seguinte
              </Button>
            </div>
          )}
        </div>
      </div>

      <LeadModal lead={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default LeadTable;
