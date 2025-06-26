import {
  focusableElementSelector,
  queryAllFocusableElements,
  queryFirstFocusableElement,
  queryLastFocusableElement,
} from './queryFocusableElements';

describe('queryFocusableElements', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('queryAllFocusableElements', () => {
    test('returns all focusable elements within a container', () => {
      container.innerHTML = `
      <button>Button</button>
      <a href="#">Link</a>
      <input type="text" />
      <select><option>Option</option></select>
      <textarea></textarea>
      <div tabindex="0">Focusable div</div>
    `;

      const elements = queryAllFocusableElements(container);
      expect(elements).toHaveLength(6);
      expect(elements[0]).toBeInstanceOf(HTMLButtonElement);
      expect(elements[1]).toBeInstanceOf(HTMLAnchorElement);
      expect(elements[2]).toBeInstanceOf(HTMLInputElement);
      expect(elements[3]).toBeInstanceOf(HTMLSelectElement);
      expect(elements[4]).toBeInstanceOf(HTMLTextAreaElement);
      expect(elements[5]).toBeInstanceOf(HTMLDivElement);
    });

    test('excludes elements with tabindex="-1"', () => {
      container.innerHTML = `
      <button>Button</button>
      <a href="#" tabindex="-1">Link</a>
    `;

      const elements = queryAllFocusableElements(container);
      expect(elements).toHaveLength(1);
      expect(elements[0]).toBeInstanceOf(HTMLButtonElement);
    });

    test('excludes hidden inputs', () => {
      container.innerHTML = `
      <input type="text" />
      <input type="hidden" />
    `;

      const elements = queryAllFocusableElements(container);
      expect(elements).toHaveLength(1);
      expect(elements[0]).toBeInstanceOf(HTMLInputElement);
    });

    test('excludes disabled inputs', () => {
      container.innerHTML = `
      <input type="text" />
      <input type="text" disabled />
    `;

      const elements = queryAllFocusableElements(container);
      expect(elements).toHaveLength(1);
      expect(elements[0]).toBeInstanceOf(HTMLInputElement);
    });

    test('uses document.body as default container', () => {
      const spy = jest.spyOn(document.body, 'querySelectorAll');
      queryAllFocusableElements();
      expect(spy).toHaveBeenCalledWith(focusableElementSelector);
      spy.mockRestore();
    });
  });

  describe('queryFirstFocusableElement', () => {
    test('returns the first focusable element within a container', () => {
      container.innerHTML = `
      <button>Button</button>
      <a href="#">Link</a>
      <input type="text" />
    `;

      const element = queryFirstFocusableElement(container);
      expect(element).toBeInstanceOf(HTMLButtonElement);
      expect(element?.textContent).toBe('Button');
    });

    test('returns null if no focusable elements exist', () => {
      container.innerHTML = `
      <div>Non-focusable div</div>
      <p>Paragraph</p>
    `;

      const element = queryFirstFocusableElement(container);
      expect(element).toBeNull();
    });

    test('uses document.body as default container', () => {
      const spy = jest.spyOn(document.body, 'querySelector');
      queryFirstFocusableElement();
      expect(spy).toHaveBeenCalledWith(focusableElementSelector);
      spy.mockRestore();
    });
  });

  describe('queryLastFocusableElement', () => {
    test('returns the last focusable element within a container', () => {
      container.innerHTML = `
      <button>Button</button>
      <a href="#">Link</a>
      <input type="text" />
    `;

      const element = queryLastFocusableElement(container);
      expect(element).toBeInstanceOf(HTMLInputElement);
    });

    test('returns null if no focusable elements exist', () => {
      container.innerHTML = `
      <div>Non-focusable div</div>
      <p>Paragraph</p>
    `;

      const element = queryLastFocusableElement(container);
      expect(element).toBeNull();
    });

    test('returns null for an empty container', () => {
      const element = queryLastFocusableElement(container);
      expect(element).toBeNull();
    });

    test('uses document.body as default container', () => {
      const querySpy = jest.spyOn(document.body, 'querySelectorAll');
      queryLastFocusableElement();
      expect(querySpy).toHaveBeenCalledWith(focusableElementSelector);
      querySpy.mockRestore();
    });
  });
});
