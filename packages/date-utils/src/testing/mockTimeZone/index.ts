import timezoneMock, { type TimeZone } from 'timezone-mock';

/**
 * Mocks the `timeZone` returned from the `Intl.DateTimeFormat`,
 * and various `get*` methods on the `Date` prototype
 * @param timeZone IANA time zone string
 * @param UTCOffset UTC offset (in hours)
 */
export const mockTimeZone = (timeZone: string, UTCOffset: number) => {
  timezoneMock.register(
    `Etc/GMT${UTCOffset >= 0 ? '+' : ''}${UTCOffset}` as TimeZone,
    {
      Date,
    },
  );

  const DTFResolved = Intl.DateTimeFormat().resolvedOptions();

  /** DTF.resolvedOptions */
  jest
    .spyOn(global.Intl.DateTimeFormat.prototype, 'resolvedOptions')
    .mockImplementation(() => ({
      ...DTFResolved,
      timeZone,
    }));

  /** getTimezoneOffset */
  jest
    .spyOn(global.Date.prototype, 'getTimezoneOffset')
    .mockImplementation(() => UTCOffset * 60);

  /** getDate */
  jest.spyOn(global.Date.prototype, 'getDate').mockImplementation(mockGetDate);

  /** getHours */
  jest
    .spyOn(global.Date.prototype, 'getHours')
    .mockImplementation(mockGetHours);

  /**
   * MOCK FUNCTIONS
   * */
  function mockGetDate() {
    /// @ts-expect-error - typeof `this` is unknown
    const utcDate: number = (this as Date).getUTCDate();
    /// @ts-expect-error - typeof `this` is unknown
    const utcHrs: number = (this as Date).getUTCHours();

    const adjustedHr = utcHrs + UTCOffset;
    const daysOffset = adjustedHr >= 24 ? 1 : adjustedHr < 0 ? -1 : 0;
    return utcDate + daysOffset;
  }

  function mockGetHours() {
    /// @ts-expect-error - typeof `this` is unknown
    const utcHrs: number = (this as Date).getUTCHours();
    const adjustedHrs = utcHrs + UTCOffset;
    const hours =
      adjustedHrs >= 24
        ? adjustedHrs % 24
        : adjustedHrs < 0
        ? adjustedHrs + 24
        : adjustedHrs;

    return hours;
  }
};
