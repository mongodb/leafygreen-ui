import { padStart } from 'lodash';
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

  jest
    .spyOn(global.Date.prototype, 'toLocaleDateString')
    .mockImplementation(mockToLocaleDateString);

  jest
    .spyOn(global.Date.prototype, 'toLocaleTimeString')
    .mockImplementation(mockToLocaleTimeString);

  jest
    .spyOn(global.Date.prototype, 'toLocaleString')
    .mockImplementation(mockToLocaleString);

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

  function mockToLocaleDateString() {
    /// @ts-expect-error - typeof `this` is unknown
    const _this = this as Date;

    return (
      String(_this.getMonth() + 1) +
      '/' +
      String(mockGetDate.call(_this)) +
      '/' +
      String(_this.getFullYear())
    );
  }

  function mockToLocaleTimeString() {
    /// @ts-expect-error - typeof `this` is unknown
    const _this = this as Date;
    const hrs = mockGetHours.call(_this);
    return (
      String(hrs % 12) +
      ':' +
      padStart(String(_this.getMinutes()), 2, '0') +
      ':' +
      padStart(String(_this.getSeconds()), 2, '0') +
      ' ' +
      String(hrs > 12 ? 'PM' : 'AM')
    );
  }

  function mockToLocaleString() {
    /// @ts-expect-error - typeof `this` is unknown
    const _this = this as Date;

    return (
      mockToLocaleDateString.call(_this) +
      ', ' +
      mockToLocaleTimeString.call(_this)
    );
  }
};
