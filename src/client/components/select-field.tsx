import React from 'react';
import { Select, ListBox } from '@heroui/react';

interface BaseProps {
  options: string[];
  placeholder: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  'aria-label': string;
}

type SingleProps = BaseProps & {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
};

type MultiProps = BaseProps & {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
};

type SelectFieldProps = SingleProps | MultiProps;

const Options: React.FC<{ options: string[] }> = ({ options }) => (
  <Select.Popover>
    <ListBox>
      {options.map((option) => (
        <ListBox.Item key={option} id={option} textValue={option}>
          {option}
          {/* Visto que aparece nas opções selecionadas com a dropdown aberta. */}
          <ListBox.Item.Indicator />
        </ListBox.Item>
      ))}
    </ListBox>
  </Select.Popover>
);

const Trigger: React.FC<{ value?: React.ReactNode; isInvalid?: boolean }> = ({ value, isInvalid }) => (
  // Outline vermelho no estado de erro, a condizer com o dos inputs.
  <Select.Trigger
    className="h-[50px] w-full"
    style={isInvalid ? { outline: '1px solid var(--danger)' } : undefined}
  >
    {value ?? <Select.Value />}
    <Select.Indicator />
  </Select.Trigger>
);

// Wrapper presentational sobre o Select v3 (single ou multi-seleção).
const SelectField: React.FC<SelectFieldProps> = (props) => {
  if (props.multiple) {
    const { options, placeholder, isDisabled, isInvalid, value, onChange } = props;
    return (
      <Select
        fullWidth
        selectionMode="multiple"
        aria-label={props['aria-label']}
        placeholder={placeholder}
        isDisabled={isDisabled}
        value={value}
        onChange={(keys) => onChange(keys as string[])}
      >
        {/* Junta as seleções com ',' em vez do "and" do formatador por defeito. */}
        <Trigger
          isInvalid={isInvalid}
          value={
            <Select.Value>
              {({ isPlaceholder }) => (isPlaceholder ? placeholder : value.join(', '))}
            </Select.Value>
          }
        />
        <Options options={options} />
      </Select>
    );
  }

  const { options, placeholder, isDisabled, isInvalid, value, onChange } = props;
  return (
    <Select
      fullWidth
      aria-label={props['aria-label']}
      placeholder={placeholder}
      isDisabled={isDisabled}
      value={value || null}
      onChange={(key) => onChange((key as string) ?? '')}
    >
      <Trigger isInvalid={isInvalid} />
      <Options options={options} />
    </Select>
  );
};

export default SelectField;
