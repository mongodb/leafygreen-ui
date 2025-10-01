import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { PolymorphicAs } from '@leafygreen-ui/polymorphic';

import BackLink from './BackLink';
import { BackLinkProps } from './BackLink.types';

const renderBackLink = <TAs extends PolymorphicAs>({
  ref,
  ...props
}: BackLinkProps<TAs>) => {
  const utils = render(
    <BackLink ref={ref} data-testid="link" {...props}>
      Back link
    </BackLink>,
  );
  const link = utils.getByTestId('link');

  return { ...utils, link };
};

describe('packages/typography', () => {
  describe('BackLink', () => {
    test('accepts a ref', () => {
      const ref = createRef<HTMLAnchorElement>();
      const { container } = renderBackLink({
        ref,
        href: 'http://mongodb.design',
      });

      expect(ref.current).toBe(container.firstElementChild);
    });

    test('renders name of link', () => {
      const { getByText } = renderBackLink({
        href: 'http://mongodb.design',
      });
      const text = getByText('Back link');
      expect(text).toBeInTheDocument();
    });

    describe('inferred polymorphic behavior', () => {
      test('when the "as" prop is supplied its value is respected', () => {
        const { link } = renderBackLink({
          as: 'div',
          /* @ts-expect-error - when "as" is supplied, "href" is ignored */
          href: 'http://localhost:9001',
        });

        expect(link.tagName.toLowerCase()).toBe('div');
      });

      test('renders as an anchor when an href prop is supplied', () => {
        const { link } = renderBackLink({ href: 'http://mongodb.design' });

        expect(link.tagName.toLowerCase()).toBe('a');
      });

      test('renders as a span when no "as" or "href" is provided', () => {
        const { link } = renderBackLink({});

        expect(link.tagName.toLowerCase()).toBe('span');
      });

      test('renders with wrapper component', () => {
        const Wrapper = (props: JSX.IntrinsicElements['a']) => {
          return (
            <a data-testid="link" {...props}>
              wrapper component
            </a>
          );
        };

        const { getByTestId, getByText } = render(
          <BackLink href="http://mongodb.design" as={Wrapper}>
            Link
          </BackLink>,
        );
        const link = getByTestId('link');
        expect(link.getAttribute('href')).toBe('http://mongodb.design');
        expect(link.tagName.toLowerCase()).toBe('a');

        const text = getByText('wrapper component');
        expect(text).toBeInTheDocument();
      });
    });

    describe('TypeScript types are correct', () => {
      const WrapperComponent = (props: JSX.IntrinsicElements['button']) => {
        return <button {...props} />;
      };

      const AnchorComponent = (props: JSX.IntrinsicElements['a']) => {
        return <a {...props}>test</a>;
      };

      // eslint-disable-next-line
      test.skip('BackLink Component types', () => {
        <>
          <BackLink />
          <BackLink>some content</BackLink>
          <BackLink href="string" target="string" rel="string">
            some content
          </BackLink>

          <BackLink as="div">some content</BackLink>
          {/* @ts-expect-error href is not allowed on explicit div */}
          <BackLink as="div" href="string">
            some content
          </BackLink>
          {/* @ts-expect-error target is not allowed on explicit div */}
          <BackLink as="div" target="string">
            some content
          </BackLink>

          {/* @ts-expect-error href is not allowed on a Wrapper component that does not accept anchor props */}
          <BackLink as={WrapperComponent} href="string">
            some content
          </BackLink>
          {/* @ts-expect-error target is not allowed on a Wrapper component that does not accept anchor props */}
          <BackLink as={WrapperComponent} target="string">
            some content
          </BackLink>

          <BackLink
            href="string"
            as={AnchorComponent}
            target="string"
            rel="string"
          >
            some content
          </BackLink>

          <BackLink as="a" href="string" target="string" rel="string">
            Content
          </BackLink>
          {/* @ts-expect-error as anchor is not allowed without an href */}
          <BackLink as="a">Content</BackLink>
        </>;
      });
    });
  });
});
