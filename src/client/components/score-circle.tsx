import React from 'react';

// Banda de score → classes (tint de fundo + anel + texto sólido).
const scoreClasses = (s: number) =>
  s >= 80
    ? 'bg-success/10 text-success ring-success/25'
    : s >= 60
      ? 'bg-warning/10 text-warning ring-warning/25'
      : s >= 40
        ? 'bg-orange-500/10 text-orange-600 ring-orange-500/25'
        : 'bg-danger/10 text-danger ring-danger/25';

interface ScoreCircleProps {
  score: number;
  size?: number;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ score, size = 40 }) => (
  <span
    className={['inline-flex items-center justify-center rounded-full font-bold ring-2', scoreClasses(score)].join(' ')}
    style={{ width: size, height: size, fontSize: size > 44 ? 18 : 14 }}
  >
    {score}
  </span>
);

export default ScoreCircle;
