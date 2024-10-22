import React from 'react';
import { render } from '@testing-library/react';

import { ChartProvider } from '.';

/**
 * This suite exclusively tests the provider and its functionality.
 */
describe('lg-chart/core/ChartContext/ChartProvider', () => {
  test('renders children', async () => {
    const { getByTestId, queryByTestId } = render(
      <ChartProvider
        chartOptions={{}}
        updateChartOptions={() => {}}
        addChartSeries={() => {}}
        removeChartSeries={() => {}}
        darkMode={false}
      >
        <div data-testid="div" />
      </ChartProvider>,
    );

    const div = getByTestId('div');
    expect(div).toBeInTheDocument();
  });
});
