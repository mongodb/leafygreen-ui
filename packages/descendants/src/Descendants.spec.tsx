import React from 'react';
import { render } from '@testing-library/react';

import { TestDescendant, TestParent } from './test/components.testutils';

describe('packages/descendants', () => {
  test('renders a basic list of descendants', () => {
    const { queryByText } = render(
      <TestParent>
        <TestDescendant>Apple</TestDescendant>
        <TestDescendant>Banana</TestDescendant>
        <TestDescendant>Carrot</TestDescendant>
      </TestParent>,
    );
    const apple = queryByText('Apple');
    const banana = queryByText('Banana');
    const carrot = queryByText('Carrot');

    expect(apple).toHaveAttribute('data-index', '0');
    expect(banana).toHaveAttribute('data-index', '1');
    expect(carrot).toHaveAttribute('data-index', '2');
  });

  test('does not track other elements', () => {
    const { queryByText } = render(
      <TestParent>
        <TestDescendant>Apple</TestDescendant>
        <TestDescendant>Banana</TestDescendant>
        <div>Zebra</div>
        <TestDescendant>Carrot</TestDescendant>
      </TestParent>,
    );
    const apple = queryByText('Apple');
    const banana = queryByText('Banana');
    const carrot = queryByText('Carrot');
    const zebra = queryByText('Zebra');

    expect(apple).toHaveAttribute('data-index', '0');
    expect(banana).toHaveAttribute('data-index', '1');
    expect(carrot).toHaveAttribute('data-index', '2');
    expect(zebra).not.toHaveAttribute('data-index');
  });

  test('renders a nested list of descendants', () => {
    const { queryByText } = render(
      <TestParent>
        <TestDescendant>
          Peppers
          <TestDescendant>
            Bell
            <TestDescendant>Yellow</TestDescendant>
          </TestDescendant>
        </TestDescendant>
        <TestDescendant>Watermelon</TestDescendant>
      </TestParent>,
    );

    const peppers = queryByText('Peppers');
    const bell = queryByText('Bell');
    const yellow = queryByText('Yellow');
    const watermelon = queryByText('Watermelon');

    expect(peppers).toHaveAttribute('data-index', '0');
    expect(bell).toHaveAttribute('data-index', '1');
    expect(yellow).toHaveAttribute('data-index', '2');
    expect(watermelon).toHaveAttribute('data-index', '3');
  });

  test('adds items to the rendered list', () => {
    const { queryByText, rerender } = render(
      <TestParent>
        <TestDescendant>Apple</TestDescendant>
        <TestDescendant>Banana</TestDescendant>
        <TestDescendant>Carrot</TestDescendant>
      </TestParent>,
    );

    rerender(
      <TestParent>
        <TestDescendant>Apple</TestDescendant>
        <TestDescendant>Watermelon</TestDescendant>
        <TestDescendant>Banana</TestDescendant>
        <TestDescendant>Carrot</TestDescendant>
      </TestParent>,
    );

    const apple = queryByText('Apple');
    const banana = queryByText('Banana');
    const carrot = queryByText('Carrot');
    const watermelon = queryByText('Watermelon');

    expect(apple).toHaveAttribute('data-index', '0');
    expect(watermelon).toHaveAttribute('data-index', '1');
    expect(banana).toHaveAttribute('data-index', '2');
    expect(carrot).toHaveAttribute('data-index', '3');
  });

  test('removes items from the rendered list', () => {
    const { queryByText, rerender } = render(
      <TestParent>
        <TestDescendant>Apple</TestDescendant>
        <TestDescendant>Banana</TestDescendant>
        <TestDescendant>Carrot</TestDescendant>
        <TestDescendant>Dragonfruit</TestDescendant>
      </TestParent>,
    );

    rerender(
      <TestParent>
        <TestDescendant>Apple</TestDescendant>
        <TestDescendant>Carrot</TestDescendant>
        <TestDescendant>Dragonfruit</TestDescendant>
      </TestParent>,
    );

    const apple = queryByText('Apple');
    const banana = queryByText('Banana');
    const carrot = queryByText('Carrot');
    const dragonfruit = queryByText('Dragonfruit');

    expect(apple).toHaveAttribute('data-index', '0');
    expect(banana).not.toBeInTheDocument();
    expect(carrot).toHaveAttribute('data-index', '1');
    expect(dragonfruit).toHaveAttribute('data-index', '2');
  });

  test('reorders items in the rendered list', () => {
    const { queryByText, rerender } = render(
      <TestParent>
        <TestDescendant>Apple</TestDescendant>
        <TestDescendant>Banana</TestDescendant>
        <TestDescendant>Carrot</TestDescendant>
        <TestDescendant>Dragonfruit</TestDescendant>
      </TestParent>,
    );

    rerender(
      <TestParent>
        <TestDescendant>Banana</TestDescendant>
        <TestDescendant>Dragonfruit</TestDescendant>
        <TestDescendant>Apple</TestDescendant>
        <TestDescendant>Carrot</TestDescendant>
      </TestParent>,
    );

    const apple = queryByText('Apple');
    const banana = queryByText('Banana');
    const carrot = queryByText('Carrot');
    const dragonfruit = queryByText('Dragonfruit');

    expect(banana).toHaveAttribute('data-index', '0');
    expect(dragonfruit).toHaveAttribute('data-index', '1');
    expect(apple).toHaveAttribute('data-index', '2');
    expect(carrot).toHaveAttribute('data-index', '3');
  });
});
