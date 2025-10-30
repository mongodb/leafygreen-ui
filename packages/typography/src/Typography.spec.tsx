import React from 'react';

import {
  Body,
  Description,
  Disclaimer,
  Error,
  H1,
  H2,
  H3,
  InlineCode,
  InlineKeyCode,
  Label,
  Link,
  Overline,
  StaticWidthText,
  Subtitle,
} from '.';

describe('packages/typography', () => {
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('types behave as expected', () => {
    <Body elementtiming="test">children</Body>;
    <Description elementtiming="test">children</Description>;
    <Disclaimer elementtiming="test">children</Disclaimer>;
    <Error elementtiming="test">children</Error>;
    <H1 elementtiming="test">children</H1>;
    <H2 elementtiming="test">children</H2>;
    <H3 elementtiming="test">children</H3>;
    <InlineCode elementtiming="test">children</InlineCode>;
    <InlineKeyCode elementtiming="test">children</InlineKeyCode>;
    <Label elementtiming="test" htmlFor="test">
      children
    </Label>;
    <Link elementtiming="test">children</Link>;
    <Overline elementtiming="test">children</Overline>;
    <Subtitle elementtiming="test">children</Subtitle>;
    <StaticWidthText elementtiming="test">children</StaticWidthText>;
  });

  test('must contain one test', () => {
    expect(true).toBe(true);
  });
});
