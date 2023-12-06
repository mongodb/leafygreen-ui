import timezoneMock, { TimeZone } from 'timezone-mock';

/**
 * Mocks the `timeZone` returned from the `Intl.DateTimeFormat`,
 * and the `getTimeZoneOffset` returned from `Date`
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

  const realDTFOptions = Intl.DateTimeFormat().resolvedOptions();

  /** DTF.resolvedOptions */
  global.Intl.DateTimeFormat.prototype.resolvedOptions = jest
    .fn()
    .mockImplementation(() => ({
      ...realDTFOptions,
      timeZone,
    }));

  /** getTimezoneOffset */
  global.Date.prototype.getTimezoneOffset = jest
    .fn()
    .mockImplementation(() => UTCOffset * 60);

  /** getDate */
  global.Date.prototype.getDate = jest
    .fn()
    .mockImplementation(function getDate() {
      /// @ts-expect-error - typeof `this` is unknown
      const utcDate: number = (this as Date).getUTCDate();
      /// @ts-expect-error - typeof `this` is unknown
      const utcHrs: number = (this as Date).getUTCHours();

      const adjustedHr = utcHrs + UTCOffset;
      const daysOffset = adjustedHr >= 24 ? 1 : adjustedHr < 0 ? -1 : 0;
      return utcDate + daysOffset;
    });

  /** getHours */
  global.Date.prototype.getHours = jest
    .fn()
    .mockImplementation(function getHours() {
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
    });
};
