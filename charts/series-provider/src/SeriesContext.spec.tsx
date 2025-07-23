import React from 'react';
import {
  colors as defaultColors,
  type DarkColor,
  type LightColor,
} from '@lg-charts/colors';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SeriesProvider, useSeriesContext } from './SeriesContext';

const TestComponent = () => {
  const {
    getColor,
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
      <div data-testid="getColorLight">{getColor('Test series', 'light')}</div>
      <div data-testid="getColorDark">{getColor('Test series', 'dark')}</div>
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

const renderTestComponentWithProvider = (
  series: Array<string>,
  customColors?: { light: Array<LightColor>; dark: Array<DarkColor> },
) => {
  const providerProps = customColors ? { series, customColors } : { series };
  const utils = render(
    <SeriesProvider {...providerProps}>
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
  const getColorLightEl = utils.getByTestId('getColorLight');
  const getColorDarkEl = utils.getByTestId('getColorDark');

  return {
    ...utils,
    getSeriesIndexEl,
    isCheckedEl,
    isSelectAllCheckedEl,
    isSelectAllIndeterminateEl,
    toggleSeriesButton,
    toggleSelectAllButton,
    getColorLightEl,
    getColorDarkEl,
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

  describe('getColor util', () => {
    const series = ['Test series'];
    const customColors = {
      light: ['#D68000', '#016BF8'] as Array<LightColor>,
      dark: ['#D68000', '#016BF8'] as Array<DarkColor>,
    };

    test('returns customColors when provided', () => {
      const { getColorLightEl, getColorDarkEl } =
        renderTestComponentWithProvider(series, customColors);
      expect(getColorLightEl.textContent).toBe(customColors.light[0]);
      expect(getColorDarkEl.textContent).toBe(customColors.dark[0]);
    });

    test('returns defaultColors based on theme when no customColors', () => {
      const { getColorLightEl, getColorDarkEl } =
        renderTestComponentWithProvider(series);
      expect(getColorLightEl.textContent).toBe(defaultColors.light[0]);
      expect(getColorDarkEl.textContent).toBe(defaultColors.dark[0]);
    });
  });
});
