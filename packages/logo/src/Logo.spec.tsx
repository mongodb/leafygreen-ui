import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { Logo, LogoMark } from '.';

afterAll(cleanup);

describe('packages/logo', () => {
  describe('logomark component', () => {
    test('renders full-color logomark by default', () => {
      const testId = 'rgb-logomark';
      const { getByTestId } = render(<LogoMark data-testid={testId} />);
      const logomark = getByTestId(testId);

      expect(logomark).toBeInTheDocument();
    });

    test('renders dark knockout logomark, when variant is set to dark', () => {
      const testId = '#21313C-monochrome-logomark';
      const { getByTestId } = render(
        <LogoMark variant="dark" knockout={true} data-testid={testId} />,
      );
      const logomark = getByTestId(testId);

      expect(logomark).toBeInTheDocument();
    });

    test('renders light knockout logomark, when variant is set to light', () => {
      const testId = '#FFFFFF-monochrome-logomark';
      const { getByTestId } = render(
        <LogoMark variant="light" knockout={true} data-testid={testId} />,
      );
      const logomark = getByTestId(testId);

      expect(logomark).toBeInTheDocument();
    });
  });

  describe('logo component', () => {
    test('renders full-color logomark with dark text by default', () => {
      const testId = '#21313C-rgb-logo';
      const { getByTestId } = render(<Logo data-testid={testId} />);
      const logo = getByTestId(testId);

      expect(logo).toBeInTheDocument();
    });

    test('renders full-color logomark with light text when variant is set to light', () => {
      const testId = '#FFFFFF-rgb-logo';
      const { getByTestId } = render(
        <Logo variant="light" data-testid={testId} />,
      );
      const logo = getByTestId(testId);

      expect(logo).toBeInTheDocument();
    });

    test('renders dark knockout, when variant and knockout props are set', () => {
      const testId = '#21313C-monochrome-logo';
      const { getByTestId } = render(
        <Logo variant="dark" knockout={true} data-testid={testId} />,
      );
      const logo = getByTestId(testId);

      expect(logo).toBeInTheDocument();
    });

    test('renders light knockout, when variant and knockout props are set', () => {
      const testId = '#FFFFFF-monochrome-logo';
      const { getByTestId } = render(
        <Logo variant="light" knockout={true} data-testid={testId} />,
      );
      const logo = getByTestId(testId);

      expect(logo).toBeInTheDocument();
    });
  });
});
