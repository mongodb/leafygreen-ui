import React, { ComponentProps, StrictMode } from 'react';
import { render, waitFor } from '@testing-library/react';

import Popover from '@leafygreen-ui/popover';

import {
  TestDescendant,
  TestDescendant2,
  TestDescendantContext,
  TestParent,
  TestParent2,
} from '../test/components.testutils';
import { renderDescendantsTestContext } from '../test/renderDescendantsTestContext.testutils';

import { DescendantsProvider, useInitDescendants } from '.';

describe('packages/descendants', () => {
  describe('rendering', () => {
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
  });

  describe('useInitDescendants', () => {
    test('descendants register when wrapped in a fragment', () => {
      const { hook } = renderDescendantsTestContext(
        <>
          <TestDescendant>Apple</TestDescendant>
          <TestDescendant>Banana</TestDescendant>
        </>,
      );

      const appleDescendant = hook.result.current.descendants[0];
      expect(appleDescendant).toBeDefined();
    });

    test('descendants register when individually wrapped in an HTML element', () => {
      const { hook } = renderDescendantsTestContext(
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
      const { hook, renderResult } = renderDescendantsTestContext(
        <>
          <div>Fruit</div>
          <TestDescendant data-testid="apple">Apple</TestDescendant>
          <TestDescendant>Banana</TestDescendant>
        </>,
      );

      const appleElement = renderResult.getByTestId('apple');
      const appleDescendant = hook.result.current.descendants[0];
      expect(appleDescendant).toBeDefined();
      expect(appleDescendant.element).toEqual(appleElement);
    });

    test('descendants object has access to index', () => {
      const { hook } = renderDescendantsTestContext(
        <>
          <TestDescendant>Apple</TestDescendant>
          <TestDescendant>Banana</TestDescendant>
        </>,
      );

      const appleDescendant = hook.result.current.descendants[0];
      expect(appleDescendant.index).toEqual(0);
    });

    test('descendants object has access to child props', () => {
      const { hook } = renderDescendantsTestContext(
        <>
          <TestDescendant group="fruit">Apple</TestDescendant>
          <TestDescendant group="fruit">Banana</TestDescendant>
        </>,
      );

      const appleDescendant = hook.result.current.descendants[0];
      expect(appleDescendant.props?.group).toEqual('fruit');
    });

    test('descendants object index updates after rerender', () => {
      const { hook, rerender } = renderDescendantsTestContext(
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
      const { hook, rerender } = renderDescendantsTestContext(
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

    test('Accessing descendants from a callback are not stale', async () => {
      const logDescendants = jest.fn();

      const Parent = ({
        children,
        open,
        ...rest
      }: ComponentProps<'div'> & { open: boolean }) => {
        const { descendants, dispatch, getDescendants } =
          useInitDescendants<HTMLDivElement>();

        const handleTransition = () => {
          logDescendants(getDescendants());
        };

        return (
          <StrictMode>
            <DescendantsProvider
              context={TestDescendantContext}
              descendants={descendants}
              dispatch={dispatch}
            >
              <Popover active={open} onEntered={handleTransition}>
                <div {...rest} data-testid="parent">
                  {children}
                </div>
              </Popover>
            </DescendantsProvider>
          </StrictMode>
        );
      };

      const renderResult = render(
        <Parent open={false}>
          <TestDescendant data-testid="child" />
        </Parent>,
      );

      renderResult.rerender(
        <Parent open={true}>
          <TestDescendant data-testid="child" />
        </Parent>,
      );

      await waitFor(() => {
        const child = renderResult.getByTestId('child');
        const expectedDescendants = expect.arrayContaining([
          expect.objectContaining({ element: child }),
        ]);
        expect(logDescendants).toHaveBeenCalledWith(expectedDescendants);
      });
    });
  });
});
