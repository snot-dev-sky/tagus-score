import React from 'react';
import { InputGroup } from '@heroui/react';
import './input-text.css';

type InputTextProps = React.ComponentProps<typeof InputGroup.Input>;

const InputText: React.FC<InputTextProps> = (props) => (
  <InputGroup fullWidth className="input-text">
    <InputGroup.Input {...props} />
  </InputGroup>
);

export default InputText;
