import React from 'react';
import createUniqueClassName from '.';
import {TestComponent} from './testComponent'
import { render } from '@testing-library/react';

const renderTestComponent = () => {
  return render(
    React.createElement(TestComponent)
  )
}

describe('packages/lib/createUniqueClassName', () => {
  describe('createUniqueClassName', () => {
    test('Format is correct', () => {
      const lgPrefix = 'lg-ui-';
      const expectedUuidLength = 8;
      const result = createUniqueClassName();
      expect(result.startsWith(lgPrefix)).toBe(true);
      expect(result.length == lgPrefix.length + expectedUuidLength);
    });

    test('Two generated classNames are not equal.', () => {
      const res1 = createUniqueClassName();
      const res2 = createUniqueClassName();
      expect(res1.valueOf() == res2.valueOf()).not.toBe(true);
    });

    test('Prefixes are correctly applied.', () => {
      const lgPrefix = 'lg-ui-';
      const customPrefix = 'test';
      const res1 = createUniqueClassName(customPrefix);
      const res2 = createUniqueClassName(customPrefix);
      expect(res1.startsWith(lgPrefix + customPrefix + '-')).toBe(true);
      expect(res2.startsWith(lgPrefix + customPrefix + '-')).toBe(true);
      expect(res1.valueOf() == res2.valueOf()).not.toBe(true);
    });
  });

  describe('rendering', () => {
    test('Separate classNames in a component are unique', () => {
      const renderedTestComponent = renderTestComponent()
      const element1 = renderedTestComponent.getByTestId('el-1')
      const element2 = renderedTestComponent.getByTestId('el-2')
      const className1 = element1.classList.value
      const className2 = element2.classList.value
      expect(className1).not.toEqual(className2)
    })
  })
});
