import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Link, LinkProps } from './Link';

const renderLink = (props: LinkProps) => {
  render(<Link {...props}>Link</Link>);
};

describe('packages/typography', () => {
  describe('Link', () => {
    describe('when the current host is different from the destination URL host', () => {
      test('and the "arrowAppearance" prop is set to hover', () => {
        renderLink({ href: 'http://mongodb.design', arrowAppearance: 'hover' });
        const openInNewTab = screen.getByTitle('Open in New Tab');
        const rightArrow = screen.queryByTitle('Glyphs / Arrow / Right');
        expect(openInNewTab).toBeInTheDocument();
        expect(rightArrow).not.toBeInTheDocument();
      });

      test('and the "arrowAppearance" prop is not set', () => {
        renderLink({ href: 'http://mongodb.design' });
        const openInNewTab = screen.getByTitle('Open in New Tab');
        expect(openInNewTab).toBeInTheDocument();
      });
    });

    describe('when the current host is the same as the destination URL host', () => {
      describe('by default', () => {
        test('it renders the correct tag to the DOM', () => {
          renderLink({ href: 'http://localhost:9001' });
          const anchor = screen.getByText('Link').parentNode;
          expect((anchor as HTMLElement).tagName.toLowerCase()).toBe('a');
        });
      });
      test('and the "arrowAppearance" prop is set to "hover"', () => {
        renderLink({ href: 'http://localhost:9001', arrowAppearance: 'hover' });
        const anchor = screen.getByText('Link');
        const openInNewTab = screen.queryByTitle('Open in New Tab');
        const rightArrow = screen.queryByTitle('Glyphs / Arrow / Right');
        expect(rightArrow).not.toBeVisible();

        fireEvent.mouseEnter(anchor);
        expect(rightArrow).toBeInTheDocument();
        expect(openInNewTab).not.toBeInTheDocument();
      });

      test('and the "arrowAppearance" prop is set to "persist"', () => {
        renderLink({
          href: 'http://localhost:9001',
          arrowAppearance: 'persist',
        });

        const openInNewTab = screen.queryByTitle('Open in New Tab');
        const rightArrow = screen.getByTitle('Glyphs / Arrow / Right');
        expect(rightArrow).toBeInTheDocument();
        expect(openInNewTab).not.toBeInTheDocument();
      });

      test('and the "arrowAppearance" prop is not specified', () => {
        renderLink({ href: 'http://localhost:9001' });
        const anchor = screen.getByText('Link');
        const openInNewTab = screen.queryByTitle('Open in New Tab');
        const rightArrow = screen.queryByTitle('Glyphs / Arrow / Right');

        fireEvent.mouseEnter(anchor);
        expect(rightArrow).not.toBeInTheDocument();
        expect(openInNewTab).not.toBeInTheDocument();
      });

      test('and the "target" prop is set to "_blank"', () => {
        renderLink({ href: 'http://localhost:9001', target: '_blank' });
        const openInNewTab = screen.getByTitle('Open in New Tab');
        expect(openInNewTab).toBeInTheDocument();
      });
    });
  });

  describe('when the "as" prop is supplied', () => {
    test('it renders the correct tag to the DOM', () => {
      renderLink({ href: 'http://localhost:9001', as: 'div' });
      const div = screen.getByText('Link').parentNode;
      expect(div.tagName.toLowerCase()).toBe('div');
    });
  });

  describe('types behave as expected', () => {
    // eslint-disable-next-line jest/expect-expect
    test('errors when no "href" prop is passed', () => {
      // @ts-expect-error
      render(<Link />);
    });
  });
});
