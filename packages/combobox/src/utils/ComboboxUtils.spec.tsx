import React from 'react';
import { render } from '@testing-library/react';

import { Icon } from '@leafygreen-ui/icon';

import { ComboboxGroup, ComboboxOption } from '..';

import {
  flattenChildren,
  getDisplayNameForValue,
  getNameAndValue,
  wrapJSX,
} from '.';

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

    // Sanitization
    test('Wraps a string that contains a Regex special character', () => {
      const JSX = wrapJSX('*(foo)', '*(', 'em');
      const { container } = render(JSX);
      const ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(1);
      expect(ems[0]).toHaveTextContent('*(');
      expect(container).toHaveTextContent('*(foo');
    });
    test('Wraps a string that contains a long Regex string', () => {
      const JSX = wrapJSX(
        '^(([a-z])+.)+[A-Z]([a-z])+$',
        '^(([a-z])+.)+[A-Z]([a-z])+$',
        'em',
      );
      const { container } = render(JSX);
      const ems = container.querySelectorAll('em');
      expect(ems).toHaveLength(1);
      expect(ems[0]).toHaveTextContent('^(([a-z])+.)+[A-Z]([a-z])+$');
      expect(container).toHaveTextContent('^(([a-z])+.)+[A-Z]([a-z])+$');
    });

    // Multiple calls
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

  describe('getDisplayNameForValue', () => {
    const options = [
      { value: 'apple', displayName: 'Apple', isDisabled: false },
      { value: 'banana', displayName: 'Banana', isDisabled: false },
      { value: 'carrot', displayName: 'Carrot', isDisabled: true },
    ];

    test('Returns the displayName when a matching option is found', () => {
      const result = getDisplayNameForValue('apple', options);
      expect(result).toBe('Apple');
    });

    test('Returns the value when no matching option is found', () => {
      const result = getDisplayNameForValue('unknown', options);
      expect(result).toBe('unknown');
    });

    test('Returns empty string when value is null', () => {
      const result = getDisplayNameForValue(null, options);
      expect(result).toBe('');
    });

    test('Returns empty string when value is empty string', () => {
      const result = getDisplayNameForValue('', options);
      expect(result).toBe('');
    });

    test('Returns displayName for disabled option', () => {
      const result = getDisplayNameForValue('carrot', options);
      expect(result).toBe('Carrot');
    });

    test('Returns empty string when options array is empty and value is null', () => {
      const result = getDisplayNameForValue(null, []);
      expect(result).toBe('');
    });

    test('Returns value when options array is empty but value is provided', () => {
      const result = getDisplayNameForValue('test', []);
      expect(result).toBe('test');
    });

    test('Returns React node displayName when option has node displayName', () => {
      const nodeDisplayName = (
        <span>
          <strong>Bold</strong> text
        </span>
      );
      const optionsWithNode = [
        {
          value: 'node-option',
          displayName: nodeDisplayName,
          isDisabled: false,
        },
      ];
      const result = getDisplayNameForValue('node-option', optionsWithNode);
      expect(result).toBe(nodeDisplayName);
    });
  });

  describe('flattenChildren', () => {
    test('returns a single option', () => {
      const children = <ComboboxOption value="test" displayName="Test" />;
      const flat = flattenChildren(children);
      expect(flat).toEqual([
        {
          value: 'test',
          displayName: 'Test',
          hasGlyph: false,
          isDisabled: false,
          badge: undefined,
        },
      ]);
    });

    test('returns multiple options', () => {
      const children = [
        <ComboboxOption key="apple" value="apple" displayName="Apple" />,
        <ComboboxOption key="banana" value="banana" displayName="Banana" />,
      ];
      const flat = flattenChildren(children);
      expect(flat).toEqual([
        {
          value: 'apple',
          displayName: 'Apple',
          hasGlyph: false,
          isDisabled: false,
          badge: undefined,
        },
        {
          value: 'banana',
          displayName: 'Banana',
          hasGlyph: false,
          isDisabled: false,
          badge: undefined,
        },
      ]);
    });

    test('returns hasGlyph and isDisabled', () => {
      const children = (
        <ComboboxOption
          value="test"
          displayName="Test"
          glyph={<Icon glyph="Beaker" />}
          disabled
        />
      );
      const flat = flattenChildren(children);
      expect(flat).toEqual([
        {
          value: 'test',
          displayName: 'Test',
          hasGlyph: true,
          isDisabled: true,
          badge: undefined,
        },
      ]);
    });

    test('flattens options with node displayName', () => {
      const children = [
        <ComboboxOption
          key="test"
          value="test"
          displayName={
            <div>
              <span>Testing</span>
              <span>New</span>
            </div>
          }
        />,
        <ComboboxOption
          key="test2"
          value="test"
          displayName="Test"
          glyph={<Icon glyph="Beaker" />}
          disabled
        />,
      ];
      const flat = flattenChildren(children);
      expect(flat).toEqual([
        {
          value: 'test',
          displayName: 'Testing New',
          hasGlyph: false,
          isDisabled: false,
        },
        {
          value: 'test',
          displayName: 'Test',
          hasGlyph: true,
          isDisabled: true,
        },
      ]);
    });

    test('flattens nested options', () => {
      const children = [
        <ComboboxOption key="apple" value="apple" displayName="Apple" />,
        <ComboboxOption key="banana" value="banana" displayName="Banana" />,
        <ComboboxGroup key="peppers" label="Peppers">
          <ComboboxOption value="ghost" displayName="Ghost" />
          <ComboboxOption value="habanero" displayName="Habanero" />
        </ComboboxGroup>,
      ];
      const flat = flattenChildren(children);
      expect(flat).toEqual([
        {
          value: 'apple',
          displayName: 'Apple',
          hasGlyph: false,
          isDisabled: false,
        },
        {
          value: 'banana',
          displayName: 'Banana',
          hasGlyph: false,
          isDisabled: false,
        },
        {
          value: 'ghost',
          displayName: 'Ghost',
          hasGlyph: false,
          isDisabled: false,
        },
        {
          value: 'habanero',
          displayName: 'Habanero',
          hasGlyph: false,
          isDisabled: false,
        },
      ]);
    });
  });
});
