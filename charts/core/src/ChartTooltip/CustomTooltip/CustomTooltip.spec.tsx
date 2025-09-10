import React from 'react';
import { render, screen } from '@testing-library/react';

import { CustomTooltip } from './CustomTooltip';
import { CustomTooltipProps } from './CustomTooltip.types';

const baseSeriesData = {
  componentType: 'series',
  componentSubType: 'line',
  componentIndex: 0,
  seriesType: 'line',
  seriesIndex: 0,
  seriesId: '\u0000cluster2-shard-00-00-stuvwx3456.mongodb.net:27017\u00000',
  dataIndex: 18,
  color: '#016BF8',
  dimensionNames: ['x', 'y'],
  encode: {
    x: [0],
    y: [1],
  },
  $vars: ['seriesName', 'name', 'value'],
  axisDim: 'x',
  axisIndex: 0,
  axisType: 'xAxis.time',
  axisId: '\u0000X-Axis Label\u00000',
  axisValue: 1704086280000,
  axisValueLabel: '2024-01-01 00:18:00',
  marker:
    '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#016BF8;"></span>',
};

const mockSeriesData: CustomTooltipProps['seriesData'] = [
  {
    ...baseSeriesData,
    data: ['Series 1', 100],
    value: ['Series 1', 100],
    seriesName: 'Series 1',
    name: 'Series 1',
  },
  {
    ...baseSeriesData,
    data: ['Series 3', 300],
    value: ['Series 3', 300],
    seriesName: 'Series 3',
    name: 'Series 3',
  },
  {
    ...baseSeriesData,
    data: ['Series 2', 200],
    value: ['Series 2', 200],
    seriesName: 'Series 2',
    name: 'Series 2',
  },
];

function descendingCompareFn(
  valueA: string | number | Date,
  valueB: string | number | Date,
) {
  if (valueA < valueB) {
    return -1;
  }

  if (valueA > valueB) {
    return 1;
  }

  return 0;
}

const renderCustomTooltip = (props: Partial<CustomTooltipProps> = {}) => {
  const resolvedProps: CustomTooltipProps = {
    seriesData: props.seriesData || mockSeriesData,
    chartId: props.chartId || 'test-chart',
    tooltipPinned: props.tooltipPinned || false,
    ...props,
  };

  return render(<CustomTooltip {...resolvedProps} />);
};

describe('@lg-charts/core/ChartTooltip/CustomTooltip', () => {
  test('should render properly formatted date', () => {
    renderCustomTooltip();
    const dateElement = screen.getByText(
      /^[A-Z][a-z]{2} \d{1,2}, \d{4}, \d{1,2}:\d{2}:\d{2} [AP]M \(UTC\)$/,
    );
    expect(dateElement).toBeInTheDocument();
  });

  test('should render series list sorted desc by value by default', () => {
    renderCustomTooltip();

    const seriesElements = screen.getAllByText(/Series/);
    expect(seriesElements[0]).toHaveTextContent('Series 3');
    expect(seriesElements[1]).toHaveTextContent('Series 2');
    expect(seriesElements[2]).toHaveTextContent('Series 1');
  });

  test('should reorder list according to sort function', () => {
    renderCustomTooltip({
      sort: (seriesA, seriesB) =>
        descendingCompareFn(seriesA.value, seriesB.value),
    });

    const seriesElements = screen.getAllByText(/Series/);
    expect(seriesElements[0]).toHaveTextContent('Series 1');
    expect(seriesElements[1]).toHaveTextContent('Series 2');
    expect(seriesElements[2]).toHaveTextContent('Series 3');
  });

  test('should render custom series name with seriesNameFormatter', () => {
    renderCustomTooltip({
      seriesNameFormatter: (name: string) => `Name: ${name}`,
    });

    expect(screen.getByText('Name: Series 1')).toBeInTheDocument();
    expect(screen.getByText('Name: Series 2')).toBeInTheDocument();
    expect(screen.getByText('Name: Series 3')).toBeInTheDocument();
  });

  test('should render custom series value with seriesValueFormatter', () => {
    renderCustomTooltip({
      seriesValueFormatter: value => `$${value}`,
    });

    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
  });

  test('should render custom axis value with headerFormatter', () => {
    renderCustomTooltip({
      headerFormatter: () => `Axis Value: test`,
    });

    expect(screen.getByText('Axis Value: test')).toBeInTheDocument();
  });
});
