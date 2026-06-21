import React, { useState } from 'react';
import { InputGroup } from '@heroui/react';
import './input-password.css';

type InputPasswordHint = { type: 'error' | 'success'; message: string };

type InputPasswordProps = Omit<React.ComponentProps<typeof InputGroup.Input>, 'type'> & {
  invalid?: boolean;
  hint?: InputPasswordHint;
};

const InputPassword: React.FC<InputPasswordProps> = ({ invalid, hint, ...inputProps }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <InputGroup
        fullWidth
        className={`input-password${invalid ? ' input-password--invalid' : ''}`}
      >
        <InputGroup.Input type={show ? 'text' : 'password'} {...inputProps} />
        <InputGroup.Suffix>
          <button type="button" className="input-password__toggle" onClick={() => setShow((s) => !s)}>
            {show ? 'Hide' : 'Show'}
          </button>
        </InputGroup.Suffix>
      </InputGroup>
      {hint && <p className={`input-password__hint input-password__hint--${hint.type}`}>{hint.message}</p>}
    </div>
  );
};

export default InputPassword;
