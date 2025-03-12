import React, { useState } from 'react';
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
import { userEvent } from '@storybook/test';

import { DragProvider } from './DragProvider';

export interface DragChartProps {
  isOpen: boolean;
  onChartReady: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

export async function moveTarget({
  target,
  x = 310,
  y = 50,
}: {
  target: HTMLElement;
  x?: number;
  y?: number;
}) {
  await userEvent.pointer([
    { keys: '[MouseLeft>]', target },
    { coords: { x: 0, y: 0 } },
    { coords: { x, y } },
  ]);
}

export function renderChart(id: string, onChartReady?: () => void) {
  return (
    <Chart
      key={id}
      dragId={id}
      onChartReady={onChartReady}
      style={{ width: '100%', height: '100%' }}
    >
      <Header title={id} showDivider />
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

export function renderChartCard({
  isOpen,
  onChartReady,
  onDragEnd,
  onDragStart,
}: DragChartProps) {
  return (
    <div style={{ height: '100%', width: '300px' }}>
      <DragProvider onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <ChartCard
          title="card-id"
          dragId="card-id"
          key="card-id"
          style={{ marginBottom: 16 }}
          isOpen={isOpen}
        >
          {renderChart('chart-id', onChartReady)}
        </ChartCard>
      </DragProvider>
    </div>
  );
}

function arrayMove(arr: Array<string>, value1: string, value2: string) {
  const val1Idx = arr.indexOf(value1);
  const val2Idx = arr.indexOf(value2);
  const updated = [...arr];
  updated[val2Idx] = value1;
  updated[val1Idx] = value2;
  return updated;
}

export function LiveExampleComponent() {
  type CardId = string;
  const [cards, setCards] = useState<Array<CardId>>(['1', '2']);
  const [charts, setCharts] = useState<Record<CardId, Array<string>>>({
    '1': ['3', '4'],
    '2': ['5', '6'],
  });

  function handleCardDragEnd({
    active,
    over,
  }: {
    active: CardId;
    over: CardId;
  }) {
    setCards(prev => arrayMove(prev, active, over));
  }

  function handleChartDragEnd({
    container,
    active,
    over,
  }: {
    container: CardId;
    active: CardId;
    over: CardId;
  }) {
    setCharts(prev => ({
      ...prev,
      [container]: arrayMove(prev[container], active, over),
    }));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <DragProvider onDragEnd={handleCardDragEnd}>
        {cards.map(cardId => (
          <ChartCard
            title={cardId}
            dragId={cardId}
            key={cardId}
            style={{ marginBottom: 16 }}
          >
            <DragProvider
              onDragEnd={({ active, over }) => {
                handleChartDragEnd({ container: cardId, active, over });
              }}
            >
              {charts[cardId].map(chartId => renderChart(chartId))}
            </DragProvider>
          </ChartCard>
        ))}
      </DragProvider>
    </div>
  );
}
