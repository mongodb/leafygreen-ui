import React from 'react';
import { css } from 'emotion';
import { Logo } from '@leafygreen-ui/logo';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { mq } from 'utils/mediaQuery';

const footerContainer = css`
  background-color: ${uiColors.gray.dark3};
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: ${spacing[5]}px;
  padding-top: 36px;

  ${mq({
    marginTop: ['1px', `${spacing[7]}px`],
  })}
`;

const linksContainer = css`
  display: flex;
  flex-direction: column;
  color: white;
  margin-top: 2px;

  ${mq({
    marginLeft: ['36px', '72px'],
    marginRight: ['36px', '72px'],
  })}
`;

const linkStyle = css`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: ${spacing[4]}px;
  text-decoration: none;
  color: ${uiColors.white};
`;

const trademarkStyle = css`
  margin-top: 72px;
  margin-bottom: 40px;
  font-size: 14px;
  padding-bottom: ${spacing[4]}px;
`;

function FooterLink({ href, children }: JSX.IntrinsicElements['a']) {
  const linkProps = {
    target: '_blank',
    rel: 'noopener noreferrer',
  } as const;

  return (
    <a href={href} className={linkStyle} {...linkProps}>
      {children}
    </a>
  );
}

function Footer() {
  return (
    <div role="contentinfo" className={footerContainer}>
      <a href="https://mongodb.com" target="_blank" rel="noopener noreferrer">
        <Logo darkMode knockout height={20} aria-hidden="true" />
      </a>
      <div className={linksContainer}>
        <FooterLink href="https://www.mongodb.com/blog/post/meet-our-product-design-team-part-1">
          About Design at MongoDB
        </FooterLink>
        <FooterLink href="https://www.mongodb.com/blog">Blog</FooterLink>
        <FooterLink href="https://www.mongodb.com/blog/channel/events">
          Events
        </FooterLink>
        <FooterLink href="https://www.mongodb.com/careers">Careers</FooterLink>
        <p className={trademarkStyle}>© 2020 MongoDB, Inc.</p>
      </div>
    </div>
  );
}

Footer.displayName = 'Footer';

export default Footer;
