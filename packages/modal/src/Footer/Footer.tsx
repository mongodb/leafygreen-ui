import React from 'react';
import { cx } from '@leafygreen-ui/emotion';
import { footerStyle } from './styles';
import { FooterProps } from './types';

/**
 * @internal
 * Internal modal Footer component
 */
const Footer = ({ children, className }: FooterProps) => {
  return <div className={cx(footerStyle, className)}>{children}</div>;
};

Footer.displayName = 'Footer';

export default Footer;
