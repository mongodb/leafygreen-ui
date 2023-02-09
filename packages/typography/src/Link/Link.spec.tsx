import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import {
  PolymorphicAs,
  PolymorphicProps,
  InferredPolymorphicProps,
} from '@leafygreen-ui/polymorphic';

import { Link } from '..';

import { LinkProps } from './Link.types';

type LinkRenderProps = PolymorphicProps<
  PolymorphicAs,
  InferredPolymorphicProps<LinkProps>
>;

const renderLink = (props: LinkRenderProps) => {
  render(<Link {...props}>Link</Link>);
};

describe('packages/typography', () => {
  describe('Link', () => {
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
      describe('by default', () => {
        test('it renders the correct tag to the DOM', () => {
          renderLink({
            href: 'http://localhost:9001',
          });
          const anchor = screen.getByText('Link').parentNode;
          expect((anchor as HTMLElement).tagName.toLowerCase()).toBe('a');
        });
      });

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
        });

        const icon = screen.getByRole('presentation', { hidden: true });
        expect(icon).toBeInTheDocument();
      });
    });

    describe('when the destination URL is relative', () => {
      describe('by default', () => {
        test('it renders the correct tag to the DOM', () => {
          renderLink({
            href: '?path=/story/badge--default',
          });
          const anchor = screen.getByText('Link').parentNode;
          expect((anchor as HTMLElement).tagName.toLowerCase()).toBe('a');
        });
      });

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
  });

  describe('when no "href" prop is passed and the "as" prop is not supplied', () => {
    test('it renders the Link inside of "span" tags', () => {
      renderLink({});
      const span = screen.getByText('Link').parentElement;
      expect(span).not.toBeNull();
      expect(span!.tagName.toLowerCase()).toBe('span');
    });
  });

  describe('when the "as" prop is supplied', () => {
    test('it renders the correct tag to the DOM', () => {
      renderLink({
        href: 'http://localhost:9001',
        as: 'div',
      });
      const div = screen.getByText('Link').parentElement;
      expect(div).toBeVisible();
      expect(div!.tagName.toLowerCase()).toBe('div');
    });
  });

  describe('anchor props', () => {
    test('href is always passed to rendered component when the prop is supplied', () => {
      renderLink({ href: 'test' });
      const a = screen.getByText('Link').parentElement;
      expect(a).toHaveAttribute('href');
      expect(a?.getAttribute('href')).toBe('test');
    });

    test('it respects "target" and "rel" values when target is set', () => {
      renderLink({ href: 'string', target: 'test' });
      const a = screen.getByText('Link').parentElement;
      expect(a).toHaveAttribute('target');
      expect(a).not.toHaveAttribute('rel');
      expect(a?.getAttribute('target')).toBe('test');
    });

    test('it respects "target" and "rel" values when rel is set', () => {
      renderLink({ href: 'string', rel: 'test' });
      const a = screen.getByText('Link').parentElement;
      expect(a).toHaveAttribute('rel');
      expect(a).not.toHaveAttribute('target');
      expect(a?.getAttribute('rel')).toBe('test');
    });

    test('it respects "target" and "rel" values when both is set', () => {
      renderLink({ href: 'string', rel: 'rel', target: 'target' });
      const a = screen.getByText('Link').parentElement;
      expect(a).toHaveAttribute('rel');
      expect(a).toHaveAttribute('target');
      expect(a?.getAttribute('rel')).toBe('rel');
      expect(a?.getAttribute('target')).toBe('target');
    });

    test('it sets "target" and "rel" values when href is set', () => {
      renderLink({ href: 'http://mongodb.design' });
      const anchor = screen.getByText('Link').parentElement;
      expect(anchor).toHaveAttribute('rel');
      expect(anchor).toHaveAttribute('target');
      expect(anchor).toHaveAttribute('href');
      expect(anchor?.tagName.toLowerCase()).toBe('a');
    });
  });

  describe('TypeSCript types are correct', () => {
    test.skip('Types', () => {
      const WrapperComponent = (props: JSX.IntrinsicElements['button']) => {
        return <button {...props} />;
      };

      const AnchorComponent = (props: JSX.IntrinsicElements['a']) => {
        return <a {...props} />;
      };

      <>
        <Link />
        <Link>some content</Link>
        <Link href="string">some content</Link>
        <Link as="div">some content</Link>
        {/* @ts-expect-error href is not allowed on explicit div */}
        <Link as="div" href="string">
          some content
        </Link>
        {/* @ts-expect-error href is not allowed on a Wrapper component that does not accept anchor props */}
        <Link as={WrapperComponent} href="string">
          some content
        </Link>
        {/* @ts-expect-error target is not allowed on a default span */}
        <Link target="_blank">Content</Link>
        <Link href="string" as={AnchorComponent} />
        <Link target="_blank" as={AnchorComponent} />
        {/* @ts-expect-error as anchor is not allowed without an href */}
        <Link as="a">Content</Link>
      </>;
    });
  });
});
