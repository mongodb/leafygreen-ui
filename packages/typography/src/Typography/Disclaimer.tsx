import React from 'react';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';

const sharedStyles = css`
  margin: unset;
  font-family: ${fontFamilies.default};
  color: ${palette.black};
`;

/**
 * Disclaimer
 */
const disclaimer = css`
  display: block;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0px;
`;

type DisclaimerProps = HTMLElementProps<'small'>;

export function Disclaimer({ children, className, ...rest }: DisclaimerProps) {
  return (
    <small {...rest} className={cx(sharedStyles, disclaimer, className)}>
      {children}
    </small>
  );
}

Disclaimer.displayName = 'Disclaimer';
