import React from 'react';
import {
  Chart,
  ChartCard,
  Grid,
  Header,
  Line,
  SortDirection,
  SortKey,
  Tooltip,
  XAxis,
  YAxis,
} from '@lg-charts/core';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { DragProvider } from './DragProvider';

function renderChart(dragId: string) {
  return (
    <Chart key={dragId} dragId={dragId}>
      <Header title={dragId} showDivider data-testid={`${dragId}-header`} />
      <Grid vertical={false} />
      <Tooltip sortDirection={SortDirection.Desc} sortKey={SortKey.Value} />
      <XAxis type="value" />
      <YAxis type="value" />
      <Line
        name="Line 1"
        data={[
          [0, 0],
          [1, 1],
          [2, 2],
          [3, 3],
        ]}
      />
    </Chart>
  );
}

describe('@lg-charts/drag-provider', () => {
  test('should call `onDragEnd` when child `Chart` is dragged ', () => {
    const onDragEnd = jest.fn();

    render(
      <DragProvider onDragEnd={onDragEnd}>
        {renderChart('chart-1')}
      </DragProvider>,
    );

    const header = screen.getByTestId('chart-1-header');
    fireEvent.mouseDown(header, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(header, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(header);

    expect(onDragEnd).toHaveBeenCalled();
  });

  // test('should call `onDragEnd` when child `ChartCard` is dragged ', () => {
  //   const onDragEnd = jest.fn();

  //   render(
  //     <DragProvider onDragEnd={onDragEnd}>
  //       <ChartCard title="chart-card-1" />
  //     </DragProvider>,
  //   );

  //   const header = screen.getByTestId('lg-charts-core-chart_card-header');
  //   fireEvent.mouseDown(header, { clientX: 0, clientY: 0 });
  //   fireEvent.mouseMove(header, { clientX: 100, clientY: 100 });
  //   fireEvent.mouseUp(header);

  //   expect(onDragEnd).toHaveBeenCalled();
  // });

  // test('should not call `onDragEnd` when toggle button clicked on `ChartCard`', () => {});

  // test('should not call `onDragEnd` when header content is clicked on `ChartCard`', () => {});
});
