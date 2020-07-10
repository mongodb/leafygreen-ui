import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Link } from '.';

const renderLink = (props = {}) => {
  render(<Link {...props}>Link</Link>);
};

describe('packages/typography', () => {
  describe('Link', () => {
    describe('when no href is supplied', () => {
      test('a warning is logged to the console', () => {
        const logError = jest.spyOn(console, 'error').mockImplementation();

        renderLink();

        expect(logError).toHaveBeenCalledTimes(1);
        expect(logError).toHaveBeenCalledWith(
          'Link components are wrapped anchor tags. Please provide a destination URL through the `href` prop or consider using another component.',
        );
        logError.mockRestore();
      });
    });

    describe('when the current host is different from the destination URL host', () => {
      test('and the "showArrow" prop specified', () => {
        renderLink({ href: 'http://mongodb.design', showArrow: true });
        const openInNewTab = screen.getByTitle('Open in New Tab');
        const rightArrow = screen.queryByTitle('Glyphs / Arrow / Right');
        expect(openInNewTab).toBeInTheDocument();
        expect(rightArrow).not.toBeInTheDocument();
      });

      test('and the "showArrow" prop is not specified', () => {
        renderLink({ href: 'http://mongodb.design' });
        const openInNewTab = screen.getByTitle('Open in New Tab');
        expect(openInNewTab).toBeInTheDocument();
      });
    });

    describe('when the current host is the same as the destination URL host', () => {
      test('and the "showArrow" prop is specified', () => {
        renderLink({ href: 'http://localhost:9001', showArrow: true });
        const anchor = screen.getByText('Link');
        const openInNewTab = screen.queryByTitle('Open in New Tab');
        const rightArrow = screen.getByTitle('Glyphs / Arrow / Right');

        fireEvent.mouseEnter(anchor);
        expect(rightArrow).toBeInTheDocument();
        expect(openInNewTab).not.toBeInTheDocument();
      });

      test('and the "showArrow" prop is not specified', () => {
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
});
