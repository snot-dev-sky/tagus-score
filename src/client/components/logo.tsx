import React from 'react';
import './logo.css';

interface TagusMarkProps {
  size?: number;
}

const TagusMark: React.FC<TagusMarkProps> = ({ size = 19 }) => (
  <svg
    className="logo__mark"
    width={size}
    height={size}
    style={{ width: size, height: size }}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M21.2 5.1 a4 4 0 0 1 5.6 0 L42.9 21.2 a4 4 0 0 1 0 5.6 L26.8 42.9 a4 4 0 0 1 -5.6 0 L5.1 26.8 a4 4 0 0 1 0 -5.6 Z"
      fill="var(--accent)"
    />
    <rect x="16" y="26" width="3.4" height="6" rx="1.4" fill="#fff" />
    <rect x="22.3" y="22" width="3.4" height="10" rx="1.4" fill="#fff" />
    <rect x="28.6" y="17" width="3.4" height="15" rx="1.4" fill="#fff" />
  </svg>
);

type LogoVariant = 'horizontal' | 'stacked';

interface LogoProps {
  variant?: LogoVariant;
}

const Logo: React.FC<LogoProps> = ({ variant = 'horizontal' }) => {
  if (variant === 'stacked') {
    return (
      <div className="logo logo--stacked">
        <TagusMark size={52} />
        <span className="logo__text">Tagus Score</span>
      </div>
    );
  }

  return (
    <div className="logo">
      <TagusMark />
      <span className="logo__text">Tagus Score</span>
    </div>
  );
};

export default Logo;
