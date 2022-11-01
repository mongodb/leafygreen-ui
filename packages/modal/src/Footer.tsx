import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { footerStyle } from './Footer.styles';

interface FooterProps {
  children: React.ReactNode;
  className?: string;
  darkMode?: boolean;
}

/**
 * @internal
 * Internal modal Footer component
 */
const Footer = ({ children, className, darkMode }: FooterProps) => {
  return (
    <div
      className={cx(
        footerStyle,
        {
          [css`
            padding: 16px 24px;
            border-top: 1px solid ${uiColors.gray.dark2};
          `]: darkMode,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

Footer.displayName = 'Footer';

export default Footer;
