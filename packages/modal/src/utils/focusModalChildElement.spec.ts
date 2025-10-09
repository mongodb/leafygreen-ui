import React from 'react';

import { focusModalChildElement } from './focusModalChildElement';

// Mock the queryFirstFocusableElement function
jest.mock('@leafygreen-ui/lib', () => ({
  queryFirstFocusableElement: jest.fn(),
}));

import { queryFirstFocusableElement } from '@leafygreen-ui/lib';

const mockQueryFirstFocusableElement =
  queryFirstFocusableElement as jest.MockedFunction<
    typeof queryFirstFocusableElement
  >;

describe('focusModalChildElement', () => {
  let mockFocus: jest.Mock;
  let mockQuerySelector: jest.Mock;
  let mockDialogElement: HTMLDialogElement;

  beforeEach(() => {
    mockFocus = jest.fn();
    mockQuerySelector = jest.fn();
    mockQueryFirstFocusableElement.mockClear();

    // Create a mock dialog element
    mockDialogElement = {
      querySelector: mockQuerySelector,
    } as unknown as HTMLDialogElement;
  });

  describe('when initialFocus is null', () => {
    test('does not focus any element', () => {
      const result = focusModalChildElement(mockDialogElement, null);

      expect(mockQuerySelector).not.toHaveBeenCalled();
      expect(mockQueryFirstFocusableElement).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('when initialFocus is a CSS selector', () => {
    test('focuses the element matching the selector', () => {
      const mockTargetElement = document.createElement('button');
      mockFocus = jest.fn();
      mockTargetElement.focus = mockFocus;

      mockQuerySelector.mockReturnValue(mockTargetElement);

      const result = focusModalChildElement(
        mockDialogElement,
        '#submit-button',
      );

      expect(mockQuerySelector).toHaveBeenCalledWith('#submit-button');
      expect(mockFocus).toHaveBeenCalled();
      expect(result).toBe(mockTargetElement);
    });
  });

  describe('when initialFocus is a React ref', () => {
    test('focuses the element referenced by the ref', () => {
      const mockTargetElement = document.createElement('button');
      mockFocus = jest.fn();
      mockTargetElement.focus = mockFocus;

      const mockRef = {
        current: mockTargetElement,
      } as React.RefObject<HTMLElement>;

      const result = focusModalChildElement(mockDialogElement, mockRef);

      expect(mockFocus).toHaveBeenCalled();
      expect(result).toBe(mockTargetElement);
    });
  });

  describe('when initialFocus is "auto" or undefined', () => {
    test('focuses first focusable element when initialFocus is "auto"', () => {
      const mockFirstFocusableElement = {
        focus: mockFocus,
      } as unknown as HTMLElement;

      mockQuerySelector.mockReturnValue(null); // No autoFocus element
      mockQueryFirstFocusableElement.mockReturnValue(mockFirstFocusableElement);

      const result = focusModalChildElement(mockDialogElement, 'auto');

      expect(mockQueryFirstFocusableElement).toHaveBeenCalledWith(
        mockDialogElement,
      );
      expect(mockFocus).toHaveBeenCalled();
      expect(result).toBe(mockFirstFocusableElement);
    });
  });

  describe('when a child element has autoFocus attribute', () => {
    test('returns the autoFocus element without calling focus() when initialFocus is "auto"', () => {
      const mockAutoFocusElement = {
        focus: mockFocus,
      } as unknown as HTMLElement;
      mockQuerySelector.mockReturnValue(mockAutoFocusElement);

      const result = focusModalChildElement(mockDialogElement, 'auto');

      expect(mockQuerySelector).toHaveBeenCalledWith('[autofocus]');
      expect(mockFocus).not.toHaveBeenCalled(); // Browser handles autoFocus
      expect(result).toBe(mockAutoFocusElement);
    });

    test('prioritizes initialFocus selector over autoFocus', () => {
      const mockTargetElement = document.createElement('button');
      mockFocus = jest.fn();
      mockTargetElement.focus = mockFocus;

      const mockAutoFocusElement = {
        focus: jest.fn(),
      } as unknown as HTMLElement;

      mockQuerySelector.mockImplementation((selector: string) => {
        if (selector === '#target') return mockTargetElement;
        if (selector === '[autofocus]') return mockAutoFocusElement;
        return null;
      });

      const result = focusModalChildElement(mockDialogElement, '#target');

      expect(mockFocus).toHaveBeenCalled();
      expect(result).toBe(mockTargetElement);
      // autoFocus should not be checked when explicit initialFocus is provided
    });

    test('prioritizes initialFocus ref over autoFocus', () => {
      const mockTargetElement = document.createElement('button');
      mockFocus = jest.fn();
      mockTargetElement.focus = mockFocus;

      const mockRef = {
        current: mockTargetElement,
      } as React.RefObject<HTMLElement>;

      const mockAutoFocusElement = {
        focus: jest.fn(),
      } as unknown as HTMLElement;

      mockQuerySelector.mockReturnValue(mockAutoFocusElement);

      const result = focusModalChildElement(mockDialogElement, mockRef);

      expect(mockFocus).toHaveBeenCalled();
      expect(result).toBe(mockTargetElement);
    });
  });

  describe('when no focusable elements exist', () => {
    test('returns null when initialFocus is "auto"', () => {
      mockQuerySelector.mockReturnValue(null);
      mockQueryFirstFocusableElement.mockReturnValue(null);

      const result = focusModalChildElement(mockDialogElement, 'auto');

      expect(result).toBeNull();
    });

    test('does not call focus on any element', () => {
      mockQuerySelector.mockReturnValue(null);
      mockQueryFirstFocusableElement.mockReturnValue(null);

      focusModalChildElement(mockDialogElement, 'auto');

      expect(mockFocus).not.toHaveBeenCalled();
    });
  });

  describe('integration with real DOM elements', () => {
    test('focuses element by selector', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <dialog>
          <button id="primary">Primary</button>
          <button id="secondary">Secondary</button>
        </dialog>
      `;

      try {
        document.body.appendChild(container);

        const dialogElement = container.querySelector(
          'dialog',
        ) as HTMLDialogElement;
        const secondaryButton = container.querySelector(
          '#secondary',
        ) as HTMLButtonElement;

        const mockFocus = jest.fn();
        secondaryButton.focus = mockFocus;

        const result = focusModalChildElement(dialogElement, '#secondary');

        expect(mockFocus).toHaveBeenCalled();
        expect(result).toBe(secondaryButton);
      } finally {
        document.body.removeChild(container);
      }
    });

    test('focuses element by ref', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <dialog>
          <button id="primary">Primary</button>
          <button id="secondary">Secondary</button>
        </dialog>
      `;

      try {
        document.body.appendChild(container);

        const dialogElement = container.querySelector(
          'dialog',
        ) as HTMLDialogElement;
        const secondaryButton = container.querySelector(
          '#secondary',
        ) as HTMLButtonElement;

        const mockFocus = jest.fn();
        secondaryButton.focus = mockFocus;

        const buttonRef = {
          current: secondaryButton,
        } as React.RefObject<HTMLButtonElement>;

        const result = focusModalChildElement(dialogElement, buttonRef);

        expect(mockFocus).toHaveBeenCalled();
        expect(result).toBe(secondaryButton);
      } finally {
        document.body.removeChild(container);
      }
    });

    test('identifies autoFocus element without calling focus()', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <dialog>
          <input autofocus />
          <button>Close</button>
        </dialog>
      `;

      try {
        document.body.appendChild(container);

        const dialogElement = container.querySelector(
          'dialog',
        ) as HTMLDialogElement;
        const inputElement = container.querySelector(
          'input',
        ) as HTMLInputElement;

        const mockFocus = jest.fn();
        inputElement.focus = mockFocus;

        const result = focusModalChildElement(dialogElement, 'auto');

        expect(mockFocus).not.toHaveBeenCalled(); // Browser handles autoFocus
        expect(result).toBe(inputElement);
      } finally {
        document.body.removeChild(container);
      }
    });

    test('focuses first focusable element when no autoFocus exists', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <dialog>
          <button>Submit</button>
          <input />
        </dialog>
      `;

      try {
        document.body.appendChild(container);

        const dialogElement = container.querySelector(
          'dialog',
        ) as HTMLDialogElement;
        const buttonElement = container.querySelector(
          'button',
        ) as HTMLButtonElement;

        const mockFocus = jest.fn();
        buttonElement.focus = mockFocus;

        mockQueryFirstFocusableElement.mockReturnValue(buttonElement);

        const result = focusModalChildElement(dialogElement, 'auto');

        expect(mockFocus).toHaveBeenCalled();
        expect(result).toBe(buttonElement);
      } finally {
        document.body.removeChild(container);
      }
    });

    test('does not focus when initialFocus is null', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <dialog>
          <button>Submit</button>
        </dialog>
      `;

      try {
        document.body.appendChild(container);

        const dialogElement = container.querySelector(
          'dialog',
        ) as HTMLDialogElement;
        const buttonElement = container.querySelector(
          'button',
        ) as HTMLButtonElement;

        const mockFocus = jest.fn();
        buttonElement.focus = mockFocus;

        const result = focusModalChildElement(dialogElement, null);

        expect(mockFocus).not.toHaveBeenCalled();
        expect(result).toBeNull();
      } finally {
        document.body.removeChild(container);
      }
    });
  });
});
