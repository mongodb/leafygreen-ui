import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { footerStyle } from './Footer.styles';
import { FooterProps } from './Footer.types';

/**
 * @internal
 * Internal modal Footer component
 */
const Footer = ({ children, className }: FooterProps) => {
  return <div className={cx(footerStyle, className)}>{children}</div>;
};

Footer.displayName = 'Footer';

export default Footer;
