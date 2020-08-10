import React from 'react';
import { css } from '@leafygreen-ui/emotion';
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

  & > * {
    margin: 0 2px;

    &:first-child {
      margin: 0 0 0 2px;
    }

    &:last-child {
      margin: 0 2px 0 0;
    }
  }
`;

interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

const Footer = ({ children, className }: FooterProps) => {
  return <div className={`${footerStyle} ${className}`}>{children}</div>;
};

Footer.displayName = 'Footer';

export default Footer;
