import { SeriesOptions } from '../LineChart/LineChart.types';

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDataset(
  numOfDates: number,
  maxValue: number,
): Array<[string | number | Date, string | number | Date]> {
  const startDate = new Date('2021-01-15T01:00:00');
  const options: Array<[string | number | Date, string | number | Date]> = [];
  const baseValue = getRandomNumber(0, maxValue);

  for (let i = 0; i < numOfDates; i++) {
    const newDate = new Date(startDate);
    newDate.setMinutes(startDate.getMinutes() + i);
    options.push([newDate, getRandomNumber(baseValue - 25, baseValue + 25)]);
  }

  return options;
}

export const getSeriesOptionsSample = (
  numOfSeries: number = 5,
): SeriesOptions =>
  Array.from({ length: numOfSeries }, (_, i) => ({
    name: `Dataset ${i + 1}`,
    data: generateDataset(60, 500),
  }));
