import React, { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { PolymorphicAs } from '@leafygreen-ui/polymorphic';

import Link from './Link';
import { LinkProps } from './Link.types';

const renderLink = <TAs extends PolymorphicAs>({
  ref,
  ...props
}: LinkProps<TAs>) => {
  render(
    <Link ref={ref} {...props}>
      Link
    </Link>,
  );
};

describe('packages/typography', () => {
  describe('Link', () => {
    test('accepts a ref', () => {
      const ref = createRef<HTMLAnchorElement>();
      const { container } = render(
        <Link ref={ref} href="http://mongodb.design">
          Link
        </Link>,
      );
      expect(ref.current).toBe(container.firstElementChild);
    });

    describe('when the current host is different from the destination URL host', () => {
      test('and the "arrowAppearance" prop is set to hover', () => {
        renderLink({
          href: 'http://mongodb.design',
          arrowAppearance: 'hover',
        });

        const icon = screen.getByRole('presentation', { hidden: true });
        expect(icon).toBeInTheDocument();
      });

      test('and the "arrowAppearance" prop is not set', () => {
        renderLink({
          href: 'http://mongodb.design',
        });
        const icon = screen.getByRole('presentation', { hidden: true });
        expect(icon).toBeInTheDocument();
      });

      test('and the "hideExternalIcon" prop is set', () => {
        renderLink({
          hideExternalIcon: true,
          href: 'http://mongodb.design',
        });
        const icon = screen.queryByRole('img');
        expect(icon).not.toBeInTheDocument();
      });
    });

    describe('when the current host is the same as the destination URL host', () => {
      test('and the "arrowAppearance" prop is set to "persist"', () => {
        renderLink({
          href: 'http://localhost:9001',
          arrowAppearance: 'persist',
        });

        const icon = screen.getByRole('presentation', { hidden: true });
        expect(icon).toBeInTheDocument();
      });

      // Related ticket here: https://jira.mongodb.org/browse/PD-1090
      test.todo('and the "arrowAppearance" prop is set to "hover"');

      test('and the "arrowAppearance" prop is not specified', () => {
        renderLink({
          href: 'http://localhost:9001',
        });
        const anchor = screen.getByText('Link');

        fireEvent.mouseEnter(anchor);
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
      });

      test('and the "target" prop is set to "_blank"', () => {
        renderLink({
          href: 'http://localhost:9001',
          target: '_blank',
          arrowAppearance: 'persist',
        });

        const icon = screen.getByRole('presentation', { hidden: true });
        expect(icon).toBeInTheDocument();
      });
    });

    describe('when the destination URL is relative', () => {
      test('and the "arrowAppearance" prop is set to "persist"', () => {
        renderLink({
          href: '?path=/story/badge--default',
          arrowAppearance: 'persist',
        });

        const icon = screen.getByRole('presentation', { hidden: true });
        expect(icon).toBeInTheDocument();
      });

      // Related ticket here: https://jira.mongodb.org/browse/PD-1090
      test.todo('and the "arrowAppearance" prop is set to "hover"');

      test('and the "arrowAppearance" prop is not specified', () => {
        renderLink({
          href: '?path=/story/badge--default',
        });
        const anchor = screen.getByText('Link');

        fireEvent.mouseEnter(anchor);
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
      });

      test('and the "target" prop is set to "_blank"', () => {
        renderLink({
          href: '?path=/story/badge--default',
          target: '_blank',
        });

        const icon = screen.getByRole('presentation', { hidden: true });
        expect(icon).toBeInTheDocument();
      });
    });

    describe('inferred polymorphic behavior', () => {
      test('when the "as" prop is supplied its value is respected', () => {
        renderLink({
          as: 'div',
          /* @ts-expect-error - when "as" is supplied, "href" is ignored */
          href: 'http://localhost:9001',
        });
        const div = screen.getByText('Link').parentElement;
        expect(div).toBeVisible();
        expect(div!.tagName.toLowerCase()).toBe('div');
      });

      test('when an href prop is supplied, its rendered as an anchor', () => {
        renderLink({ href: 'string' });
        const anchor = screen.getByText('Link').parentElement;
        expect(anchor).toBeVisible();
        expect(anchor!.tagName.toLowerCase()).toBe('a');
      });

      test('renders as a span when no "as" or "href" is provided', () => {
        renderLink({});
        const span = screen.getByText('Link').parentElement;
        expect(span).toBeVisible();
        expect(span!.tagName.toLowerCase()).toBe('span');
      });
    });

    describe('anchor props work as expected', () => {
      test('target prop overrides defaults when set', () => {
        const utils = render(
          <Link data-testid="link" target="test">
            Test
          </Link>,
        );
        const foundLink = utils.getByTestId('link');
        expect(foundLink.getAttribute('target')).toBe('test');
      });

      test('rel prop overrides defaults when set', () => {
        const utils = render(
          <Link data-testid="link" rel="test">
            Test
          </Link>,
        );
        const foundLink = utils.getByTestId('link');
        expect(foundLink.getAttribute('rel')).toBe('test');
      });

      test('href prop passed even when Component is not an anchor', () => {
        const Wrapper = (props: JSX.IntrinsicElements['a']) => {
          return <a {...props}>test</a>;
        };

        const utils = render(
          <Link data-testid="link" href="test" as={Wrapper}>
            Test
          </Link>,
        );
        const foundLink = utils.getByTestId('link');
        expect(foundLink.getAttribute('href')).toBe('test');
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
      test.skip('Link Component types', () => {
        <>
          <Link />
          <Link>some content</Link>
          <Link href="string" target="sting" rel="string">
            some content
          </Link>

          <Link as="div">some content</Link>

          {/* @ts-expect-error href is not allowed on explicit div */}
          <Link as="div" href="string">
            some content
          </Link>

          {/* @ts-expect-error target is not allowed on explicit div */}
          <Link as="div" target="string">
            some content
          </Link>

          {/* @ts-expect-error href is not allowed on a Wrapper component that does not accept anchor props */}
          <Link as={WrapperComponent} href="string">
            some content
          </Link>
          {/* @ts-expect-error target is not allowed on a Wrapper component that does not accept anchor props */}
          <Link as={WrapperComponent} target="string">
            some content
          </Link>

          <Link href="string" as={AnchorComponent} target="string" rel="string">
            some content
          </Link>

          <Link as="a" href="string" target="string" rel="string">
            Content
          </Link>
          {/* @ts-expect-error as anchor is not allowed without an href */}
          <Link as="a">Content</Link>
        </>;
      });
    });
  });
});
