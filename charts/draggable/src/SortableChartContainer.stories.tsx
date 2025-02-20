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

interface DragDropContainerProps {}

const renderChart = (id: string, sortable = true) => {
  return (
    <Chart id={sortable ? id : undefined} key={id}>
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
      <DragContext items={cards} onDragEnd={handleCardDragEnd}>
        {cards.map(card => (
          <ChartCard
            title={card}
            id={card}
            key={card}
            style={{ marginBottom: 16 }}
          >
            <DragContext
              items={charts[card]}
              onDragEnd={({ active, over }) => {
                handleChartDragEnd({ container: card, active, over });
              }}
            >
              {charts[card].map(chart => renderChart(chart))}
            </DragContext>
          </ChartCard>
        ))}
      </DragContext>
    </div>
  );
}

export const LiveExample: StoryObj<DragDropContainerProps> = {
  render: () => <Example />,
};
