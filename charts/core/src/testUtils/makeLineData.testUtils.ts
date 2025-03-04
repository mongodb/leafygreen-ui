import { faker } from '@faker-js/faker';

import { LineProps } from '../Line/Line.types';

/**
 * Generates consistent but realistic-looking test data for storybook
 */

// Create a seeded faker instance
faker.seed(123);

// Simple deterministic pseudo-random number generator
function seededRandom(seed: number): number {
  // Using a simple LCG algorithm for deterministic randomness
  const a = 1664525;
  const c = 1013904223;
  const m = Math.pow(2, 32);

  // Calculate next value based on seed
  const result = (a * seed + c) % m;

  // Return normalized result between 0 and 1
  return result / m;
}

// Helper function to generate a trend component with realistic variations
function getTrendValue(
  index: number,
  strength: number,
  direction: 1 | -1,
  seed: number,
) {
  // Base trend
  const baseTrend = (index * strength * direction) / 100;

  // Add some micro-trends for realism
  const microTrend = Math.sin(index * seededRandom(seed * 13)) * strength * 0.2;

  return baseTrend + microTrend;
}

// Helper function to generate seasonal patterns with realistic variations
function getSeasonalValue(
  index: number,
  amplitude: number,
  frequency: number,
  seed: number,
) {
  // Primary seasonal component
  const primary = amplitude * Math.sin((index * 2 * Math.PI) / frequency);

  // Secondary seasonal component (higher frequency, lower amplitude)
  const secondary =
    amplitude *
    0.3 *
    Math.sin(
      (index * 2 * Math.PI) / (frequency * 0.25 + seededRandom(seed * 7) * 0.2),
    );

  return primary + secondary;
}

// Helper function to add noise to the data
function getNoise(baseValue: number, volatility: number, seedOffset: number) {
  // Multiple noise frequencies combined for more natural-looking noise
  const primaryNoise = Math.sin(seedOffset * 0.1) * volatility;
  const secondaryNoise = Math.cos(seedOffset * 0.5) * (volatility * 0.7);
  const tertiaryNoise = Math.sin(seedOffset * 1.1 + 0.4) * (volatility * 0.4);

  return primaryNoise + secondaryNoise + tertiaryNoise;
}

// Generate MongoDB Atlas style shard URLs in a deterministic way
function getClusterUrl(index: number): string {
  // Use the index to create deterministic values with more variation
  const clusterNumber = Math.floor(seededRandom(index * 941) * 10);
  const shardSet = Math.floor(seededRandom(index * 347) * 3)
    .toString()
    .padStart(2, '0');
  const shardInstance = Math.floor(seededRandom(index * 773) * 3)
    .toString()
    .padStart(2, '0');
  const port = 27017; // Standard MongoDB port

  return `cluster${clusterNumber}-shard-${shardSet}-${shardInstance}...${port}`;
}

// Generate a repeatable but variable spike in the data
function getSpike(
  index: number,
  maxHeight: number,
  position: number,
  width: number,
): number {
  const distance = Math.abs(index - position);
  if (distance > width) return 0;

  // Bell curve for the spike
  return (
    maxHeight *
    Math.exp(-(Math.pow(distance, 2) / (2 * Math.pow(width / 2, 2))))
  );
}

// Pre-generate all series parameters deterministically with more variability
const generateSeriesParams = (count: number) => {
  const params = [];

  for (let i = 0; i < count; i++) {
    // Use the seededRandom to create more natural-looking variation
    const seed = i * 1000 + 123;

    // Create random-looking spike positions
    const spikePositions = [];
    const numberOfSpikes = Math.floor(seededRandom(seed * 3.7) * 3) + 1; // 1-3 spikes

    for (let j = 0; j < numberOfSpikes; j++) {
      spikePositions.push({
        position: Math.floor(seededRandom(seed + j * 100) * 55) + 3, // Position between 3-58
        height: seededRandom(seed + j * 200) * 400 + 100, // Height between 100-500
        width: seededRandom(seed + j * 300) * 6 + 2, // Width between 2-8
      });
    }

    params.push({
      trendStrength: 5 + Math.floor(seededRandom(seed) * 46), // Values between 5-50
      trendDirection: seededRandom(seed + 50) > 0.5 ? 1 : (-1 as 1 | -1),
      seasonalAmplitude: 40 + Math.floor(seededRandom(seed + 100) * 161), // Values between 40-200
      seasonalFrequency: 8 + Math.floor(seededRandom(seed + 150) * 23), // Values between 8-30
      volatility: 15 + Math.floor(seededRandom(seed + 200) * 66), // Values between 15-80
      baseMultiplier: 0.75 + seededRandom(seed + 250) * 0.5, // Values between 0.75-1.25
      baseOffset: seededRandom(seed + 300) * 200 - 100, // Offset between -100 and 100
      spikes: spikePositions,
      seed: seed, // Store the seed for use in data generation
    });
  }

  return params;
};

export function makeLineData(numOfSets: number): Array<LineProps> {
  const data: Array<LineProps> = [];
  const baseValue = 1000; // Base value for all series

  // Generate deterministic series parameters
  const seriesParams = generateSeriesParams(numOfSets);

  // Create the start date
  const startDate = new Date(2024, 0, 1); // January 1st, 2024

  for (let i = 0; i < numOfSets; i++) {
    const line: LineProps = {
      name: getClusterUrl(i),
      data: [],
    };

    const {
      trendStrength,
      trendDirection,
      seasonalAmplitude,
      seasonalFrequency,
      volatility,
      baseMultiplier,
      baseOffset,
      spikes,
      seed,
    } = seriesParams[i];

    // Generate data points
    for (let j = 0; j < 60; j++) {
      const currentDate = new Date(startDate);
      currentDate.setMinutes(currentDate.getMinutes() + j);

      // Combine different components to create a more realistic-looking final value
      const trend = getTrendValue(j, trendStrength, trendDirection, seed + j);
      const seasonal = getSeasonalValue(
        j,
        seasonalAmplitude,
        seasonalFrequency,
        seed + j * 2,
      );
      const noise = getNoise(baseValue, volatility, i * 100 + j * 3);

      // Add occasional spikes for more realistic patterns
      let spikeValue = 0;

      for (const spike of spikes) {
        spikeValue += getSpike(j, spike.height, spike.position, spike.width);
      }

      // Combine all components with a touch of randomness in weighting
      const value = Math.max(
        0,
        Math.round(
          (baseValue + baseOffset + trend + seasonal + noise + spikeValue) *
            baseMultiplier,
        ),
      );

      line.data?.push([new Date(currentDate), value]);
    }

    data.push(line);
  }

  return data;
}
