import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { Logo, LogoMark } from '.';

afterAll(cleanup);

describe('packages/logo', () => {
  describe('logomark component', () => {
    test('renders full-color logomark by default', () => {
      const { getByTestId } = render(<LogoMark />);
      const logomark = getByTestId('rgb-logomark');

      expect(logomark).toBeInTheDocument();
    });

    test('renders dark knockout logomark, when variant is set to dark', () => {
      const { getByTestId } = render(
        <LogoMark variant="dark" knockout={true} />,
      );
      const logomark = getByTestId('#21313C-monochrome-logomark');

      expect(logomark).toBeInTheDocument();
    });
    test('renders light knockout logomark, when variant is set to light', () => {
      const { getByTestId } = render(
        <LogoMark variant="light" knockout={true} />,
      );
      const logomark = getByTestId('#FFFFFF-monochrome-logomark');

      expect(logomark).toBeInTheDocument();
    });
  });

  describe('logo component', () => {
    test('renders full-color logomark with dark text by default', () => {
      const { getByTestId } = render(<Logo />);
      const logo = getByTestId('#21313C-rgb-logo');

      expect(logo).toBeInTheDocument();
    });

    test('renders full-color logomark with light text when variant is set to light', () => {
      const { getByTestId } = render(<Logo variant="light" />);
      const logo = getByTestId('#FFFFFF-rgb-logo');

      expect(logo).toBeInTheDocument();
    });

    test('renders dark knockout, when variant and knockout props are set', () => {
      const { getByTestId } = render(<Logo variant="dark" knockout={true} />);
      const logo = getByTestId('#21313C-monochrome-logo');

      expect(logo).toBeInTheDocument();
    });

    test('renders light knockout, when variant and knockout props are set', () => {
      const { getByTestId } = render(<Logo variant="light" knockout={true} />);
      const logo = getByTestId('#FFFFFF-monochrome-logo');

      expect(logo).toBeInTheDocument();
    });
  });
});
