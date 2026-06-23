import React from 'react';

interface CreditCheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  labelOn: string;
  labelOff: string;
  isDisabled?: boolean;
}

// Caixa clicável (48px) com visto a negrito. Ativo → tingido de accent. Presentational.
const CreditCheckbox: React.FC<CreditCheckboxProps> = ({
  value,
  onChange,
  labelOn,
  labelOff,
  isDisabled = false,
}) => (
  <button
    type="button"
    aria-pressed={value}
    disabled={isDisabled}
    onClick={() => onChange(!value)}
    className={[
      'flex h-12 w-full items-center gap-3 rounded-xl border-2 px-4 transition-colors disabled:opacity-50',
      value ? 'border-accent bg-accent/[0.07]' : 'border-transparent bg-default',
    ].join(' ')}
  >
    <span
      className={[
        'flex h-[22px] w-[22px] flex-none items-center justify-center rounded-md border-2 text-[14px] font-extrabold text-white',
        value ? 'border-accent bg-accent' : 'border-default-foreground bg-transparent',
      ].join(' ')}
    >
      {value ? '✔' : ''}
    </span>
    <span
      className={['text-[14px] font-semibold', value ? 'text-foreground' : 'text-default-foreground'].join(' ')}
    >
      {value ? labelOn : labelOff}
    </span>
  </button>
);

export default CreditCheckbox;
