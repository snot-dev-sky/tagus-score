import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../lib/auth';

// Dropdown do perfil em hover (group-hover) com animação: caret roda 180º,
// painel faz fade + slide/scale.
const ProfileMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-default px-3 py-1.5"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[13px] font-bold text-white">
          JM
        </span>
        <span className="text-[13px] font-semibold text-foreground">João Maia</span>
        <span className="text-[10px] text-default-foreground transition-transform group-hover:rotate-180">▼</span>
      </button>
      <div className="invisible absolute right-0 top-[calc(100%+8px)] z-50 w-48 origin-top-right -translate-y-1 scale-95 rounded-xl border border-default bg-surface p-1.5 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-foreground hover:bg-default"
        >
          ⚙ Editar perfil
        </button>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-danger hover:bg-danger/10"
        >
          ⎋ Terminar sessão
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
