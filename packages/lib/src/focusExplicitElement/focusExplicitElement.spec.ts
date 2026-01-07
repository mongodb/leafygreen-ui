import { focusExplicitElement } from './focusExplicitElement';

describe('focusExplicitElement', () => {
  test('focuses the element specified by the string selector', () => {
    const element = document.createElement('button');
    element.setAttribute('id', 'button');
    document.body.appendChild(element);
    focusExplicitElement(document.body, '#button');
    expect(element).toHaveFocus();
  });

  test('focuses the element specified by the ref', () => {
    const element = document.createElement('button');
    document.body.appendChild(element);
    const ref = { current: element };
    focusExplicitElement(document.body, ref);
    expect(element).toHaveFocus();
  });
});
