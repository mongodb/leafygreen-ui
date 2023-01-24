import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { LeafyGreenProviderProps } from './LeafyGreenContext';
import LeafyGreenProvider, {
  useBaseFontSize,
  useDarkMode,
  usePopoverPortalContainer,
} from '.';

afterAll(cleanup);

const ContextChecker = () => {
  const { darkMode } = useDarkMode();
  const baseFontSize = useBaseFontSize();
  const { portalContainer, scrollContainer } = usePopoverPortalContainer();

  return (
    <>
      <div data-testid="dark-mode" data-value={darkMode} />
      <div data-testid="font-size" data-value={baseFontSize} />
      <div
        data-testid="portal-container"
        id={portalContainer!.getAttribute('id') ?? ''}
      />
      <div
        data-testid="scroll-container"
        id={scrollContainer!.getAttribute('id') ?? ''}
      />
    </>
  );
};

describe('packages/leafygreen-provider/LeafyGreenProvider', () => {
  const childTestID = 'using-keyboard-provider';
  const TestContextComponent = () => <div data-testid={childTestID}>Test</div>;

  const { container, getByTestId } = render(
    <LeafyGreenProvider>
      <TestContextComponent />
    </LeafyGreenProvider>,
  );

  const testChild = getByTestId(childTestID);

  test('only renders children in the DOM', () => {
    expect(container.firstChild).toBe(testChild);
  });

  describe('Context rendering', () => {
    const createContextValues = (
      darkMode = true,
      baseFontSize = 16,
      portalId = 'portal',
      scrollId = 'scroll',
    ) => {
      const portalContainer = document.createElement('div');
      portalContainer.setAttribute('id', portalId);
      const scrollContainer = document.createElement('div');
      scrollContainer.setAttribute('id', scrollId);

      return {
        darkMode,
        baseFontSize,
        popoverPortalContainer: {
          portalContainer,
          scrollContainer,
        },
      } as Required<LeafyGreenProviderProps>;
    };

    test('Children inherit all context values', () => {
      const defaultContext = createContextValues();
      const { getByTestId } = render(
        <LeafyGreenProvider {...defaultContext}>
          <ContextChecker />
        </LeafyGreenProvider>,
      );

      const darkModeDiv = getByTestId('dark-mode');
      const fontSizeDiv = getByTestId('font-size');
      const portalContainerDiv = getByTestId('portal-container');
      const scrollContainerDiv = getByTestId('scroll-container');

      expect(darkModeDiv).toHaveAttribute(
        'data-value',
        `${defaultContext.darkMode}`,
      );
      expect(fontSizeDiv).toHaveAttribute(
        'data-value',
        `${defaultContext.baseFontSize}`,
      );
      expect(portalContainerDiv).toHaveAttribute('id', 'portal');
      expect(scrollContainerDiv).toHaveAttribute('id', 'scroll');
    });

    describe('Nested contexts', () => {
      test('Inner context inherits all unset values', () => {
        const defaultContext = createContextValues();
        const { getByTestId } = render(
          <LeafyGreenProvider {...defaultContext}>
            <LeafyGreenProvider>
              <ContextChecker />
            </LeafyGreenProvider>
          </LeafyGreenProvider>,
        );

        const darkModeDiv = getByTestId('dark-mode');
        const fontSizeDiv = getByTestId('font-size');
        const portalContainerDiv = getByTestId('portal-container');
        const scrollContainerDiv = getByTestId('scroll-container');

        expect(darkModeDiv).toHaveAttribute(
          'data-value',
          `${defaultContext.darkMode}`,
        );
        expect(fontSizeDiv).toHaveAttribute(
          'data-value',
          `${defaultContext.baseFontSize}`,
        );
        expect(portalContainerDiv).toHaveAttribute('id', 'portal');
        expect(scrollContainerDiv).toHaveAttribute('id', 'scroll');
      });

      test('Inner context uses set values', () => {
        const defaultContext = createContextValues();
        const newContext = createContextValues(
          false,
          14,
          'new-portal',
          'new-scroll',
        );

        const { getByTestId } = render(
          <LeafyGreenProvider {...defaultContext}>
            <LeafyGreenProvider {...newContext}>
              <ContextChecker />
            </LeafyGreenProvider>
          </LeafyGreenProvider>,
        );

        const darkModeDiv = getByTestId('dark-mode');
        const fontSizeDiv = getByTestId('font-size');
        const portalContainerDiv = getByTestId('portal-container');
        const scrollContainerDiv = getByTestId('scroll-container');

        expect(darkModeDiv).toHaveAttribute(
          'data-value',
          `${newContext.darkMode}`,
        );
        expect(fontSizeDiv).toHaveAttribute(
          'data-value',
          `${newContext.baseFontSize}`,
        );
        expect(portalContainerDiv).toHaveAttribute('id', 'new-portal');
        expect(scrollContainerDiv).toHaveAttribute('id', 'new-scroll');
      });
    });
  });
});
