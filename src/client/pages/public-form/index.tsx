import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '@heroui/react';
import MainLayout from '../../components/main-layout';
import MainContent from '../../components/main-content';
import LeadForm, { LeadFormValues } from '../../components/lead-form';
import { getForm, submitForm, ApiRequestError } from '../../lib/api';
import { ErrorCodes } from '../../constants/errorCodes';
import { CONCELHOS, DISTRICTS, TIPOLOGIAS, BUDGET_DEFAULT } from '../../constants/publicForm';

type Status = 'loading' | 'valid' | 'error' | 'submitted';

// Mensagem por errorCode na validação do link; o default cobre link inválido / não encontrado.
const linkErrorMessage = (code?: string): string => {
  switch (code) {
    case ErrorCodes.Form.EXPIRED:
      return 'Este link expirou. Pede um novo link ao agente.';
    case ErrorCodes.Form.ALREADY_USED:
      return 'Este formulário já foi preenchido.';
    default:
      return 'Este link não é válido.';
  }
};

// Mensagem por errorCode na submissão do formulário.
const submitErrorMessage = (code?: string): string => {
  switch (code) {
    case ErrorCodes.Form.MISSING_FIELDS:
      return 'Preenche o nome e o concelho.';
    case ErrorCodes.Form.INVALID_EMAIL:
      return 'Formato de email inválido.';
    case ErrorCodes.Form.INVALID_CONTACT:
      return 'O contacto deve ter exatamente 9 dígitos.';
    case ErrorCodes.Form.INVALID_BUDGET:
      return 'Orçamento inválido.';
    case ErrorCodes.Form.INVALID_DISTRICT:
      return 'Distrito inválido.';
    case ErrorCodes.Form.INVALID_TYPE:
      return 'Seleciona pelo menos uma tipologia.';
    case ErrorCodes.Form.EXPIRED:
      return 'Este link expirou. Pede um novo link ao agente.';
    case ErrorCodes.Form.ALREADY_USED:
      return 'Este formulário já foi preenchido.';
    case ErrorCodes.Form.RATE_LIMITED:
      return 'Demasiadas tentativas. Tenta novamente mais tarde.';
    default:
      return 'Não foi possível submeter o formulário. Tenta novamente.';
  }
};

type FieldErrors = Partial<Record<keyof LeadFormValues, boolean>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validação client-side (espelha as regras do backend) — devolve os campos inválidos.
const validate = (v: LeadFormValues): FieldErrors => {
  const errors: FieldErrors = {};
  if (!v.name.trim()) errors.name = true;
  if (!EMAIL_RE.test(v.email.trim())) errors.email = true;
  if (!/^\d{9}$/.test(v.contact)) errors.contact = true;
  if (!v.district) errors.district = true;
  if (!v.town) errors.town = true;
  if (v.type.length === 0) errors.type = true;
  return errors;
};

// Campo a assinalar quando o backend devolve um erro de validação específico.
const fieldForCode = (code?: string): keyof LeadFormValues | undefined => {
  switch (code) {
    case ErrorCodes.Form.INVALID_EMAIL:
      return 'email';
    case ErrorCodes.Form.INVALID_CONTACT:
      return 'contact';
    case ErrorCodes.Form.INVALID_BUDGET:
      return 'budget';
    case ErrorCodes.Form.INVALID_DISTRICT:
      return 'district';
    case ErrorCodes.Form.INVALID_TYPE:
      return 'type';
    default:
      return undefined;
  }
};

const initialValues: LeadFormValues = {
  name: '',
  email: '',
  contact: '',
  budget: BUDGET_DEFAULT,
  approved: false,
  district: '',
  town: '',
  type: [],
  notes: '',
};

