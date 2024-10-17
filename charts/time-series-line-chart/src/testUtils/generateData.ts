import { Series } from '../TimeSeriesLineChart.types';

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateData(numOfSets: number): Array<Series> {
  const data = [];

  for (let i = 0; i < numOfSets; i++) {
    const series: Series = {
      name: `Series ${i}`,
      data: [],
    };

    let currentDate = new Date(2020, 5, 9); // June 9th, 2020 (Month is 0-indexed)

    for (let j = 0; j < 24; j++) {
      series.data?.push([
        new Date(currentDate),
        getRandomNumber(i * 100, i * 100 + 100),
      ]);
      currentDate.setHours(currentDate.getHours() + 1); // Increment by one hour
    }

    data.push(series);
  }

  return data;
}
