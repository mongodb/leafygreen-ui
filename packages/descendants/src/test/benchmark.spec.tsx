import React from 'react';
import { faker } from '@faker-js/faker';
import { act, cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { range } from 'lodash';
import { performance } from 'perf_hooks';

import { PacoMenu, PacoMenuItem } from '../pacocoursey/TestComponents';
import { ReachMenu, ReachMenuItem } from '../reach/TestComponents';

import {
  INITIAL_ITEMS,
  ITERATIONS,
  logBenchmarks,
  MIDDLE_ELEMENT_INDEX,
  NESTED_ITEMS,
} from './benchmark.testutils';
import { TestDescendant, TestParent } from './components.testutils';

// eslint-disable-next-line jest/no-disabled-tests
describe('packages/descendants/BENCHMARK', () => {
  afterEach(() => {
    cleanup();
  });

  afterAll(() => {
    logBenchmarks();
  });

  describe.each(range(ITERATIONS))('%i', i => {
    describe('Control', () => {
      test('Render', () => {
        performance.mark('control-render-start');
        render(
          <div>
            {INITIAL_ITEMS.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>,
        );
        performance.mark('control-render-end');
        performance.measure(
          `control-render-${i}`,
          'control-render-start',
          'control-render-end',
        );
      });

      test('Nested', () => {
        performance.mark('control-nested-start');

        render(
          <div>
            {NESTED_ITEMS.map((item, i) => (
              <div key={i}>
                {item.map((item, j) => (
                  <div key={j}>{item}</div>
                ))}
              </div>
            ))}
          </div>,
        );

        performance.mark('control-nested-end');

        performance.measure(
          `control-nested-${i}`,
          'control-nested-start',
          'control-nested-end',
        );
      });

      test('Insert', () => {
        const { rerender } = render(
          <div>
            {INITIAL_ITEMS.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>,
        );

        const newItems = [...INITIAL_ITEMS];
        newItems.splice(MIDDLE_ELEMENT_INDEX, 0, faker.animal.type());

        performance.mark('control-insert-start');

        rerender(
          <div>
            {newItems.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>,
        );

        performance.mark('control-insert-end');

        performance.measure(
          `control-insert-${i}`,
          'control-insert-start',
          'control-insert-end',
        );
      });

      test('Remove', () => {
        const { rerender } = render(
          <div>
            {INITIAL_ITEMS.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>,
        );

        const newItems = [...INITIAL_ITEMS];
        newItems.splice(MIDDLE_ELEMENT_INDEX, 1);

        performance.mark('control-remove-start');

        rerender(
          <div>
            {newItems.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>,
        );

        performance.mark('control-remove-end');

        performance.measure(
          `control-remove-${i}`,
          'control-remove-start',
          'control-remove-end',
        );
      });
    });

    describe('pacocoursey', () => {
      test('Render', () => {
        performance.mark('paco-render-start');

        render(
          <PacoMenu>
            {INITIAL_ITEMS.map((item, i) => (
              <PacoMenuItem key={i}>{item}</PacoMenuItem>
            ))}
          </PacoMenu>,
        );

        performance.mark('paco-render-end');

        performance.measure(
          `paco-render-${i}`,
          'paco-render-start',
          'paco-render-end',
        );
      });

      test('Nested', () => {
        performance.mark('paco-nested-start');

        render(
          <PacoMenu>
            {NESTED_ITEMS.map((item, i) => (
              <PacoMenuItem key={i}>
                {item.map((item, j) => (
                  <PacoMenuItem key={j}>{item}</PacoMenuItem>
                ))}
              </PacoMenuItem>
            ))}
          </PacoMenu>,
        );

        performance.mark('paco-nested-end');

        performance.measure(
          `paco-nested-${i}`,
          'paco-nested-start',
          'paco-nested-end',
        );
      });

      test('Insert', () => {
        const { rerender } = render(
          <PacoMenu>
            {INITIAL_ITEMS.map((item, i) => (
              <PacoMenuItem key={i}>{item}</PacoMenuItem>
            ))}
          </PacoMenu>,
        );

        const newItems = [...INITIAL_ITEMS];
        newItems.splice(MIDDLE_ELEMENT_INDEX, 0, faker.animal.type());

        performance.mark('paco-insert-start');

        rerender(
          <PacoMenu>
            {newItems.map((item, i) => (
              <PacoMenuItem key={i}>{item}</PacoMenuItem>
            ))}
          </PacoMenu>,
        );

        performance.mark('paco-insert-end');

        performance.measure(
          `paco-insert-${i}`,
          'paco-insert-start',
          'paco-insert-end',
        );
      });

      test('Remove', () => {
        const { rerender } = render(
          <PacoMenu>
            {INITIAL_ITEMS.map((item, i) => (
              <PacoMenuItem key={i}>{item}</PacoMenuItem>
            ))}
          </PacoMenu>,
        );

        const newItems = [...INITIAL_ITEMS];
        newItems.splice(MIDDLE_ELEMENT_INDEX, 1);

        performance.mark('paco-remove-start');

        rerender(
          <PacoMenu>
            {newItems.map((item, i) => (
              <PacoMenuItem key={i}>{item}</PacoMenuItem>
            ))}
          </PacoMenu>,
        );

        performance.mark('paco-remove-end');

        performance.measure(
          `paco-remove-${i}`,
          'paco-remove-start',
          'paco-remove-end',
        );
      });

      test('Select', async () => {
        const { getAllByTestId } = render(
          <PacoMenu>
            {INITIAL_ITEMS.map((item, i) => (
              <PacoMenuItem key={i}>{item}</PacoMenuItem>
            ))}
          </PacoMenu>,
        );

        const items = getAllByTestId('paco-item');

        performance.mark('paco-select-start');
        act(() => {
          userEvent.click(items[MIDDLE_ELEMENT_INDEX]);
        });

        await waitFor(() => {
          expect(items[MIDDLE_ELEMENT_INDEX]).toHaveAttribute(
            'data-selected',
            'true',
          );
        });
        performance.mark('paco-select-end');

        performance.measure(
          `paco-select-${i}`,
          'paco-select-start',
          'paco-select-end',
        );
      });
    });

    describe('@reach-ui', () => {
      test('Render', () => {
        performance.mark('reach-render-start');

        render(
          <ReachMenu>
            {INITIAL_ITEMS.map((item, i) => (
              <ReachMenuItem key={i}>{item}</ReachMenuItem>
            ))}
          </ReachMenu>,
        );

        performance.mark('reach-render-end');

        performance.measure(
          `reach-render-${i}`,
          'reach-render-start',
          'reach-render-end',
        );
      });

      test('Nested', () => {
        performance.mark('reach-nested-start');

        render(
          <ReachMenu>
            {NESTED_ITEMS.map((item, i) => (
              <ReachMenuItem key={i}>
                {item.map((item, j) => (
                  <ReachMenuItem key={j}>{item}</ReachMenuItem>
                ))}
              </ReachMenuItem>
            ))}
          </ReachMenu>,
        );

        performance.mark('reach-nested-end');

        performance.measure(
          `reach-nested-${i}`,
          'reach-nested-start',
          'reach-nested-end',
        );
      });

      test('Insert', () => {
        const { rerender } = render(
          <ReachMenu>
            {INITIAL_ITEMS.map((item, i) => (
              <ReachMenuItem key={i}>{item}</ReachMenuItem>
            ))}
          </ReachMenu>,
        );

        const newItems = [...INITIAL_ITEMS];
        newItems.splice(MIDDLE_ELEMENT_INDEX, 0, faker.animal.type());

        performance.mark('reach-insert-start');

        rerender(
          <ReachMenu>
            {newItems.map((item, i) => (
              <ReachMenuItem key={i}>{item}</ReachMenuItem>
            ))}
          </ReachMenu>,
        );

        performance.mark('reach-insert-end');

        performance.measure(
          `reach-insert-${i}`,
          'reach-insert-start',
          'reach-insert-end',
        );
      });

      test('Remove', () => {
        const { rerender } = render(
          <ReachMenu>
            {INITIAL_ITEMS.map((item, i) => (
              <ReachMenuItem key={i}>{item}</ReachMenuItem>
            ))}
          </ReachMenu>,
        );

        const newItems = [...INITIAL_ITEMS];
        newItems.splice(MIDDLE_ELEMENT_INDEX, 1);

        performance.mark('reach-remove-start');

        rerender(
          <ReachMenu>
            {newItems.map((item, i) => (
              <ReachMenuItem key={i}>{item}</ReachMenuItem>
            ))}
          </ReachMenu>,
        );

        performance.mark('reach-remove-end');

        performance.measure(
          `reach-remove-${i}`,
          'reach-remove-start',
          'reach-remove-end',
        );
      });

      test('Select', async () => {
        const { getAllByTestId } = render(
          <ReachMenu>
            {INITIAL_ITEMS.map((item, i) => (
              <ReachMenuItem key={i}>{item}</ReachMenuItem>
            ))}
          </ReachMenu>,
        );

        const items = getAllByTestId('reach-item');

        performance.mark('reach-select-start');
        act(() => {
          userEvent.click(items[MIDDLE_ELEMENT_INDEX]);
        });

        await waitFor(() => {
          expect(items[MIDDLE_ELEMENT_INDEX]).toHaveAttribute(
            'data-selected',
            'true',
          );
        });
        performance.mark('reach-select-end');

        performance.measure(
          `reach-select-${i}`,
          'reach-select-start',
          'reach-select-end',
        );
      });
    });

    describe('leafygreen', () => {
      test('Render', () => {
        performance.mark('leafygreen-render-start');

        render(
          <TestParent>
            {INITIAL_ITEMS.map((item, i) => (
              <TestDescendant key={i}>{item}</TestDescendant>
            ))}
          </TestParent>,
        );

        performance.mark('leafygreen-render-end');

        performance.measure(
          `leafygreen-render-${i}`,
          'leafygreen-render-start',
          'leafygreen-render-end',
        );
      });

      test('Nested', () => {
        performance.mark('leafygreen-nested-start');

        render(
          <TestParent>
            {NESTED_ITEMS.map((item, i) => (
              <TestDescendant key={i}>
                {item.map((item, j) => (
                  <TestDescendant key={j}>{item}</TestDescendant>
                ))}
              </TestDescendant>
            ))}
          </TestParent>,
        );

        performance.mark('leafygreen-nested-end');

        performance.measure(
          `leafygreen-nested-${i}`,
          'leafygreen-nested-start',
          'leafygreen-nested-end',
        );
      });

      test('Insert', () => {
        const { rerender } = render(
          <TestParent>
            {INITIAL_ITEMS.map((item, i) => (
              <TestDescendant key={i}>{item}</TestDescendant>
            ))}
          </TestParent>,
        );

        const newItems = [...INITIAL_ITEMS];
        newItems.splice(MIDDLE_ELEMENT_INDEX, 0, faker.animal.type());

        performance.mark('leafygreen-insert-start');

        rerender(
          <TestParent>
            {newItems.map((item, i) => (
              <TestDescendant key={i}>{item}</TestDescendant>
            ))}
          </TestParent>,
        );

        performance.mark('leafygreen-insert-end');

        performance.measure(
          `leafygreen-insert-${i}`,
          'leafygreen-insert-start',
          'leafygreen-insert-end',
        );
      });

      test('Remove', () => {
        const { rerender } = render(
          <TestParent>
            {INITIAL_ITEMS.map((item, i) => (
              <TestDescendant key={i}>{item}</TestDescendant>
            ))}
          </TestParent>,
        );

        const newItems = [...INITIAL_ITEMS];
        newItems.splice(MIDDLE_ELEMENT_INDEX, 1);

        performance.mark('leafygreen-remove-start');

        rerender(
          <TestParent>
            {newItems.map((item, i) => (
              <TestDescendant key={i}>{item}</TestDescendant>
            ))}
          </TestParent>,
        );

        performance.mark('leafygreen-remove-end');

        performance.measure(
          `leafygreen-remove-${i}`,
          'leafygreen-remove-start',
          'leafygreen-remove-end',
        );
      });

      test('Select', async () => {
        const { getAllByTestId } = render(
          <TestParent>
            {INITIAL_ITEMS.map((item, i) => (
              <TestDescendant key={i}>{item}</TestDescendant>
            ))}
          </TestParent>,
        );

        const items = getAllByTestId('leafygreen-item');

        performance.mark('leafygreen-select-start');
        act(() => {
          userEvent.click(items[MIDDLE_ELEMENT_INDEX]);
        });

        await waitFor(() => {
          expect(items[MIDDLE_ELEMENT_INDEX]).toHaveAttribute(
            'data-selected',
            'true',
          );
        });
        performance.mark('leafygreen-select-end');

        performance.measure(
          `leafygreen-select-${i}`,
          'leafygreen-select-start',
          'leafygreen-select-end',
        );
      });
    });
  });
});
