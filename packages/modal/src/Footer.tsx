import React from 'react';
import { cx } from '@leafygreen-ui/emotion';
import { footerStyle } from './Footer.styles';

interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * @internal
 * Internal modal Footer component
 */
const Footer = ({ children, className }: FooterProps) => {
  return <div className={cx(footerStyle, className)}>{children}</div>;
};

Footer.displayName = 'Footer';

export default Footer;
