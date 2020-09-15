import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { Mode, SyntaxProps } from './types';
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
  darkMode = false,
  ...rest
}: CodeWrapperProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const numberColor = uiColors.gray[mode === Mode.Dark ? 'dark1' : 'light1'];

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
    `lg-highlight-hljs-${mode}`,
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
