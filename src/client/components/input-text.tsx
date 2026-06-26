import React from 'react';
import { InputGroup } from '@heroui/react';
import './input-text.css';

type InputTextProps = React.ComponentProps<typeof InputGroup.Input> & { invalid?: boolean };


const InputText: React.FC<InputTextProps> = ({ invalid, ...props }) => (
  <InputGroup fullWidth className="input-text" isInvalid={invalid}>
    <InputGroup.Input {...props} />
  </InputGroup>
);

export default InputText;
