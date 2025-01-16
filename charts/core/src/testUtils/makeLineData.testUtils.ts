import { faker } from '@faker-js/faker';

import { LineProps } from '../Line/Line.types';

/**
 * Generates random seeded test data for storybook
 */

// Seed the faker random number generator for consistent results
faker.seed(123);

// Helper function to generate a trend component
function getTrendValue(index: number, strength: number, direction: 1 | -1) {
  return (index * strength * direction) / 100;
}

// Helper function to generate seasonal patterns
function getSeasonalValue(index: number, amplitude: number, frequency: number) {
  return amplitude * Math.sin((index * 2 * Math.PI) / frequency);
}

// Helper function to add noise to the data
function getNoise(baseValue: number, volatility: number) {
  return faker.number.int({
    min: -volatility,
    max: volatility,
  });
}

// Generate MongoDB Atlas style shard URLs
function getClusterUrl(): string {
  const clusterNumber = faker.number.int({ min: 0, max: 9 });
  const shardSet = faker.number
    .int({ min: 0, max: 2 })
    .toString()
    .padStart(2, '0');
  const shardInstance = faker.number
    .int({ min: 0, max: 2 })
    .toString()
    .padStart(2, '0');
  const port = 27017; // Standard MongoDB port

  return `cluster${clusterNumber}-shard-${shardSet}-${shardInstance}...${port}`;
}

export function makeLineData(numOfSets: number): Array<LineProps> {
  const data: Array<LineProps> = [];
  const baseValue = 1000; // Base value for all series

  // Generate series-specific parameters
  const seriesParams = Array.from({ length: numOfSets }, () => ({
    trendStrength: faker.number.int({ min: 10, max: 50 }),
    trendDirection: faker.number.int({ min: 0, max: 1 }) === 0 ? -1 : 1,
    seasonalAmplitude: faker.number.int({ min: 50, max: 200 }),
    seasonalFrequency: faker.number.int({ min: 10, max: 30 }),
    volatility: faker.number.int({ min: 20, max: 80 }),
    baseMultiplier: faker.number.float({ min: 0.8, max: 1.2 }),
  }));

  // Create the start date
  const startDate = new Date(2024, 0, 1); // January 1st, 2024

  for (let i = 0; i < numOfSets; i++) {
    const line: LineProps = {
      name: getClusterUrl(),
      data: [],
    };

    const {
      trendStrength,
      trendDirection,
      seasonalAmplitude,
      seasonalFrequency,
      volatility,
      baseMultiplier,
    } = seriesParams[i];

    // Generate data points
    for (let j = 0; j < 60; j++) {
      const currentDate = new Date(startDate);
      currentDate.setMinutes(currentDate.getMinutes() + j);

      // Combine different components to create the final value
      const trend = getTrendValue(j, trendStrength, trendDirection as -1 | 1);
      const seasonal = getSeasonalValue(
        j,
        seasonalAmplitude,
        seasonalFrequency,
      );
      const noise = getNoise(baseValue, volatility);

      const value = Math.max(
        0,
        Math.round((baseValue + trend + seasonal + noise) * baseMultiplier),
      );

      line.data?.push([new Date(currentDate), value]);
    }

    data.push(line);
  }

  return data;
}
