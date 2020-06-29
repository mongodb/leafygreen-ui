import React, { createContext, useContext } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { Variant, SyntaxProps } from './types';

const VariantContext = createContext<Variant>(Variant.Light);

export function useVariant() {
  return useContext(VariantContext);
}

interface CodeWrapperProps
  extends Omit<SyntaxProps, 'showLineNumbers' | 'children'> {
  children: React.ReactNode;
}

export default function CodeWrapper({
  children,
  className,
  language,
  variant = Variant.Light,
  ...rest
}: CodeWrapperProps) {
  const codeClassName = cx(
    `lg-highlight-hljs-${variant}`,
    css`
      color: inherit;
      font-size: 13px;
      line-height: 24px;
    `,
    language,
    className,
  );

  return (
    <VariantContext.Provider value={variant}>
      <code {...rest} className={codeClassName}>
        {children}
      </code>
    </VariantContext.Provider>
  );
}
