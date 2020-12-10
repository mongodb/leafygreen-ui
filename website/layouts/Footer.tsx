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
  text-decoration: none;
  color: ${uiColors.white}
`;

const trademarkStyle = css`
  margin-top: 72px;
  font-size: 14px;
`;

function FooterLink({ href, children }: JSX.IntrinsicElements['a']) {
  const linkProps = {
    target: "_blank",
    rel: "noopener noreferrer"
  } as const


  return (<a href={href} className={linkStyle} {...linkProps}>{children}</a>)
}

export default function Footer() {


  return (
    <div role="contentinfo" className={footerContainer}>
      <div>
        <Logo darkMode knockout height={20} />
      </div>
      <div className={linksContainer}>
        <FooterLink href="https://www.mongodb.com/blog/post/meet-our-product-design-team-part-1">About Design at MongoDB</FooterLink>
        <FooterLink href="https://www.mongodb.com/blog">Blog</FooterLink>
        <FooterLink href="https://www.mongodb.com/blog/channel/events">Events</FooterLink>
        <FooterLink href="https://www.mongodb.com/careers">Careers</FooterLink>
        <p className={trademarkStyle}>© 2020 MongoDB, Inc.</p>
      </div>
    </div>
  );
}
