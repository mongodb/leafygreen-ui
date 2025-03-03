# DragProvider

Nestable drag and drop zone for `Chart` and `ChartCard` components. `Chart` and
`ChartCard` components rendered within this context with a `dragId` prop, will become
draggable and droppable within the zone.

![npm (scoped)](https://img.shields.io/npm/v/@lg-charts/drag-provider.svg)

## Installation

### Yarn

```shell
yarn add @lg-charts/drag-provider
```

### NPM

```shell
npm install @lg-charts/drag-provider
```

## Basic Chart Example

```ts
const [cards, setCards] = useState<Array<string>>(['1', '2']);
const [charts, setCharts] = useState<Record<string, Array<string>>>({
  '1': ['3', '4'],
  '2': ['5', '6', '7'],
});

function handleCardDragEnd({ active, over }: { active: string; over: string }) {
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
);
```

## Props

| Name      | Description | Type | Default |
| --------- | ----------- | ---- | ------- |
| onDragEnd |
