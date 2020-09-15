import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';

import {
  Logo,
  LogoMark,
  CloudManagerLogo,
  AtlasLogo,
  RealmLogo,
  ChartsLogo,
} from '.';

const map = {
  cloudManager: { title: 'Cloud Manager Logo', icon: CloudManagerLogo },
  atlas: { title: 'Atlas Logo', icon: AtlasLogo },
  realm: { title: 'Realm Logo', icon: RealmLogo },
  charts: { title: 'Charts Logo', icon: ChartsLogo },
};

const renderProductLogo = (product: keyof typeof map, props = {}) => {
  const Logo = map[product].icon;
  render(
    <div key={product}>
      <Logo {...props} data-testid="logo-test-id" />
      <div>{product}</div>
    </div>,
  );
};

describe('packages/logo', () => {
  describe('logomark component', () => {
    test('renders full-color logomark by default', () => {
      render(<LogoMark data-testid="default-logomark" />);
      const logoMark = screen.getByTestId('default-logomark');
      const path1 = logoMark.children[1];
      const path2 = logoMark.children[2];
      const path3 = logoMark.children[3];

      expect(path1.getAttribute('fill')).toBe('#10aa50');
      expect(path2.getAttribute('fill')).toBe('#b8c4c2');
      expect(path3.getAttribute('fill')).toBe('#12924f');
    });

    describe('when knockout is true', () => {
      test('and darkMode is set', () => {
        render(
          <LogoMark
            darkMode
            knockout
            data-testid="darkmode-knockout-logomark"
          />,
        );
        const logoMark = screen.getByTestId('darkmode-knockout-logomark');
        const path = logoMark.children[1];

        expect(path.getAttribute('fill')).toBe('#FFFFFF');
      });

      test('and darkMode is not set', () => {
        render(<LogoMark knockout data-testid="darkmode-knockout-logomark" />);
        const logoMark = screen.getByTestId('darkmode-knockout-logomark');
        const path = logoMark.children[1];

        expect(path.getAttribute('fill')).toBe('#21313C');
      });
    });
  });

  describe('logo component', () => {
    test('renders full-color logo with dark text by default', () => {
      const testId = 'default-color-logo';
      render(<Logo data-testid={testId} />);
      const logo = screen.getByTestId(testId);
      const path1 = logo.children[1]; // leaf
      const path4 = logo.children[4]; // text

      expect(path1.getAttribute('fill')).toBe('#10aa50');
      expect(path4.getAttribute('fill')).toBe('#21313C');
    });

    test('renders full-color logo with light text when darkMode is true', () => {
      const testId = 'dark-mode-color-logo';
      render(<Logo data-testid={testId} darkMode />);
      const logo = screen.getByTestId(testId);
      const path1 = logo.children[1]; // leaf
      const path4 = logo.children[4]; // text

      expect(path1.getAttribute('fill')).toBe('#10aa50');
      expect(path4.getAttribute('fill')).toBe('#FFFFFF');
    });

    describe('when knockout is true', () => {
      test('and darkMode is true', () => {
        const testId = 'dark-mode-knockout-logo';
        render(<Logo data-testid={testId} darkMode knockout />);
        const logo = screen.getByTestId(testId);
        const path1 = logo.children[1]; // leaf
        const path4 = logo.children[4]; // text

        expect(path1.getAttribute('fill')).toBe('#FFFFFF');
        expect(path4.getAttribute('fill')).toBe('#FFFFFF');
      });

      test('and darkMode is not set', () => {
        const testId = 'dark-mode-knockout-logo';
        render(<Logo data-testid={testId} knockout />);
        const logo = screen.getByTestId(testId);
        const path1 = logo.children[1]; // leaf
        const path4 = logo.children[4]; // text

        expect(path1.getAttribute('fill')).toBe('#21313C');
        expect(path4.getAttribute('fill')).toBe('#21313C');
      });
    });
  });

  describe('product logos', () => {
    describe('by default renders monochrome product logo with a height of 18', () => {
      Object.keys(map).forEach(product => {
        test(`for the ${product} logo`, () => {
          renderProductLogo(product as keyof typeof map);
          const logo = screen.getByTestId('logo-test-id');
          expect(logo).toBeInTheDocument();
          expect(logo.getAttribute('height')).toBe('18');
        });
      });
    });
  });
});
