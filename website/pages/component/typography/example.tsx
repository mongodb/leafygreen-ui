import React from 'react';
import { css, cx } from 'emotion';
import { spacing } from '@leafygreen-ui/tokens';
import {
  H1,
  H2,
  H3,
  Subtitle,
  Body,
  InlineCode,
  InlineKeyCode,
  Disclaimer,
  Overline,
  Link,
  Label,
  Description,
} from '@leafygreen-ui/typography';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const displayBlock = css`
  display: block;
`;

const margin = css`
  margin: ${spacing[2]}px;
`;

const knobsConfig: KnobsConfigInterface<{
  weight: 'regular' | 'medium';
  arrowAppearance: 'hover' | 'persist' | 'none';
  href: string;
}> = {
  weight: {
    type: 'select',
    options: ['medium', 'regular'],
    default: 'regular',
    label: 'Weight',
  },
  href: {
    type: 'select',
    options: [
      typeof window !== 'undefined' ? window.location.origin : '',
      'https://cloud.mongodb.com',
    ],
    default: 'http://localhost:3000',
    label: 'href',
  },
  arrowAppearance: {
    type: 'select',
    options: ['hover', 'persist', 'none'],
    default: 'hover',
    label: 'Arrow Appearance',
  },
};

export default function TypographyLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ weight, href, arrowAppearance }) => {
        return (
          <div>
            <H1 className={margin}>Heading 1</H1>
            <H2 className={margin}>Heading 2</H2>
            <H3 className={margin}>Heading 3</H3>
            <Subtitle className={margin}>Subtitle</Subtitle>
            <Body weight={weight} className={cx(displayBlock, margin)}>
              Body
            </Body>
            <InlineCode className={margin}>Inline Code</InlineCode>
            <div className={cx(displayBlock, margin)}>
              <InlineKeyCode>CTRL</InlineKeyCode>
              <code>+</code>
              <InlineKeyCode>C</InlineKeyCode>
            </div>
            <Disclaimer className={cx(displayBlock, margin)}>
              Disclaimer
            </Disclaimer>
            <Overline className={margin}>Overline</Overline>
            <Link
              href={href}
              arrowAppearance={arrowAppearance}
              className={cx(displayBlock, margin)}
            >
              Link
            </Link>
            <Label className={margin} htmlFor="id">
              This is a label
            </Label>
            <Description className={margin}>
              This is the description for said label
            </Description>
          </div>
        );
      }}
    </LiveExample>
  );
}
