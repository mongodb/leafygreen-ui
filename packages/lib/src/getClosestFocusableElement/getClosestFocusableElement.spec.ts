import { getClosestFocusableElement } from './getClosestFocusableElement';

describe('getClosestFocusableElement', () => {
  // Setup and cleanup
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('when element itself is focusable', () => {
    test('returns anchor element when element is an anchor', () => {
      const anchor = document.createElement('a');
      document.body.appendChild(anchor);
      expect(getClosestFocusableElement(anchor)).toBe(anchor);
    });

    test('returns button element when element is a button', () => {
      const button = document.createElement('button');
      document.body.appendChild(button);
      expect(getClosestFocusableElement(button)).toBe(button);
    });

    test('returns frame element when element is a frame', () => {
      const frame = document.createElement('frame');
      document.body.appendChild(frame);
      expect(getClosestFocusableElement(frame)).toBe(frame);
    });

    test('returns iframe element when element is an iframe', () => {
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      expect(getClosestFocusableElement(iframe)).toBe(iframe);
    });

    test('returns input element when element is an input (not hidden)', () => {
      const input = document.createElement('input');
      document.body.appendChild(input);
      expect(getClosestFocusableElement(input)).toBe(input);
    });

    test('does not return input when type is hidden', () => {
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      const div = document.createElement('div');
      div.appendChild(hiddenInput);
      document.body.appendChild(div);

      expect(getClosestFocusableElement(hiddenInput)).toBe(document.body);
    });

    test('returns select element when element is a select', () => {
      const select = document.createElement('select');
      document.body.appendChild(select);
      expect(getClosestFocusableElement(select)).toBe(select);
    });

    test('returns textarea element when element is a textarea', () => {
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      expect(getClosestFocusableElement(textarea)).toBe(textarea);
    });

    test('returns element with tabindex when element has tabindex', () => {
      const div = document.createElement('div');
      div.setAttribute('tabindex', '0');
      document.body.appendChild(div);
      expect(getClosestFocusableElement(div)).toBe(div);
    });
  });

  describe('when element is not focusable but has focusable parent', () => {
    test('returns the closest focusable parent', () => {
      const button = document.createElement('button');
      const span = document.createElement('span');
      const text = document.createElement('p');

      button.appendChild(span);
      span.appendChild(text);
      document.body.appendChild(button);

      expect(getClosestFocusableElement(text)).toBe(button);
    });

    test('returns the closest focusable ancestor at any level', () => {
      const anchor = document.createElement('a');
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');

      anchor.appendChild(div1);
      div1.appendChild(div2);
      div2.appendChild(div3);
      document.body.appendChild(anchor);

      expect(getClosestFocusableElement(div3)).toBe(anchor);
    });
  });

  describe('when no focusable element is found', () => {
    test('returns document.body when no focusable element exists in the chain', () => {
      const div = document.createElement('div');
      const span = document.createElement('span');
      div.appendChild(span);
      document.body.appendChild(div);

      expect(getClosestFocusableElement(span)).toBe(document.body);
    });
  });
});
