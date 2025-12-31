import { jest } from '@jest/globals';

import { consoleOnce } from '@leafygreen-ui/lib';

import { getMinMax } from './getMinMax';

describe('packages/date-utils/getMinMax', () => {
  const componentName = 'TestComponent';

  let consoleErrorSpy: jest.SpiedFunction<typeof consoleOnce.error>;

  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(consoleOnce, 'error')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('date only', () => {
    const defaultMin = new Date('2020-01-01');
    const defaultMax = new Date('2025-12-31');
    describe('when both min and max are provided', () => {
      test('returns [min, max] when max is after min', () => {
        const min = new Date('2021-01-01');
        const max = new Date('2022-12-31');

        const result = getMinMax({
          min,
          max,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([min, max]);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });

      test('returns [min, max] when max equals min', () => {
        const min = new Date('2021-01-01');
        const max = new Date('2021-01-01');

        const result = getMinMax({
          min,
          max,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([min, max]);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });

      test('returns defaults and logs error when max is before min', () => {
        const min = new Date('2022-12-31');
        const max = new Date('2021-01-01');

        const result = getMinMax({
          min,
          max,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([defaultMin, defaultMax]);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            `LeafyGreen ${componentName}: Provided max date (2021-01-01) is before provided min date (2022-12-31). Using default values.`,
          ),
        );
      });
    });

    describe('when only min is provided', () => {
      test('returns [min, defaultMax] when min is before defaultMax', () => {
        const min = new Date('2023-06-15');

        const result = getMinMax({
          min,
          max: null,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([min, defaultMax]);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });

      test('returns [min, defaultMax] when min equals defaultMax', () => {
        const min = new Date('2025-12-31');

        const result = getMinMax({
          min,
          max: null,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([min, defaultMax]);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });

      test('returns defaults and logs error when min is after defaultMax', () => {
        const min = new Date('2026-01-01');

        const result = getMinMax({
          min,
          max: null,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([defaultMin, defaultMax]);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            `LeafyGreen ${componentName}: Provided min date (2026-01-01) is after the default max date (2025-12-31). Using default values.`,
          ),
        );
      });
    });

    describe('when only max is provided', () => {
      test('returns [defaultMin, max] when max is after defaultMin', () => {
        const max = new Date('2023-06-15');

        const result = getMinMax({
          min: null,
          max,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([defaultMin, max]);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });

      test('returns [defaultMin, max] when max equals defaultMin', () => {
        const max = new Date('2020-01-01');

        const result = getMinMax({
          min: null,
          max,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([defaultMin, max]);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });

      test('returns defaults and logs error when max is before defaultMin', () => {
        const max = new Date('2019-12-31');

        const result = getMinMax({
          min: null,
          max,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([defaultMin, defaultMax]);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            `LeafyGreen ${componentName}: Provided max date (2019-12-31) is before the default min date (2020-01-01). Using default values.`,
          ),
        );
      });
    });
  });

  describe('date and time ', () => {
    const defaultMin = new Date('2026-02-20T02:30:00Z');
    const defaultMax = new Date('2026-02-20T22:00:00Z');
    describe('when both min and max are provided', () => {
      test('returns [min, max] when max is after min', () => {
        const min = new Date('2026-02-20T03:30:00Z');
        const max = new Date('2026-02-20T21:00:00Z');

        const result = getMinMax({
          min,
          max,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([min, max]);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });

      test('returns [min, max] when max equals min', () => {
        const min = new Date('2026-02-20T03:30:00Z');
        const max = new Date('2026-02-20T03:30:00Z');

        const result = getMinMax({
          min,
          max,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([min, max]);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });

      test('returns defaults and logs error when max is before min', () => {
        const min = new Date('2026-02-20T22:00:00Z');
        const max = new Date('2026-02-20T02:30:00Z');

        const result = getMinMax({
          min,
          max,
          defaultMin,
          defaultMax,
          componentName,
          logMessage: 'time',
        });

        expect(result).toEqual([defaultMin, defaultMax]);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            `LeafyGreen ${componentName}: Provided max time (02:30:00.000Z) is before provided min time (22:00:00.000Z). Using default values.`,
          ),
        );
      });
    });

    describe('when only min is provided', () => {
      test('returns [min, defaultMax] when min is before defaultMax', () => {
        const min = new Date('2026-02-20T04:30:00Z');

        const result = getMinMax({
          min,
          max: null,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([min, defaultMax]);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });

      test('returns [min, defaultMax] when min equals defaultMax', () => {
        const min = defaultMax;

        const result = getMinMax({
          min,
          max: null,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([min, defaultMax]);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });

      test('returns defaults and logs error when min is after defaultMax', () => {
        const min = new Date('2026-02-20T23:00:00Z');

        const result = getMinMax({
          min,
          max: null,
          defaultMin,
          defaultMax,
          componentName,
          logMessage: 'time',
        });

        expect(result).toEqual([defaultMin, defaultMax]);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            `LeafyGreen ${componentName}: Provided min time (23:00:00.000Z) is after the default max time (22:00:00.000Z). Using default values.`,
          ),
        );
      });
    });

    describe('when only max is provided', () => {
      test('returns [defaultMin, max] when max is after defaultMin', () => {
        const max = new Date('2026-02-20T05:30:00Z');

        const result = getMinMax({
          min: null,
          max,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([defaultMin, max]);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });

      test('returns [defaultMin, max] when max equals defaultMin', () => {
        const max = defaultMin;

        const result = getMinMax({
          min: null,
          max,
          defaultMin,
          defaultMax,
          componentName,
        });

        expect(result).toEqual([defaultMin, max]);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });

      test('returns defaults and logs error when max is before defaultMin', () => {
        const max = new Date('2026-02-20T01:30:00Z');

        const result = getMinMax({
          min: null,
          max,
          defaultMin,
          defaultMax,
          componentName,
          logMessage: 'time',
        });

        expect(result).toEqual([defaultMin, defaultMax]);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            `LeafyGreen ${componentName}: Provided max time (01:30:00.000Z) is before the default min time (02:30:00.000Z). Using default values.`,
          ),
        );
      });
    });
  });

  describe('when neither min nor max is provided', () => {
    test('returns defaults', () => {
      const defaultMin = new Date('2020-01-01');
      const defaultMax = new Date('2025-12-31');
      const result = getMinMax({
        min: null,
        max: null,
        defaultMin,
        defaultMax,
        componentName,
      });

      expect(result).toEqual([defaultMin, defaultMax]);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });
});
