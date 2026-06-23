import React from 'react';
import { InputGroup } from '@heroui/react';

type InputTextareaProps = React.ComponentProps<typeof InputGroup.TextArea>;

// Textarea com o mesmo preenchimento dos inputs (bg-default). Presentational.
const InputTextarea: React.FC<InputTextareaProps> = (props) => (
  <InputGroup fullWidth>
    <InputGroup.TextArea {...props} />
  </InputGroup>
);

export default InputTextarea;
