import React from 'react';
import createUniqueClassName from '.';
import { TestComponent } from './testComponent';
import { getByTestId, render } from '@testing-library/react';

const renderTestComponent = () => {
  return render(React.createElement(TestComponent));
};

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
      expect(res1.valueOf()).not.toEqual(res2.valueOf());
    });

    test('Prefixes are correctly applied.', () => {
      const lgPrefix = 'lg-ui-';
      const customPrefix = 'test';
      const res1 = createUniqueClassName(customPrefix);
      const res2 = createUniqueClassName(customPrefix);
      expect(res1.startsWith(lgPrefix + customPrefix + '-')).toBe(true);
      expect(res2.startsWith(lgPrefix + customPrefix + '-')).toBe(true);
      expect(res1.valueOf()).not.toEqual(res2.valueOf());
    });
  });

  describe('rendering', () => {
    test('Separate classNames in a component are unique', () => {
      const renderedTestComponent = renderTestComponent();
      const element1 = renderedTestComponent.getByTestId('el-1');
      const element2 = renderedTestComponent.getByTestId('el-2');
      const className1 = element1.classList.value;
      const className2 = element2.classList.value;
      expect(className1).not.toEqual(className2);
    });

    test('Classnames persist on re-render', () => {
      const renderedTestComponent = renderTestComponent();
      const element1 = renderedTestComponent.getByTestId('el-1');
      const element2 = renderedTestComponent.getByTestId('el-2');
      const className1 = element1.classList.value;
      const className2 = element2.classList.value;
      renderedTestComponent.rerender(React.createElement(TestComponent));
      expect(element1.classList.value).toEqual(className1);
      expect(element2.classList.value).toEqual(className2);
    });

    test('Classnames persist when dynamically imported', async () => {
      const { TestComponent: TestComponentA } = await import('./testComponent');
      const { container: containerA } = render(
        React.createElement(TestComponentA),
      );
      const elementA1 = getByTestId(containerA, 'el-1');
      const elementA2 = getByTestId(containerA, 'el-2');

      const { TestComponent: TestComponentB } = await import('./testComponent');
      const { container: containerB } = render(
        React.createElement(TestComponentB),
      );
      const elementB1 = getByTestId(containerB, 'el-1');
      const elementB2 = getByTestId(containerB, 'el-2');

      expect(elementA1.classList.value).toEqual(elementB1.classList.value);
      expect(elementA2.classList.value).toEqual(elementB2.classList.value);
    });

    test('Classnames persist in snapshot tests', () => {
      const { container } = render(React.createElement(TestComponent));
      expect(container).toMatchSnapshot();
    });
  });
});
