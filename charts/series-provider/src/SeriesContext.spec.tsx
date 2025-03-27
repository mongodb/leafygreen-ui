import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SeriesProvider, useSeriesContext } from './SeriesContext';

const TestComponent = () => {
  const {
    checkedState,
    isChecked,
    isSelectAllChecked,
    isSelectAllIndeterminate,
    toggleSeries,
    toggleSelectAll,
  } = useSeriesContext();

  return (
    <div>
      <div data-testid="checkedState">{Array.from(checkedState).join(',')}</div>
      <div data-testid="isChecked">{isChecked('test-id').toString()}</div>
      <div data-testid="isSelectAllChecked">
        {isSelectAllChecked().toString()}
      </div>
      <div data-testid="isSelectAllIndeterminate">
        {isSelectAllIndeterminate().toString()}
      </div>
      <button
        data-testid="toggleSeries"
        onClick={() => toggleSeries('test-id')}
      >
        Toggle Series
      </button>
      <button data-testid="toggleSelectAll" onClick={toggleSelectAll}>
        Toggle Select All
      </button>
    </div>
  );
};

const renderTestComponentWithProvider = (series: Array<string>) => {
  const utils = render(
    <SeriesProvider series={series}>
      <TestComponent />
    </SeriesProvider>,
  );

  const checkedStateEl = utils.getByTestId('checkedState');
  const isCheckedEl = utils.getByTestId('isChecked');
  const isSelectAllCheckedEl = utils.getByTestId('isSelectAllChecked');
  const isSelectAllIndeterminateEl = utils.getByTestId(
    'isSelectAllIndeterminate',
  );
  const toggleSeriesButton = utils.getByTestId('toggleSeries');
  const toggleSelectAllButton = utils.getByTestId('toggleSelectAll');

  return {
    ...utils,
    checkedStateEl,
    isCheckedEl,
    isSelectAllCheckedEl,
    isSelectAllIndeterminateEl,
    toggleSeriesButton,
    toggleSelectAllButton,
  };
};

describe('SeriesContext', () => {
  test('provides the correct initial context values', () => {
    const {
      checkedStateEl,
      isCheckedEl,
      isSelectAllCheckedEl,
      isSelectAllIndeterminateEl,
    } = renderTestComponentWithProvider(['test-id']);

    expect(checkedStateEl.textContent).toBe('test-id');
    expect(isCheckedEl.textContent).toBe('true');
    expect(isSelectAllCheckedEl.textContent).toBe('true');
    expect(isSelectAllIndeterminateEl.textContent).toBe('false');
  });

  test('toggles series correctly', () => {
    const {
      checkedStateEl,
      isCheckedEl,
      isSelectAllCheckedEl,
      isSelectAllIndeterminateEl,
      toggleSeriesButton,
    } = renderTestComponentWithProvider(['test-id']);

    userEvent.click(toggleSeriesButton);
    expect(checkedStateEl.textContent).toBe('');
    expect(isCheckedEl.textContent).toBe('false');
    expect(isSelectAllCheckedEl.textContent).toBe('false');
    expect(isSelectAllIndeterminateEl.textContent).toBe('false');

    userEvent.click(toggleSeriesButton);
    expect(checkedStateEl.textContent).toBe('test-id');
    expect(isCheckedEl.textContent).toBe('true');
    expect(isSelectAllCheckedEl.textContent).toBe('true');
    expect(isSelectAllIndeterminateEl.textContent).toBe('false');
  });

  test('toggles select all correctly', () => {
    const {
      checkedStateEl,
      isSelectAllCheckedEl,
      isSelectAllIndeterminateEl,
      toggleSeriesButton,
      toggleSelectAllButton,
    } = renderTestComponentWithProvider(['test-id', 'test-id-2']);

    expect(checkedStateEl.textContent).toBe('test-id,test-id-2');
    expect(isSelectAllCheckedEl.textContent).toBe('true');
    expect(isSelectAllIndeterminateEl.textContent).toBe('false');

    userEvent.click(toggleSelectAllButton);
    expect(checkedStateEl.textContent).toBe('');
    expect(isSelectAllCheckedEl.textContent).toBe('false');
    expect(isSelectAllIndeterminateEl.textContent).toBe('false');

    userEvent.click(toggleSeriesButton);
    expect(checkedStateEl.textContent).toBe('test-id');
    expect(isSelectAllCheckedEl.textContent).toBe('false');
    expect(isSelectAllIndeterminateEl.textContent).toBe('true');

    userEvent.click(toggleSelectAllButton);
    expect(checkedStateEl.textContent).toBe('test-id,test-id-2');
    expect(isSelectAllCheckedEl.textContent).toBe('true');
    expect(isSelectAllIndeterminateEl.textContent).toBe('false');
  });
});