// Rota pública /form/:formId — valida o link e, se válido, renderiza o formulário de lead.
// Toda a lógica (estado, concelhos dependentes, submissão) vive aqui; os /components só consomem props.
const PublicForm: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();

  const [status, setStatus] = useState<Status>('loading');
  const [linkError, setLinkError] = useState('');
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await getForm(formId ?? '');
        if (active) setStatus('valid');
      } catch (err) {
        if (!active) return;
        setLinkError(linkErrorMessage(err instanceof ApiRequestError ? err.errorCode : undefined));
        setStatus('error');
      }
    })();
    return () => {
      active = false;
    };
  }, [formId]);

  // Concelhos do distrito escolhido (dependente).
  const concelhos = useMemo(
    () => (values.district ? CONCELHOS[values.district] ?? [] : []),
    [values.district],
  );

  // Ao mudar de distrito, limpar o concelho.
  // No contacto, manter apenas dígitos (máx. 9) — a validação final fica no backend.
  // Ao editar um campo, limpa-se o respetivo estado de erro.
  const handleChange = <K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) => {
    setValues((prev) => {
      if (key === 'district') return { ...prev, district: value as string, town: '' };
      if (key === 'contact') return { ...prev, contact: (value as string).replace(/\D/g, '').slice(0, 9) };
      return { ...prev, [key]: value };
    });
    setFieldErrors((prev) => {
      if (!prev[key] && !(key === 'district' && prev.town)) return prev;
      const next = { ...prev };
      delete next[key];
      if (key === 'district') delete next.town;
      return next;
    });
    setSubmitError('');
  };

  // Botão ativo só quando todos os campos obrigatórios estão preenchidos.
  const canSubmit =
    Boolean(values.name.trim()) &&
    Boolean(values.email.trim()) &&
    Boolean(values.contact.trim()) &&
    Boolean(values.district) &&
    Boolean(values.town) &&
    values.type.length > 0 &&
    values.budget > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    const errors = validate(values);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setSubmitError('Campos inválidos.');
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);
    try {
      await submitForm(formId ?? '', {
        name: values.name.trim(),
        email: values.email.trim(),
        contact: values.contact.replace(/\D/g, ''),
        budget: values.budget,
        approved: values.approved,
        district: values.district,
        town: values.town,
        type: values.type,
        notes: values.notes.trim(),
      });
      setValues(initialValues);
      setStatus('submitted');
    } catch (err) {
      if (err instanceof ApiRequestError) {
        // Assinala o campo correspondente ao erro devolvido pelo backend.
        if (err.errorCode === ErrorCodes.Form.MISSING_FIELDS) {
          setFieldErrors((prev) => ({ ...prev, name: !values.name.trim(), town: !values.town }));
        } else {
          const field = fieldForCode(err.errorCode);
          if (field) setFieldErrors((prev) => ({ ...prev, [field]: true }));
        }
        setSubmitError(submitErrorMessage(err.errorCode));
      } else {
        setSubmitError('Não foi possível ligar ao servidor. Tenta novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout isPublic>
      <MainContent>
        {status === 'loading' && (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        )}

        {status === 'error' && (
          <p className="py-16 text-center text-[14px] text-default-foreground">{linkError}</p>
        )}

        {status === 'submitted' && (
          <div className="mx-auto w-full max-w-[760px] py-16 text-center">
            <h1 className="text-[24px] font-bold tracking-tight text-foreground">Obrigado!</h1>
            <p className="mt-1 text-[14px] text-default-foreground">Entraremos em contacto.</p>
          </div>
        )}

        {status === 'valid' && (
          <div className="mx-auto w-full max-w-[760px]">
            <div className="mb-[22px]">
              <h1 className="text-[24px] font-bold tracking-tight text-foreground">Bem-vindo</h1>
              <p className="mt-1 text-[14px] text-default-foreground">
                Preencha os seus dados, para o podermos ajudar melhor
              </p>
            </div>

            <LeadForm
              values={values}
              errors={fieldErrors}
              onChange={handleChange}
              districts={DISTRICTS}
              concelhos={concelhos}
              tipologias={TIPOLOGIAS}
              isSubmitting={isSubmitting}
              canSubmit={canSubmit}
              error={submitError}
              onSubmit={handleSubmit}
              onCancel={() => navigate(-1)}
            />
          </div>
        )}
      </MainContent>
    </MainLayout>
  );
};

export default PublicForm;
