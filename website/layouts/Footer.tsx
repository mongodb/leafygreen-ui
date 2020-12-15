import React from 'react';
import { css } from 'emotion';
import { Logo } from '@leafygreen-ui/logo';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

const footerContainer = css`
  background-color: ${uiColors.gray.dark3};
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: ${spacing[7]}px;
  padding-left: 52px;
  padding-top: 36px;
`;

const linksContainer = css`
  display: flex;
  flex-direction: column;
  margin-left: 72px;
  margin-right: 72px;
  color: white;
`;

const linkStyle = css`
  margin: 0;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 24px;
`;

const trademarkStyle = css`
  margin-top: 72px;
  margin-bottom: 40px;
  font-size: 14px;
`;

export default function Footer() {
  return (
    <div role="contentinfo" className={footerContainer}>
      <div>
        <Logo darkMode knockout height={20} />
      </div>
      <div className={linksContainer}>
        <p className={linkStyle}>About Design at MongoDB</p>
        <p className={linkStyle}>About LeafyGreen</p>
        <p className={linkStyle}>Blog</p>
        <p className={linkStyle}>Events</p>
        <p className={linkStyle}>Careers</p>
        <p className={trademarkStyle}>© 2020 MongoDB, Inc.</p>
      </div>
    </div>
  );
}
