import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { DarkModeProps } from '@leafygreen-ui/lib';

const footerStyle = css`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: right;
  flex-direction: row-reverse;
  padding: 24px 35px 35px;
`;

interface FooterProps extends DarkModeProps {
  children: React.ReactNode;
  className?: string;
}

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
