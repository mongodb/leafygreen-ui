import { Month } from '../constants';

import { isTodayTZ } from '.';

describe('packages/date-utils/isTodayTZ', () => {
  const utc25 = new Date(Date.UTC(2023, Month.December, 25, 0, 0, 0));

  describe('NYC Client', () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(
        // 23:00 on Dec. 25 in NYC
        new Date(Date.UTC(2023, Month.December, 26, 4, 0, 0)),
      );
    });

    test('Pacific/Honolulu', () => {
      const isToday = isTodayTZ(utc25, 'Pacific/Honolulu');
      expect(isToday).toBe(true);
    });

    test('America/New_York', () => {
      const isToday = isTodayTZ(utc25, 'America/New_York');
      expect(isToday).toBe(true);
    });

    test('Europe/London', () => {
      const isToday = isTodayTZ(utc25, 'Europe/London');
      expect(isToday).toBe(false);
    });

    test('Pacific/Auckland', () => {
      const isToday = isTodayTZ(utc25, 'Pacific/Auckland');
      expect(isToday).toBe(false);
    });
  });

  describe('Honolulu Client', () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(
        // 23:00 on Dec. 25 in HNL
        new Date(Date.UTC(2023, Month.December, 26, 9, 0, 0)),
      );
    });
    test('Pacific/Honolulu', () => {
      const isToday = isTodayTZ(utc25, 'Pacific/Honolulu');
      expect(isToday).toBe(true);
    });

    test('America/New_York', () => {
      const isToday = isTodayTZ(utc25, 'America/New_York');
      expect(isToday).toBe(false);
    });

    test('Europe/London', () => {
      const isToday = isTodayTZ(utc25, 'Europe/London');
      expect(isToday).toBe(false);
    });

    test('Pacific/Auckland', () => {
      const isToday = isTodayTZ(utc25, 'Pacific/Auckland');
      expect(isToday).toBe(false);
    });
  });

  describe('London Client', () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(
        // 23:00 on Dec. 25 in LDN
        new Date(Date.UTC(2023, Month.December, 25, 23, 0, 0)),
      );
    });

    test('America/New_York', () => {
      const isToday = isTodayTZ(utc25, 'America/New_York');
      expect(isToday).toBe(true);
    });

    test('Pacific/Honolulu', () => {
      const isToday = isTodayTZ(utc25, 'Pacific/Honolulu');
      expect(isToday).toBe(true);
    });

    test('Europe/London', () => {
      const isToday = isTodayTZ(utc25, 'Europe/London');
      expect(isToday).toBe(true);
    });

    test('Pacific/Auckland', () => {
      const isToday = isTodayTZ(utc25, 'Pacific/Auckland');
      expect(isToday).toBe(false);
    });
  });

  describe('Auckland Client', () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(
        // 00:00 on Dec. 25 in AKL
        new Date(Date.UTC(2023, Month.December, 24, 12, 0, 0)),
      );
    });

    test('America/New_York', () => {
      const isToday = isTodayTZ(utc25, 'America/New_York');
      expect(isToday).toBe(false);
    });

    test('Pacific/Honolulu', () => {
      const isToday = isTodayTZ(utc25, 'Pacific/Honolulu');
      expect(isToday).toBe(false);
    });

    test('Europe/London', () => {
      const isToday = isTodayTZ(utc25, 'Europe/London');
      expect(isToday).toBe(false);
    });

    test('Pacific/Auckland', () => {
      const isToday = isTodayTZ(utc25, 'Pacific/Auckland');
      expect(isToday).toBe(true);
    });
  });
});
