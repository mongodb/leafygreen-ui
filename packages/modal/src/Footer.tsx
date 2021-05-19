import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const footerStyle = css`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: right;
  flex-direction: row-reverse;
  padding: 16px 24px;
  border-top: 1px solid ${uiColors.gray.light2};
`;

interface FooterProps {
  children: React.ReactNode;
  className?: string;
  darkMode?: boolean;
}

const Footer = ({ children, className, darkMode }: FooterProps) => {
  return (
    <div
      className={cx(
        footerStyle,
        css`
          border-top: 1px solid
            ${!darkMode ? uiColors.gray.light2 : uiColors.gray.dark2};
        `,
        className,
      )}
    >
      {children}
    </div>
  );
};

Footer.displayName = 'Footer';

export default Footer;
