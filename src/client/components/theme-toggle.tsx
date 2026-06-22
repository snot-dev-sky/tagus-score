import React, { useState } from 'react';

// Toggle Light/Dark — alterna a classe `dark` + `data-theme` no <html>,
// que é o que os tokens OKLCH da HeroUI v3 usam para resolver o tema.
const ThemeToggle: React.FC = () => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  const apply = (next: boolean) => {
    const el = document.documentElement;
    el.classList.toggle('dark', next);
    if (next) {
      el.setAttribute('data-theme', 'dark');
    } else {
      el.removeAttribute('data-theme');
    }
    setDark(next);
  };

  const option = 'rounded-full px-3 py-1 transition-colors';
  const active = 'bg-surface text-foreground shadow-sm';
  const inactive = 'text-default-foreground';

  return (
    <div className="flex items-center rounded-full border border-default bg-default/40 p-0.5 text-[13px] font-medium">
      <button type="button" onClick={() => apply(false)} className={[option, dark ? inactive : active].join(' ')}>
        Light
      </button>
      <button type="button" onClick={() => apply(true)} className={[option, dark ? active : inactive].join(' ')}>
        Dark
      </button>
    </div>
  );
};

export default ThemeToggle;
