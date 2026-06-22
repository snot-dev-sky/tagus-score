import React from 'react';
import { InputGroup } from '@heroui/react';

type SearchInputProps = React.ComponentProps<typeof InputGroup.Input> & {
  containerClassName?: string;
};

// Campo de pesquisa com ícone à esquerda, construído sobre o InputGroup da HeroUI v3.
const SearchInput: React.FC<SearchInputProps> = ({ containerClassName, className, ...props }) => (
  <div className={['relative', containerClassName].filter(Boolean).join(' ')}>
    <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-default-foreground">⌕</span>
    <InputGroup fullWidth>
      <InputGroup.Input className={['pl-8', className].filter(Boolean).join(' ')} {...props} />
    </InputGroup>
  </div>
);

export default SearchInput;
