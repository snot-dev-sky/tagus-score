import React, { useEffect } from 'react';
import { Button, Spinner } from '@heroui/react';

interface ShareFormModalProps {
  isOpen: boolean;
  link: string;
  isGenerating: boolean;
  copied: boolean;
  error?: string;
  onCopy: () => void;
  onClose: () => void;
}

// Modal de partilha do link do formulário. Presentational — estado/lógica vêm via props.
// Fecha no ✕, no backdrop ou com ESC.
const ShareFormModal: React.FC<ShareFormModalProps> = ({
  isOpen,
  link,
  isGenerating,
  copied,
  error,
  onCopy,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-6">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] rounded-2xl border border-default bg-surface shadow-2xl"
      >
        <div className="flex items-start gap-3.5 p-6 pb-[18px]">
          <div className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-xl bg-accent/10 text-[19px] text-accent">
            ↗
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[18px] font-bold tracking-tight text-foreground">Partilhar formulário</h2>
            <p className="mt-1 text-[13px] text-default-foreground">
              Envie este link ao cliente para preencher os próprios dados.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 flex-none cursor-pointer items-center justify-center rounded-lg bg-default text-default-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pb-6">
          {error ? (
            <p className="text-[13px] text-danger">{error}</p>
          ) : (
            <div className="flex gap-2.5">
              <div className="flex h-12 min-w-0 flex-1 items-center rounded-xl border border-default bg-default px-3.5">
                {isGenerating ? (
                  <span className="text-[14px] text-default-foreground">A gerar link…</span>
                ) : (
                  <span className="truncate text-[14px] text-foreground">{link}</span>
                )}
              </div>
              <Button
                onPress={onCopy}
                isDisabled={isGenerating}
                className={[
                  'h-12 flex-none gap-2 px-[18px] font-semibold',
                  copied ? 'bg-success/10 text-success' : 'bg-accent text-white hover:brightness-95',
                ].join(' ')}
              >
                {isGenerating ? (
                  <Spinner size="sm" />
                ) : (
                  <span className="text-[15px] leading-none">{copied ? '✓' : '⧉'}</span>
                )}
                {copied ? 'Copiado' : 'Copiar'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareFormModal;
