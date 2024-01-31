/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import { mean, range } from 'lodash';
import { performance } from 'perf_hooks';

export const ITERATIONS = 100;

export const ITEM_COUNT = 500;
export const NESTED_ITEM_COUNT = 5;
export const NESTED_PARENT_COUNT = ITEM_COUNT / NESTED_ITEM_COUNT;
export const MIDDLE_ELEMENT_INDEX = ITEM_COUNT / 2;

export const INITIAL_ITEMS = range(ITEM_COUNT).map((_: any) =>
  faker.animal.type(),
);
export const NESTED_ITEMS = range(NESTED_PARENT_COUNT).map(() =>
  range(NESTED_ITEM_COUNT).map(() => faker.animal.type()),
);

const TestKeys = {
  Control: 'control',
  Paco: 'paco',
  Reach: 'reach',
  LG: 'leafygreen',
};
type TestKey = (typeof TestKeys)[keyof typeof TestKeys];

export const Metrics = {
  Render: 'render',
  Nested: 'nested',
  Insert: 'insert',
  Remove: 'remove',
  Select: 'select',
} as const;

type Metric = (typeof Metrics)[keyof typeof Metrics];

type MeasurementGroup = Record<Metric, Array<number>>;

const newMeasurementsGroup = (): MeasurementGroup => ({
  render: [],
  nested: [],
  insert: [],
  remove: [],
  select: [],
});

type ResultGroup = Record<Metric, string>;
const newResultGroup = () => ({
  render: '',
  nested: '',
  insert: '',
  remove: '',
  select: '',
});

const _initialMeasurements: Record<TestKey, MeasurementGroup> = {
  control: newMeasurementsGroup(),
  paco: newMeasurementsGroup(),
  reach: newMeasurementsGroup(),
  leafygreen: newMeasurementsGroup(),
};

const _initialResults: Record<TestKey, ResultGroup> = {
  control: newResultGroup(),
  paco: newResultGroup(),
  reach: newResultGroup(),
  leafygreen: newResultGroup(),
};

export const logBenchmarks = () => {
  const measurements = performance.getEntriesByType('measure');

  const groupedMeasurements = measurements.reduce(
    (grouped, m) => {
      const group = m.name.split('-')[0] as TestKey;
      const metric = m.name.split('-')[1] as Metric;

      if (Object.values(TestKeys).includes(group)) {
        if (Object.values(Metrics).includes(metric)) {
          grouped[group][metric].push(m.duration);
        }
      }

      return grouped;
    },
    { ..._initialMeasurements },
  );

  const results = { ..._initialResults };

  for (const key of Object.keys(groupedMeasurements)) {
    for (const metric of Object.keys(groupedMeasurements[key as TestKey])) {
      const measurements =
        groupedMeasurements[key as TestKey][metric as Metric];

      results[key as TestKey][metric as Metric] =
        mean(measurements).toFixed(1) + 'ms';
    }
  }

  console.log(`${ITERATIONS} iterations`);
  console.table(results);
};
