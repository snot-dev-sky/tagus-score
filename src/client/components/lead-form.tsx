import React from 'react';
import { Button, Spinner } from '@heroui/react';
import Field from './field';
import InputText from './input-text';
import InputTextarea from './input-textarea';
import SelectField from './select-field';
import BudgetSlider from './budget-slider';
import CreditCheckbox from './credit-checkbox';
import { BUDGET_MIN, BUDGET_MAX, BUDGET_STEP, formatEuro } from '../constants/publicForm';

// Valores do formulário de lead — espelha o payload de POST /api/forms/:formId/submit.
export interface LeadFormValues {
  name: string;
  email: string;
  contact: string;
  budget: number;
  approved: boolean;
  district: string;
  town: string;
  type: string[];
  notes: string;
}

interface LeadFormProps {
  values: LeadFormValues;
  // Campos assinalados com erro após a validação (border vermelho).
  errors: Partial<Record<keyof LeadFormValues, boolean>>;
  onChange: <K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) => void;
  districts: string[];
  concelhos: string[];
  tipologias: string[];
  isSubmitting: boolean;
  canSubmit: boolean;
  error?: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

// Formulário de lead (presentational): consome valores + handlers do componente pai.
const LeadForm: React.FC<LeadFormProps> = ({
  values,
  errors,
  onChange,
  districts,
  concelhos,
  tipologias,
  isSubmitting,
  canSubmit,
  error,
  onSubmit,
  onCancel,
}) => (
  <form
    onSubmit={onSubmit}
    className="rounded-[18px] border border-default bg-surface p-9 px-10 shadow-sm"
  >
    <div className="flex flex-col gap-[30px]">
      <Field label="Nome">
        <InputText
          type="text"
          placeholder="Nome completo"
          value={values.name}
          onChange={(e) => onChange('name', e.target.value)}
          disabled={isSubmitting}
          invalid={errors.name}
        />
      </Field>

      <div className="grid grid-cols-2 gap-7">
        <Field label="Email">
          <InputText
            type="email"
            placeholder="nome@email.com"
            value={values.email}
            onChange={(e) => onChange('email', e.target.value)}
            disabled={isSubmitting}
            invalid={errors.email}
          />
        </Field>
        <Field label="Contacto">
          <InputText
            type="tel"
            placeholder="contacto telefónico"
            value={values.contact}
            onChange={(e) => onChange('contact', e.target.value)}
            disabled={isSubmitting}
            invalid={errors.contact}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 items-start gap-7">
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <label className="text-[13px] font-semibold text-foreground">Orçamento</label>
            <span className="text-[15px] font-bold text-accent">{formatEuro(values.budget)}</span>
          </div>
          <BudgetSlider
            aria-label="Orçamento"
            value={values.budget}
            onChange={(v) => onChange('budget', v)}
            min={BUDGET_MIN}
            max={BUDGET_MAX}
            step={BUDGET_STEP}
            minLabel={formatEuro(BUDGET_MIN)}
            maxLabel={formatEuro(BUDGET_MAX)}
          />
        </div>
        <Field label="Crédito aprovado">
          <CreditCheckbox
            value={values.approved}
            onChange={(v) => onChange('approved', v)}
            labelOn="Aprovado"
            labelOff="Não aprovado"
            isDisabled={isSubmitting}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-7">
        <Field label="Distrito">
          <SelectField
            aria-label="Distrito"
            placeholder="Selecionar distrito"
            options={districts}
            value={values.district}
            onChange={(v) => onChange('district', v)}
            isDisabled={isSubmitting}
            isInvalid={errors.district}
          />
        </Field>
        <Field label="Concelho">
          <SelectField
            aria-label="Concelho"
            placeholder={values.district ? 'Selecionar concelho' : 'Escolha o distrito primeiro'}
            options={concelhos}
            value={values.town}
            onChange={(v) => onChange('town', v)}
            isDisabled={isSubmitting || !values.district}
            isInvalid={errors.town}
          />
        </Field>
      </div>

      <Field label="Tipologia">
        <SelectField
          multiple
          aria-label="Tipologia"
          placeholder="Selecionar tipologias"
          options={tipologias}
          value={values.type}
          onChange={(v) => onChange('type', v)}
          isDisabled={isSubmitting}
          isInvalid={errors.type}
        />
      </Field>

      <Field label="Extras">
        <InputTextarea
          placeholder="Piscina, perto de escola, garagem…"
          rows={3}
          value={values.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          disabled={isSubmitting}
        />
      </Field>

      {error && <p className="text-[13px] text-danger">{error}</p>}

      <div className="flex justify-end gap-2.5 pt-2">
        <Button
          type="button"
          variant="outline"
          className="border border-default font-semibold"
          onPress={onCancel}
          isDisabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="px-6 font-semibold"
          isDisabled={!canSubmit || isSubmitting}
        >
          {isSubmitting ? <Spinner size="sm" /> : 'Submeter'}
        </Button>
      </div>
    </div>
  </form>
);

export default LeadForm;
