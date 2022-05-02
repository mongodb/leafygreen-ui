import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { codeTypeScale2, typeScale1 } from './styles';
import { InlineCodeProps } from './InlineCode';

/**
 * Inline Key Code
 */
const inlineKeyCode = css`
  font-family: ${fontFamilies.code};
  color: ${palette.gray.dark3};
  border: 1px solid ${palette.gray.dark3};
  border-radius: 3px;
  padding-left: 4px;
  padding-right: 4px;
`;

function InlineKeyCode({ children, className, ...rest }: InlineCodeProps) {
  const size = useBaseFontSize();
  const body = size === 16 ? codeTypeScale2 : typeScale1;

  return (
    <code className={cx(inlineKeyCode, body, className)} {...rest}>
      {children}
    </code>
  );
}

InlineKeyCode.displayName = 'InlineKeyCode';

export default InlineKeyCode;
