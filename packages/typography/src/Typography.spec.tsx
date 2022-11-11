import React from 'react';
import { render } from '@testing-library/react';
import { parseTSDoc } from '../../../scripts/utils/tsDocParser';
import {
  H1,
  H2,
  H3,
  Subtitle,
  Body,
  Description,
  Label,
  Disclaimer,
  InlineCode,
  InlineKeyCode,
  Overline,
} from '.';

const typographyComponents: Array<{
  Component: React.ComponentType<any>;
  extendsBox: boolean;
}> = [
  { Component: H1, extendsBox: true },
  { Component: H2, extendsBox: true },
  { Component: H3, extendsBox: true },
  { Component: Subtitle, extendsBox: true },
  { Component: Body, extendsBox: true },
  { Component: Description, extendsBox: false },
  { Component: Label, extendsBox: false },
  { Component: Disclaimer, extendsBox: false },
  { Component: InlineCode, extendsBox: false },
  { Component: InlineKeyCode, extendsBox: false },
  { Component: Overline, extendsBox: false },
];

describe.each(typographyComponents)(
  'packages/typography',
  ({ Component, extendsBox }) => {
    const { displayName = '' } = Component;
    describe(`${displayName}`, () => {
      test('renders', () => {
        const { container } = render(<Component />);
        expect(container.firstElementChild).toBeInTheDocument();
      });

      test('renders props', () => {
        const { getByTestId } = render(<Component data-testid="component" />);
        expect(getByTestId('component')).toBeInTheDocument();
      });

      describe('Extends `Box`', () => {
        if (extendsBox) {
          test('renders with HTMLElement `as` prop', () => {
            const { getByTestId } = render(
              <Component data-testid="component" as={'span'} />,
            );
            expect(getByTestId('component')).toBeInTheDocument();
            expect(getByTestId('component').tagName.toLowerCase()).toBe('span');
          });

          // eslint-disable-next-line jest/no-disabled-tests
          test.skip('renders with `href`', () => {
            const { getByTestId } = render(
              <Component
                data-testid="component"
                href="http://mongodb.design"
              />,
            );
            expect(getByTestId('component')).toBeInTheDocument();
            expect(getByTestId('component').tagName.toLowerCase()).toBe('a');
            expect(getByTestId('component')).toHaveAttribute(
              'href',
              'http://mongodb.design',
            );
          });
        }
      });
    });
  },
);

describe('TSDoc', () => {
  const docs = parseTSDoc(`Typography`);
  test('Generates TSDoc', () => {
    expect(docs).not.toBeUndefined();
  });

  describe.each(typographyComponents)(
    'Generates TSDoc for',
    ({ Component: { displayName } }) => {
      test(`${displayName}`, () => {
        expect(docs?.find(doc => doc.displayName === displayName)).toBeTruthy();
      });
    },
  );
});

/* eslint-disable jest/expect-expect, jest/no-disabled-tests */
describe.skip('TS types behave as expected', () => {
  test('H1', () => {
    <H1 as="a">Children</H1>;
  });
  test('H2', () => {
    <H2 as="a">Children</H2>;
  });
  test('H3', () => {
    <H3 as="a">Children</H3>;
  });
  test('Subtitle', () => {
    <Subtitle as="a">Children</Subtitle>;
  });
  test('Body', () => {
    <Body as="span">Children</Body>;
  });
});
