import React from 'react';
import { css } from '@emotion/css';
import { MongoDBLogo } from '@leafygreen-ui/logo';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { mq } from 'utils/mediaQuery';

const footerContainer = css`
  border-top: 1px solid ${uiColors.gray.light2};
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: ${spacing[5]}px;
  padding-right: ${spacing[5]}px;
  padding-top: ${spacing[4]}px;

  ${mq({
    marginTop: ['0px', `${spacing[7]}px`],
  })}
`;

const linksContainer = css`
  display: flex;
  flex-direction: column;
  color: ${uiColors.gray.dark2};
  // Pixel-pushed for baseline alignment with logo
  margin-top: 5px;

  ${mq({
    marginLeft: [`${spacing[4]}px`, `${spacing[6]}px`],
    marginRight: [`${spacing[4]}px`, `${spacing[6]}px`],
  })}
`;

const linkStyle = css`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: ${uiColors.gray.dark2};

  & + & {
    margin-top: ${spacing[3]}px;
  }

  &:hover {
    color: ${uiColors.gray.dark3};
  }
`;

const trademarkStyle = css`
  margin-top: ${spacing[6]}px;
  margin-bottom: ${spacing[4]}px;
  font-size: 12px;
  color: ${uiColors.gray.dark1};
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
        <MongoDBLogo height={spacing[4]} aria-hidden="true" />
      </a>
      <div className={linksContainer}>
        <FooterLink href="https://www.mongodb.com/blog/post/meet-our-product-design-team-part-1">
          About design at MongoDB
        </FooterLink>
        <FooterLink href="https://www.mongodb.com/blog">Blog</FooterLink>
        <FooterLink href="https://www.mongodb.com/blog/channel/events">
          Events
        </FooterLink>
        <FooterLink href="https://github.com/mongodb/leafygreen-ui">
          GitHub
        </FooterLink>
        <FooterLink href="https://www.mongodb.com/careers">Careers</FooterLink>
        <p className={trademarkStyle}>© 2021 MongoDB, Inc.</p>
      </div>
    </div>
  );
}

Footer.displayName = 'Footer';

export default Footer;
