import React, { useEffect } from 'react';
import { Button } from '@heroui/react';
import ScoreCircle from './score-circle';
import { euro, type Lead } from './lead';

const Field: React.FC<{ label: string; children: React.ReactNode; full?: boolean }> = ({ label, children, full }) => (
  <div className={full ? 'col-span-2' : ''}>
    <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-default-foreground">{label}</div>
    {children}
  </div>
);

interface LeadModalProps {
  lead: Lead | null;
  onClose: () => void;
}

// Modal de detalhe do lead. Fecha no ✕, no botão "Fechar", no backdrop ou com ESC.
const LeadModal: React.FC<LeadModalProps> = ({ lead, onClose }) => {
  useEffect(() => {
    if (!lead) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lead, onClose]);

  if (!lead) return null;
  const credit = lead.credito === 'Sim';

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-6">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-default bg-surface shadow-2xl"
      >
        <div className="flex items-start gap-4 border-b border-default p-6">
          <ScoreCircle score={lead.score} size={52} />
          <div className="min-w-0 flex-1">
            <h2 className="text-[20px] font-bold tracking-tight text-foreground">{lead.name}</h2>
            {lead.contact && <p className="mt-0.5 text-[13px] font-medium text-foreground">{lead.contact}</p>}
            <p className="mt-0.5 text-[13px] text-default-foreground">{lead.email}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-default text-default-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-[18px] p-6">
          <Field label="Orçamento">
            <div className="text-[15px] font-semibold text-foreground">{euro(lead.budget)}</div>
          </Field>
          <Field label="Local">
            <div className="text-[15px] font-semibold text-foreground">{lead.local}</div>
          </Field>
          <Field label="Tipologia">
            <div className="text-[15px] font-semibold text-foreground">{lead.tipologia}</div>
          </Field>
          <Field label="Crédito aprovado">
            <span
              className={[
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-semibold',
                credit ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger',
              ].join(' ')}
            >
              <span className={['h-1.5 w-1.5 rounded-full', credit ? 'bg-success' : 'bg-danger'].join(' ')} />
              {lead.credito}
            </span>
          </Field>
          <Field label="Extras" full>
            <div className="rounded-lg bg-default px-3.5 py-3 text-[14px] leading-relaxed text-foreground">{lead.extras}</div>
          </Field>
          <Field label="Adicionado" full>
            <div className="text-[14px] text-foreground">{lead.added}</div>
          </Field>
        </div>

        <div className="flex justify-end gap-2.5 border-t border-default p-4">
          <Button variant="outline" onPress={onClose} className="border border-default font-semibold">
            Fechar
          </Button>
          <Button className="bg-accent font-semibold text-white hover:brightness-95">Editar lead</Button>
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
