import React from 'react';

// Campo de formulário: label (13px/600) acima do controlo. Presentational.
const Field: React.FC<{ label: string; className?: string; children: React.ReactNode }> = ({
  label,
  className,
  children,
}) => (
  <div className={className}>
    <label className="mb-2 block text-[13px] font-semibold text-foreground">{label}</label>
    {children}
  </div>
);

export default Field;
