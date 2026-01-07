import { focusBodyElement } from './focusBodyElement';

describe('focusBodyElement', () => {
  test('focuses the body element', () => {
    focusBodyElement();
    expect(document.body).toHaveFocus();
  });

  test('restores the original tabindex of the body element', () => {
    document.body.setAttribute('tabindex', '0');
    const originalTabIndex = document.body.getAttribute('tabindex');
    focusBodyElement();
    expect(document.body).toHaveFocus();
    expect(document.body.getAttribute('tabindex')).toBe(originalTabIndex);
  });

  test('restores tabindex="-1" when body originally had tabindex="-1"', () => {
    document.body.setAttribute('tabindex', '-1');
    focusBodyElement();
    expect(document.body).toHaveFocus();
    expect(document.body.getAttribute('tabindex')).toBe('-1');
  });

  test('removes tabindex attribute when body originally had no tabindex', () => {
    document.body.removeAttribute('tabindex');
    focusBodyElement();
    expect(document.body).toHaveFocus();
    expect(document.body.hasAttribute('tabindex')).toBe(false);
  });
});
