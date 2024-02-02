import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import {
  TestDescendant,
  TestDescendant2,
  TestDescendantContext,
  TestParent,
  TestParent2,
} from './test/components.testutils';
import { DescendantsProvider } from './DescendantProvider';
import { useInitDescendants } from './useInitDescendants';

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

  test('renders multiple nested descendants contexts', () => {
    const { queryByText } = render(
      <TestParent>
        <TestDescendant>Apple</TestDescendant>
        <TestDescendant>Banana</TestDescendant>
        <TestDescendant>
          Peppers
          <TestParent2>
            <TestDescendant2>Anaheim</TestDescendant2>
            <TestDescendant2>Habanero</TestDescendant2>
          </TestParent2>
        </TestDescendant>
      </TestParent>,
    );
    const apple = queryByText('Apple');
    const banana = queryByText('Banana');
    const peppers = queryByText('Peppers');
    const anaheim = queryByText('Anaheim');
    const habanero = queryByText('Habanero');

    expect(apple).toHaveAttribute('data-index', '0');
    expect(banana).toHaveAttribute('data-index', '1');
    expect(peppers).toHaveAttribute('data-index', '2');
    expect(anaheim).toHaveAttribute('data-index', '0');
    expect(habanero).toHaveAttribute('data-index', '1');
  });

  describe('internal', () => {
    const renderDescendantsParent = (descendants: ReactNode) => {
      const hook = renderHook(() => useInitDescendants<HTMLDivElement>());

      const renderResult = render(
        <DescendantsProvider
          context={TestDescendantContext}
          descendants={hook.result.current.descendants}
          dispatch={hook.result.current.dispatch}
        >
          {descendants}
        </DescendantsProvider>,
      );

      const rerender = (descendants: ReactNode) => {
        renderResult.rerender(
          <DescendantsProvider
            context={TestDescendantContext}
            descendants={hook.result.current.descendants}
            dispatch={hook.result.current.dispatch}
          >
            {descendants}
          </DescendantsProvider>,
        );
      };

      return {
        hook,
        renderResult,
        rerender,
      };
    };

    test('descendants register when wrapped in a fragment', () => {
      const { hook } = renderDescendantsParent(
        <>
          <TestDescendant>Apple</TestDescendant>
          <TestDescendant>Banana</TestDescendant>
        </>,
      );

      const appleDescendant = hook.result.current.descendants[0];
      expect(appleDescendant).toBeDefined();
    });

    test('descendants register when individually wrapped in an HTML element', () => {
      const { hook } = renderDescendantsParent(
        <>
          <div>
            <TestDescendant>Apple</TestDescendant>
          </div>
          <span>
            <TestDescendant>Banana</TestDescendant>
          </span>
        </>,
      );

      const appleDescendant = hook.result.current.descendants[0];
      expect(appleDescendant).toBeDefined();
    });

    test('elements not rendered with `useDescendants` are not registered', () => {
      const { hook } = renderDescendantsParent(
        <>
          <div>Fruit</div>
          <TestDescendant>Apple</TestDescendant>
          <TestDescendant>Banana</TestDescendant>
        </>,
      );

      const appleDescendant = hook.result.current.descendants[0];
      expect(appleDescendant).toBeDefined();
    });

    test('descendants object has access to index', () => {
      const { hook } = renderDescendantsParent(
        <>
          <TestDescendant>Apple</TestDescendant>
          <TestDescendant>Banana</TestDescendant>
        </>,
      );

      const appleDescendant = hook.result.current.descendants[0];
      expect(appleDescendant.index).toEqual(0);
    });

    test('descendants object has access to child props', () => {
      const { hook } = renderDescendantsParent(
        <>
          <TestDescendant type="fruit">Apple</TestDescendant>
          <TestDescendant type="fruit">Banana</TestDescendant>
        </>,
      );

      const appleDescendant = hook.result.current.descendants[0];
      expect(appleDescendant.props?.type).toEqual('fruit');
    });

    test('descendants object index updates after rerender', () => {
      const { hook, rerender } = renderDescendantsParent(
        <>
          <TestDescendant>Apple</TestDescendant>
          <TestDescendant>Banana</TestDescendant>
          <TestDescendant>Carrot</TestDescendant>
        </>,
      );

      rerender(
        <>
          <TestDescendant>Banana</TestDescendant>
          <TestDescendant>Carrot</TestDescendant>
          <TestDescendant>Apple</TestDescendant>
        </>,
      );

      const appleDescendant = hook.result.current.descendants[2];
      expect(appleDescendant.element).toHaveTextContent('Apple');
      expect(appleDescendant.index).toEqual(2);
    });

    test('inserting an element updates the index of following elements', () => {
      const { hook, rerender } = renderDescendantsParent(
        <>
          <TestDescendant>Apple</TestDescendant>
          <TestDescendant>Carrot</TestDescendant>
        </>,
      );

      rerender(
        <>
          <TestDescendant>Apple</TestDescendant>
          <TestDescendant>Banana</TestDescendant>
          <TestDescendant>Carrot</TestDescendant>
        </>,
      );

      for (let i = 0; i < hook.result.current.descendants.length; i++) {
        const descendant = hook.result.current.descendants[i];
        expect(descendant.index).toEqual(i);
      }
    });
  });
});
