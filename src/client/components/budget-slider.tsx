import React from 'react';
import { Slider } from '@heroui/react';

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  'aria-label': string;
}

// Slider de valor único com rótulos das extremidades. Presentational.
const BudgetSlider: React.FC<BudgetSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  'aria-label': ariaLabel,
}) => (
  <div>
    <Slider
      aria-label={ariaLabel}
      minValue={min}
      maxValue={max}
      step={step}
      value={value}
      onChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
    >
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
    <div className="mt-2 flex justify-between text-[11px] text-default-foreground">
      <span>{minLabel}</span>
      <span>{maxLabel}</span>
    </div>
  </div>
);

export default BudgetSlider;
