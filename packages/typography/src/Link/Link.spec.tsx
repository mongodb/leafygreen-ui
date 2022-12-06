import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { BoxProps } from '@leafygreen-ui/box/src';

import { Link } from '..';

import { LinkProps } from './Link.types';

const renderLink = (props: BoxProps<'a', LinkProps>) => {
  render(<Link {...(props as Parameters<typeof Link>)}>Link</Link>);
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
});
