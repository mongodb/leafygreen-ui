import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { Variant, SyntaxProps } from './types';
import { numberCellDataProp } from './renderingPlugin';
import { uiColors } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';

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
  const numberColor =
    uiColors.gray[variant === Variant.Dark ? 'dark1' : 'light1'];

  const codeStyles = css`
    color: inherit;
    font-size: 13px;
    font-family: ${fontFamilies.code};
    line-height: 24px;

    & ${numberCellDataProp.selector} {
      color: ${numberColor};
    }
  `;

  const codeClassName = cx(
    `lg-highlight-hljs-${variant}`,
    codeStyles,
    language,
    className,
  );

  return (
    <code {...rest} className={codeClassName}>
      {children}
    </code>
  );
}
