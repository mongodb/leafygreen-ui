import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SeriesProvider, useSeriesContext } from './SeriesContext';

const TestComponent = () => {
  const {
    getSeriesIndex,
    isChecked,
    isSelectAllChecked,
    isSelectAllIndeterminate,
    toggleSeries,
    toggleSelectAll,
  } = useSeriesContext();

  return (
    <div>
      <div data-testid="getSeriesIndex">
        {getSeriesIndex('Test series').toString()}
      </div>
      <div data-testid="isChecked">{isChecked('Test series').toString()}</div>
      <div data-testid="isSelectAllChecked">
        {isSelectAllChecked().toString()}
      </div>
      <div data-testid="isSelectAllIndeterminate">
        {isSelectAllIndeterminate().toString()}
      </div>
      <button
        data-testid="toggleSeries"
        onClick={() => toggleSeries('Test series')}
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

  const getSeriesIndexEl = utils.getByTestId('getSeriesIndex');
  const isCheckedEl = utils.getByTestId('isChecked');
  const isSelectAllCheckedEl = utils.getByTestId('isSelectAllChecked');
  const isSelectAllIndeterminateEl = utils.getByTestId(
    'isSelectAllIndeterminate',
  );
  const toggleSeriesButton = utils.getByTestId('toggleSeries');
  const toggleSelectAllButton = utils.getByTestId('toggleSelectAll');

  return {
    ...utils,
    getSeriesIndexEl,
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
      getSeriesIndexEl,
      isCheckedEl,
      isSelectAllCheckedEl,
      isSelectAllIndeterminateEl,
    } = renderTestComponentWithProvider(['Test series']);

    expect(getSeriesIndexEl.textContent).toBe('0');
    expect(isCheckedEl.textContent).toBe('true');
    expect(isSelectAllCheckedEl.textContent).toBe('true');
    expect(isSelectAllIndeterminateEl.textContent).toBe('false');
  });

  test('toggles series correctly', () => {
    const {
      isCheckedEl,
      isSelectAllCheckedEl,
      isSelectAllIndeterminateEl,
      toggleSeriesButton,
    } = renderTestComponentWithProvider(['Test series']);

    userEvent.click(toggleSeriesButton);
    expect(isCheckedEl.textContent).toBe('false');
    expect(isSelectAllCheckedEl.textContent).toBe('false');
    expect(isSelectAllIndeterminateEl.textContent).toBe('false');

    userEvent.click(toggleSeriesButton);
    expect(isCheckedEl.textContent).toBe('true');
    expect(isSelectAllCheckedEl.textContent).toBe('true');
    expect(isSelectAllIndeterminateEl.textContent).toBe('false');
  });

  test('toggles select all correctly', () => {
    const {
      isSelectAllCheckedEl,
      isSelectAllIndeterminateEl,
      toggleSeriesButton,
      toggleSelectAllButton,
    } = renderTestComponentWithProvider(['Test series', 'Test series 2']);

    expect(isSelectAllCheckedEl.textContent).toBe('true');
    expect(isSelectAllIndeterminateEl.textContent).toBe('false');

    userEvent.click(toggleSelectAllButton);
    expect(isSelectAllCheckedEl.textContent).toBe('false');
    expect(isSelectAllIndeterminateEl.textContent).toBe('false');

    userEvent.click(toggleSeriesButton);
    expect(isSelectAllCheckedEl.textContent).toBe('false');
    expect(isSelectAllIndeterminateEl.textContent).toBe('true');

    userEvent.click(toggleSelectAllButton);
    expect(isSelectAllCheckedEl.textContent).toBe('true');
    expect(isSelectAllIndeterminateEl.textContent).toBe('false');
  });
});
