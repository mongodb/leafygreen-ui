import { render } from '@testing-library/react';
import { wrapJSX, getNameAndValue } from '.';

describe('packages/combobox/utils', () => {
  describe('wrapJSX', () => {
    test('Wraps the matched string in the provided element', () => {
      const JSX = wrapJSX('Apple', 'pp', 'em');
      const { container } = render(JSX);
      const ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(1);
      expect(ems[0]).toHaveTextContent('pp');
      expect(container).toHaveTextContent('Apple');
    });
    test('Wraps the entire string when it matches', () => {
      const JSX = wrapJSX('Apple', 'Apple', 'em');
      const { container } = render(JSX);
      const ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(1);
      expect(ems[0]).toHaveTextContent('Apple');
      expect(container).toHaveTextContent('Apple');
    });
    test('Keeps case consistent with source', () => {
      const JSX = wrapJSX('Apple', 'aPPlE', 'em');
      const { container } = render(JSX);
      const ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(1);
      expect(ems[0]).toHaveTextContent('Apple');
      expect(container).toHaveTextContent('Apple');
    });
    // No match
    test('Wraps nothing when there is no match', () => {
      const JSX = wrapJSX('Apple', 'q', 'em');
      const { container } = render(JSX);
      const ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(0);
      expect(container).toHaveTextContent('Apple');
    });

    // Multiple matches
    test('wraps all instances of a match', () => {
      const JSX = wrapJSX('Pepper', 'p', 'em');
      const { container } = render(JSX);
      const ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(3);
      expect(ems[0]).toHaveTextContent('P');
      expect(ems[1]).toHaveTextContent('p');
      expect(ems[2]).toHaveTextContent('p');
      expect(container).toHaveTextContent('Pepper');
    });
    test('wraps all instances of longer match', () => {
      const JSX = wrapJSX('Pepper', 'pe', 'em');
      const { container } = render(JSX);
      const ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(2);
      expect(ems[0]).toHaveTextContent('Pe');
      expect(ems[1]).toHaveTextContent('pe');
      expect(container).toHaveTextContent('Pepper');
    });

    // No `wrap`
    test('Returns the input string when "wrap" is empty', () => {
      const JSX = wrapJSX('Apple', '', 'em');
      const { container } = render(JSX);
      const ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(0);
      expect(container).toHaveTextContent(`Apple`);
    });
    test('Returns the input string when "wrap" is `undefined`', () => {
      const JSX = wrapJSX('Apple', undefined, 'em');
      const { container } = render(JSX);
      const ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(0);
      expect(container).toHaveTextContent(`Apple`);
    });

    // No `element`
    test('Returns the input string when "element" is empty', () => {
      const JSX = wrapJSX('Apple', 'ap', '' as keyof HTMLElementTagNameMap);
      const { container } = render(JSX);
      const ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(0);
      expect(container).toHaveTextContent(`Apple`);
    });
    test('Returns the input string when "element" is undefined', () => {
      const JSX = wrapJSX('Apple', 'ap');
      const { container } = render(JSX);
      const ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(0);
      expect(container).toHaveTextContent(`Apple`);
    });

    test('Updates after a second call', () => {
      const JSX = wrapJSX('Apple', 'p', 'em');
      const { container, rerender } = render(JSX);
      let ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(2);
      const JSX2 = wrapJSX('Apple', 'pp', 'em');
      rerender(JSX2);
      ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(1);
      expect(ems[0]).toHaveTextContent('pp');
      expect(container).toHaveTextContent(`Apple`);
    });
  });

  describe('getNameAndValue', () => {
    test('Returns both value and displayName as given', () => {
      const result = getNameAndValue({
        value: 'value',
        displayName: 'Display Name',
      });
      expect(result).toEqual({ value: 'value', displayName: 'Display Name' });
    });

    test('Returns a generated displayName', () => {
      const result = getNameAndValue({ value: 'value' });
      expect(result).toEqual({ value: 'value', displayName: 'value' });
    });

    test('Returns a generated value', () => {
      const result = getNameAndValue({ displayName: 'Display Name' });
      expect(result).toEqual({
        value: 'display-name',
        displayName: 'Display Name',
      });
    });
  });
});
