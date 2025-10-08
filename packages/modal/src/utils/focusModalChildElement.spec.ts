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

    // Create a mock dialog element
    mockDialogElement = document.body.appendChild(
      document.createElement('dialog'),
    );
    jest
      .spyOn(mockDialogElement, 'querySelector')
      .mockImplementation(mockQuerySelector);

    // Reset mocks
    jest.clearAllMocks();
  });

  describe('when a child element has autoFocus', () => {
    test('returns the autoFocus element without calling focus()', () => {
      const mockAutoFocusElement = document.createElement('input');
      jest.spyOn(mockAutoFocusElement, 'focus').mockImplementation(mockFocus);
      mockQuerySelector.mockReturnValue(mockAutoFocusElement);

      const result = focusModalChildElement(mockDialogElement);

      expect(mockQuerySelector).toHaveBeenCalledWith('[autofocus]');
      expect(mockFocus).not.toHaveBeenCalled(); // Browser handles autoFocus
      expect(result).toBe(mockAutoFocusElement);
    });

    test('returns the autoFocus element', () => {
      const mockAutoFocusElement = document.createElement('input');
      mockQuerySelector.mockReturnValue(mockAutoFocusElement);

      const result = focusModalChildElement(mockDialogElement);

      expect(result).toBe(mockAutoFocusElement);
    });
  });

  describe('when no child element has autoFocus', () => {
    test('focuses and returns the first focusable element', () => {
      const mockFirstFocusableElement = document.createElement('input');
      jest
        .spyOn(mockFirstFocusableElement, 'focus')
        .mockImplementation(mockFocus);

      // No autoFocus element found
      mockQuerySelector.mockReturnValue(null);
      mockQueryFirstFocusableElement.mockReturnValue(mockFirstFocusableElement);

      const result = focusModalChildElement(mockDialogElement);

      expect(mockQuerySelector).toHaveBeenCalledWith('[autofocus]');
      expect(mockQueryFirstFocusableElement).toHaveBeenCalledWith(
        mockDialogElement,
      );
      expect(mockFocus).toHaveBeenCalled(); // We do call focus() for non-autoFocus elements
      expect(result).toBe(mockFirstFocusableElement);
    });

    test('returns the focused element', () => {
      const mockFirstFocusableElement = document.createElement('input');
      jest
        .spyOn(mockFirstFocusableElement, 'focus')
        .mockImplementation(mockFocus);

      mockQuerySelector.mockReturnValue(null);
      mockQueryFirstFocusableElement.mockReturnValue(mockFirstFocusableElement);

      const result = focusModalChildElement(mockDialogElement);

      expect(result).toBe(mockFirstFocusableElement);
    });
  });

  describe('when no focusable elements exist', () => {
    test('returns null', () => {
      mockQuerySelector.mockReturnValue(null);
      mockQueryFirstFocusableElement.mockReturnValue(null);

      const result = focusModalChildElement(mockDialogElement);

      expect(result).toBeNull();
    });

    test('does not call focus on any element', () => {
      mockQuerySelector.mockReturnValue(null);
      mockQueryFirstFocusableElement.mockReturnValue(null);

      focusModalChildElement(mockDialogElement);

      expect(mockFocus).not.toHaveBeenCalled();
    });
  });

  describe('integration with real DOM elements', () => {
    test('identifies autoFocus element without calling focus()', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <dialog>
          <input autofocus />
          <button>Close</button>
        </dialog>
      `;
      document.body.appendChild(container);

      const dialogElement = container.querySelector(
        'dialog',
      ) as HTMLDialogElement;
      const inputElement = container.querySelector('input') as HTMLInputElement;

      // Mock the focus method to verify it's not called
      const mockFocus = jest.fn();
      inputElement.focus = mockFocus;

      const result = focusModalChildElement(dialogElement);

      expect(mockFocus).not.toHaveBeenCalled(); // Browser handles autoFocus
      expect(result).toBe(inputElement);

      // Cleanup
      document.body.removeChild(container);
    });

    test('focuses first focusable element when no autoFocus exists', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <dialog>
          <button>Submit</button>
          <input />
        </dialog>
      `;
      document.body.appendChild(container);

      const dialogElement = container.querySelector(
        'dialog',
      ) as HTMLDialogElement;
      const buttonElement = container.querySelector(
        'button',
      ) as HTMLButtonElement;

      // Mock the focus method to verify it IS called
      const mockFocus = jest.fn();
      buttonElement.focus = mockFocus;

      // Mock the queryFirstFocusableElement to return our button
      mockQueryFirstFocusableElement.mockReturnValue(buttonElement);

      const result = focusModalChildElement(dialogElement);

      expect(mockFocus).toHaveBeenCalled(); // We do call focus() for non-autoFocus elements
      expect(result).toBe(buttonElement);

      // Cleanup
      document.body.removeChild(container);
    });
  });
});
