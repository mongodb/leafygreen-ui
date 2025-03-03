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
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryObj } from '@storybook/react';

import { DragProvider } from './DragProvider';

export default {
  title: 'Charts/DragProvider',
  component: DragProvider,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

function arrayMove(arr: Array<string>, value1: string, value2: string) {
  const val1Idx = arr.indexOf(value1);
  const val2Idx = arr.indexOf(value2);
  const updated = [...arr];
  updated[val2Idx] = value1;
  updated[val1Idx] = value2;
  return updated;
}

function DraggableExampleComponent() {
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
              {charts[cardId].map(chartId => (
                <Chart key={chartId} dragId={chartId}>
                  <Header title={chartId} showDivider />
                  <Grid vertical={false} />
                  <Tooltip
                    sortDirection={SortDirection.Desc}
                    sortKey={SortKey.Value}
                  />
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
              ))}
            </DragProvider>
          </ChartCard>
        ))}
      </DragProvider>
    </div>
  );
}

export const LiveExample: StoryObj<{}> = {
  render: () => <DraggableExampleComponent />,
};
