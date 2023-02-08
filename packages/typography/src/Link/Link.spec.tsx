import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { PolymorphicAs, PolymorphicProps } from '@leafygreen-ui/polymorphic';

import { Link } from '..';

import { LinkProps } from './Link.types';

type TypedLinkProps<T extends PolymorphicAs> = PolymorphicProps<T, LinkProps>;

const renderLink = <T extends PolymorphicAs>(props: TypedLinkProps<T>) => {
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
      const div = screen.getByText('Link').parentElement;
      expect(div).toHaveAttribute('href');
      expect(div?.getAttribute('href')).toBe('test');
    });

    test('it respects "target" and "rel" values when target is set', () => {
      renderLink({ target: 'test' });
      const div = screen.getByText('Link').parentElement;
      expect(div).toHaveAttribute('target');
      expect(div).not.toHaveAttribute('rel');
      expect(div?.getAttribute('target')).toBe('test');
    });

    test('it respects "target" and "rel" values when rel is set', () => {
      renderLink({ rel: 'test' });
      const div = screen.getByText('Link').parentElement;
      expect(div).toHaveAttribute('rel');
      expect(div).not.toHaveAttribute('target');
      expect(div?.getAttribute('rel')).toBe('test');
    });

    test('it respects "target" and "rel" values when both is set', () => {
      renderLink({ rel: 'rel', target: 'target' });
      const div = screen.getByText('Link').parentElement;
      expect(div).toHaveAttribute('rel');
      expect(div).toHaveAttribute('target');
      expect(div?.getAttribute('rel')).toBe('rel');
      expect(div?.getAttribute('target')).toBe('target');
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
});
