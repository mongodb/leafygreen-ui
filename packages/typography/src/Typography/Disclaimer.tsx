import React from 'react';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { baseTypographyStyles } from '../styles';
import { CommonTypographyProps } from '../types';

/**
 * Disclaimer
 */
const disclaimer = css`
  display: block;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0px;
`;

type DisclaimerProps = HTMLElementProps<'small'> & CommonTypographyProps;

export function Disclaimer({ children, className, ...rest }: DisclaimerProps) {
  return (
    <small
      {...rest}
      className={cx(baseTypographyStyles, disclaimer, className)}
    >
      {children}
    </small>
  );
}

Disclaimer.displayName = 'Disclaimer';
