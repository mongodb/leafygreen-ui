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

import { DragContext } from './DragContext';

export default {
  title: 'Charts/SortableChartContainer',
  component: ChartCard,
  args: {
    chartCardTitle: 'LeafyGreen ChartCard',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

function Example() {
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
    const activeIndex = cards.indexOf(active);
    const overIndex = cards.indexOf(over);
    const newCards = [...cards];
    newCards[activeIndex] = over;
    newCards[overIndex] = active;
    setCards(newCards);
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
    setCharts(prev => {
      const updatedList = [...prev[container]];
      const activeIndex = updatedList.indexOf(active);
      const overIndex = updatedList.indexOf(over);
      updatedList[activeIndex] = over;
      updatedList[overIndex] = active;
      return {
        ...prev,
        [container]: updatedList,
      };
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <DragContext onDragEnd={handleCardDragEnd}>
        {cards.map(cardId => (
          <ChartCard
            title={cardId}
            dragId={cardId}
            key={cardId}
            style={{ marginBottom: 16 }}
          >
            <DragContext
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
            </DragContext>
          </ChartCard>
        ))}
      </DragContext>
    </div>
  );
}

export const LiveExample: StoryObj<{}> = {
  render: () => <Example />,
};
