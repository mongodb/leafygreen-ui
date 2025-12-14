import {
  DateType,
  LocaleString,
  Month,
  newUTC,
  SupportedLocales,
} from '@leafygreen-ui/date-utils';
import { renderHook } from '@leafygreen-ui/testing-lib';

import { useTimeSegmentsAndSelectUnit } from './useTimeSegmentsAndSelectUnit';
import { OnUpdateCallback } from './useTimeSegmentsAndSelectUnit.types';

const renderUseTimeSegmentsAndSelectUnitHook = ({
  initialDate,
  initialTimeZone = 'UTC',
  initialLocale = SupportedLocales.ISO_8601,
  callback,
}: {
  initialDate: DateType;
  initialTimeZone?: string;
  initialLocale?: LocaleString;
  callback?: OnUpdateCallback;
}) => {
  const { rerender: _rerender, ...rest } = renderHook(
    props =>
      useTimeSegmentsAndSelectUnit({
        date: props.date,
        locale: props.locale,
        timeZone: props.timeZone,
        options: { onUpdate: props.callback },
      }),
    {
      initialProps: {
        date: initialDate,
        locale: initialLocale,
        timeZone: initialTimeZone,
        callback,
      },
    },
  );

  // Rerender wrapper with defaults
  const rerender = (props: {
    date: DateType;
    locale?: LocaleString;
    timeZone?: string;
    callback?: OnUpdateCallback;
  }) =>
    _rerender({
      date: props.date,
      locale: props?.locale ?? initialLocale,
      timeZone: props?.timeZone ?? initialTimeZone,
      callback: props?.callback ?? callback,
    });

  return { rerender, ...rest };
};

describe('packages/time-input/hooks/useTimeSegmentsAndSelectUnit', () => {
  describe('initial render', () => {
    test('returns setter functions', () => {
      const testDate = newUTC(2023, Month.February, 20, 12, 0, 0);
      const callback = jest.fn();
      const { result } = renderUseTimeSegmentsAndSelectUnitHook({
        initialDate: testDate,
        callback,
      });

      const { segments, setSegment, setSelectUnit, selectUnit } =
        result.current;

      expect(segments).toBeDefined();
      expect(setSegment).toBeDefined();
      expect(setSelectUnit).toBeDefined();
      expect(selectUnit).toBeDefined();
    });

    describe('returns initial state in', () => {
      describe('UTC', () => {
        describe('returns segments object and setter functions', () => {
          test('24h format', () => {
            const testDate = newUTC(2023, Month.February, 20, 12, 0, 0);
            const callback = jest.fn();
            const { result } = renderUseTimeSegmentsAndSelectUnitHook({
              initialDate: testDate,
              callback,
            });

            const { segments } = result.current;

            expect(segments.hour).toEqual('12');
            expect(segments.minute).toEqual('00');
            expect(segments.second).toEqual('00');
          });
          test('12h format', () => {
            const testDate = newUTC(2023, Month.February, 20, 13, 0, 0);
            const callback = jest.fn();
            const { result } = renderUseTimeSegmentsAndSelectUnitHook({
              initialDate: testDate,
              initialLocale: SupportedLocales.en_US,
              callback,
            });

            const { segments, selectUnit } = result.current;

            expect(segments.hour).toEqual('01');
            expect(segments.minute).toEqual('00');
            expect(segments.second).toEqual('00');
            expect(selectUnit).toEqual({ displayName: 'PM', value: 'PM' });
          });
        });
      });

      describe('America/New_York', () => {
        describe('returns segments object and setter functions', () => {
          test('24h format', () => {
            const testDate = newUTC(2023, Month.February, 20, 12, 0, 0);
            const callback = jest.fn();
            const { result } = renderUseTimeSegmentsAndSelectUnitHook({
              initialDate: testDate,
              initialTimeZone: 'America/New_York',
              callback,
            });

            const { segments } = result.current;

            // 12:00 UTC = 07:00 EST (UTC-5)
            expect(segments.hour).toEqual('07');
            expect(segments.minute).toEqual('00');
            expect(segments.second).toEqual('00');
          });
          test('12h format', () => {
            const testDate = newUTC(2023, Month.February, 20, 20, 0, 0);
            const callback = jest.fn();
            const { result } = renderUseTimeSegmentsAndSelectUnitHook({
              initialDate: testDate,
              initialTimeZone: 'America/New_York',
              initialLocale: SupportedLocales.en_US,
              callback,
            });

            const { segments, selectUnit } = result.current;

            // 20:00 UTC = 03:00 PM EST (UTC-5)
            expect(segments.hour).toEqual('03');
            expect(segments.minute).toEqual('00');
            expect(segments.second).toEqual('00');
            expect(selectUnit).toEqual({ displayName: 'PM', value: 'PM' });
          });
        });
      });

      describe('Pacific/Auckland', () => {
        describe('returns segments object and setter functions', () => {
          test('24h format', () => {
            const testDate = newUTC(2023, Month.February, 20, 12, 0, 0);
            const callback = jest.fn();
            const { result } = renderUseTimeSegmentsAndSelectUnitHook({
              initialDate: testDate,
              initialTimeZone: 'Pacific/Auckland',
              callback,
            });

            const { segments } = result.current;

            // 12:00 UTC = 01:00 NZDT (UTC+13)
            expect(segments.hour).toEqual('01');
            expect(segments.minute).toEqual('00');
            expect(segments.second).toEqual('00');
          });
          test('12h format', () => {
            const testDate = newUTC(2023, Month.February, 20, 13, 0, 0);
            const callback = jest.fn();
            const { result } = renderUseTimeSegmentsAndSelectUnitHook({
              initialDate: testDate,
              initialTimeZone: 'Pacific/Auckland',
              initialLocale: SupportedLocales.en_US,
              callback,
            });

            const { segments, selectUnit } = result.current;

            // 13:00 UTC = 02:00 AM NZDT (UTC+13)
            expect(segments.hour).toEqual('02');
            expect(segments.minute).toEqual('00');
            expect(segments.second).toEqual('00');
            expect(selectUnit).toEqual({ displayName: 'AM', value: 'AM' });
          });
        });
      });
    });

    test('returns empty segments when date is null', () => {
      const callback = jest.fn();
      const { result } = renderUseTimeSegmentsAndSelectUnitHook({
        initialDate: null,
        callback,
      });

      const { segments } = result.current;

      expect(segments.hour).toEqual('');
      expect(segments.minute).toEqual('');
      expect(segments.second).toEqual('');
    });

    test('returns empty segments when date is invalid', () => {
      const invalidDate = new Date('invalid');
      const callback = jest.fn();
      const { result } = renderUseTimeSegmentsAndSelectUnitHook({
        initialDate: invalidDate,
        callback,
      });

      const { segments } = result.current;

      expect(segments.hour).toEqual('');
      expect(segments.minute).toEqual('');
      expect(segments.second).toEqual('');
    });
  });

  describe('re-rendering', () => {
    describe('with a valid value', () => {
      describe('UTC', () => {
        test('24h format', () => {
          const testDate = newUTC(2023, Month.February, 20, 12, 0, 0);
          const callback = jest.fn();
          const { result, rerender } = renderUseTimeSegmentsAndSelectUnitHook({
            initialDate: testDate,
            callback,
          });

          const { segments } = result.current;

          expect(segments.hour).toEqual('12');
          expect(segments.minute).toEqual('00');
          expect(segments.second).toEqual('00');

          rerender({
            date: newUTC(2023, Month.February, 20, 13, 0, 0),
            callback,
          });

          expect(callback).toHaveBeenCalledWith(
            expect.objectContaining({
              newSegments: expect.objectContaining({
                hour: '13',
                minute: '00',
                second: '00',
              }),
              newSelectUnit: expect.objectContaining({
                displayName: 'AM',
                value: 'AM',
              }),
              prevSegments: expect.objectContaining({
                hour: '12',
                minute: '00',
                second: '00',
              }),
              prevSelectUnit: expect.objectContaining({
                displayName: 'AM',
                value: 'AM',
              }),
            }),
          );
        });
        test('12h format', () => {
          const testDate = newUTC(2023, Month.February, 20, 11, 0, 0);
          const callback = jest.fn();
          const { result, rerender } = renderUseTimeSegmentsAndSelectUnitHook({
            initialDate: testDate,
            initialLocale: SupportedLocales.en_US,
            callback,
          });

          const { segments, selectUnit } = result.current;

          expect(segments.hour).toEqual('11');
          expect(segments.minute).toEqual('00');
          expect(segments.second).toEqual('00');
          expect(selectUnit).toEqual({ displayName: 'AM', value: 'AM' });

          rerender({
            date: newUTC(2023, Month.February, 20, 13, 0, 0),
            callback,
          });

          expect(callback).toHaveBeenCalledWith(
            expect.objectContaining({
              newSegments: expect.objectContaining({
                hour: '01',
                minute: '00',
                second: '00',
              }),
              newSelectUnit: expect.objectContaining({
                displayName: 'PM',
                value: 'PM',
              }),
              prevSegments: expect.objectContaining({
                hour: '11',
                minute: '00',
                second: '00',
              }),
              prevSelectUnit: expect.objectContaining({
                displayName: 'AM',
                value: 'AM',
              }),
            }),
          );
        });
      });

      describe('America/New_York', () => {
        test('24h format', () => {
          const testDate = newUTC(2023, Month.February, 20, 12, 0, 0);
          const callback = jest.fn();
          const { result, rerender } = renderUseTimeSegmentsAndSelectUnitHook({
            initialDate: testDate,
            initialTimeZone: 'America/New_York',
            callback,
          });

          const { segments } = result.current;

          // 12:00 UTC = 07:00 EST (UTC-5)
          expect(segments.hour).toEqual('07');
          expect(segments.minute).toEqual('00');
          expect(segments.second).toEqual('00');

          rerender({
            date: newUTC(2023, Month.February, 20, 13, 0, 0),
            callback,
          });

          // 13:00 UTC = 08:00 EST (UTC-5)
          expect(callback).toHaveBeenCalledWith(
            expect.objectContaining({
              newSegments: expect.objectContaining({
                hour: '08',
                minute: '00',
                second: '00',
              }),
              newSelectUnit: expect.objectContaining({
                displayName: 'AM',
                value: 'AM',
              }),
              prevSegments: expect.objectContaining({
                hour: '07',
                minute: '00',
                second: '00',
              }),
              prevSelectUnit: expect.objectContaining({
                displayName: 'AM',
                value: 'AM',
              }),
            }),
          );
        });
        test('12h format', () => {
          // 16:00 UTC = 11:00 AM EST (UTC-5)
          const testDate = newUTC(2023, Month.February, 20, 16, 0, 0);
          const callback = jest.fn();
          const { result, rerender } = renderUseTimeSegmentsAndSelectUnitHook({
            initialDate: testDate,
            initialTimeZone: 'America/New_York',
            initialLocale: SupportedLocales.en_US,
            callback,
          });

          const { segments, selectUnit } = result.current;

          expect(segments.hour).toEqual('11');
          expect(segments.minute).toEqual('00');
          expect(segments.second).toEqual('00');
          expect(selectUnit).toEqual({ displayName: 'AM', value: 'AM' });

          rerender({
            date: newUTC(2023, Month.February, 20, 18, 0, 0),
            callback,
          });

          // 18:00 UTC = 01:00 PM EST (UTC-5)
          expect(callback).toHaveBeenCalledWith(
            expect.objectContaining({
              newSegments: expect.objectContaining({
                hour: '01',
                minute: '00',
                second: '00',
              }),
              newSelectUnit: expect.objectContaining({
                displayName: 'PM',
                value: 'PM',
              }),
              prevSegments: expect.objectContaining({
                hour: '11',
                minute: '00',
                second: '00',
              }),
              prevSelectUnit: expect.objectContaining({
                displayName: 'AM',
                value: 'AM',
              }),
            }),
          );
        });
      });

      describe('Pacific/Auckland', () => {
        test('24h format', () => {
          const testDate = newUTC(2023, Month.February, 20, 12, 0, 0);
          const callback = jest.fn();
          const { result, rerender } = renderUseTimeSegmentsAndSelectUnitHook({
            initialDate: testDate,
            initialTimeZone: 'Pacific/Auckland',
            callback,
          });

          const { segments } = result.current;

          // 12:00 UTC = 01:00 NZDT (UTC+13)
          expect(segments.hour).toEqual('01');
          expect(segments.minute).toEqual('00');
          expect(segments.second).toEqual('00');

          rerender({
            date: newUTC(2023, Month.February, 20, 13, 0, 0),
            callback,
          });

          // 13:00 UTC = 02:00 NZDT (UTC+13)
          expect(callback).toHaveBeenCalledWith(
            expect.objectContaining({
              newSegments: expect.objectContaining({
                hour: '02',
                minute: '00',
                second: '00',
              }),
              newSelectUnit: expect.objectContaining({
                displayName: 'AM',
                value: 'AM',
              }),
              prevSegments: expect.objectContaining({
                hour: '01',
                minute: '00',
                second: '00',
              }),
              prevSelectUnit: expect.objectContaining({
                displayName: 'AM',
                value: 'AM',
              }),
            }),
          );
        });
        test('12h format', () => {
          // 22:00 UTC Feb 20 = 11:00 AM NZDT Feb 21 (UTC+13)
          const testDate = newUTC(2023, Month.February, 20, 22, 0, 0);
          const callback = jest.fn();
          const { result, rerender } = renderUseTimeSegmentsAndSelectUnitHook({
            initialDate: testDate,
            initialTimeZone: 'Pacific/Auckland',
            initialLocale: SupportedLocales.en_US,
            callback,
          });

          const { segments, selectUnit } = result.current;

          expect(segments.hour).toEqual('11');
          expect(segments.minute).toEqual('00');
          expect(segments.second).toEqual('00');
          expect(selectUnit).toEqual({ displayName: 'AM', value: 'AM' });

          rerender({
            // 00:00 UTC Feb 21 = 01:00 PM NZDT Feb 21 (UTC+13)
            date: newUTC(2023, Month.February, 21, 0, 0, 0),
            callback,
          });

          expect(callback).toHaveBeenCalledWith(
            expect.objectContaining({
              newSegments: expect.objectContaining({
                hour: '01',
                minute: '00',
                second: '00',
              }),
              newSelectUnit: expect.objectContaining({
                displayName: 'PM',
                value: 'PM',
              }),
              prevSegments: expect.objectContaining({
                hour: '11',
                minute: '00',
                second: '00',
              }),
              prevSelectUnit: expect.objectContaining({
                displayName: 'AM',
                value: 'AM',
              }),
            }),
          );
        });
      });
    });
    describe('with a null value', () => {
      test('calls callback with empty segments', () => {
        const testDate = newUTC(2023, Month.February, 20, 12, 0, 0);
        const callback = jest.fn();
        const { result, rerender } = renderUseTimeSegmentsAndSelectUnitHook({
          initialDate: testDate,
          callback,
        });

        const { segments } = result.current;

        expect(segments.hour).toEqual('12');
        expect(segments.minute).toEqual('00');
        expect(segments.second).toEqual('00');

        rerender({
          date: null,
          callback,
        });

        expect(callback).toHaveBeenCalledWith(
          expect.objectContaining({
            newSegments: expect.objectContaining({
              hour: '',
              minute: '',
              second: '',
            }),
            newSelectUnit: expect.objectContaining({
              displayName: 'AM',
              value: 'AM',
            }),
            prevSegments: expect.objectContaining({
              hour: '12',
              minute: '00',
              second: '00',
            }),
            prevSelectUnit: expect.objectContaining({
              displayName: 'AM',
              value: 'AM',
            }),
          }),
        );
      });
    });
    describe('with an invalid Date value', () => {
      test('calls callback with previous segments', () => {
        const testDate = newUTC(2023, Month.February, 20, 12, 0, 0);
        const callback = jest.fn();
        const { result, rerender } = renderUseTimeSegmentsAndSelectUnitHook({
          initialDate: testDate,
          callback,
        });

        const { segments } = result.current;

        expect(segments.hour).toEqual('12');
        expect(segments.minute).toEqual('00');
        expect(segments.second).toEqual('00');

        rerender({
          date: new Date('invalid'),
          callback,
        });

        expect(callback).toHaveBeenCalledWith(
          expect.objectContaining({
            newSegments: expect.objectContaining({
              hour: '12',
              minute: '00',
              second: '00',
            }),
            newSelectUnit: expect.objectContaining({
              displayName: 'AM',
              value: 'AM',
            }),
            prevSegments: expect.objectContaining({
              hour: '12',
              minute: '00',
              second: '00',
            }),
            prevSelectUnit: expect.objectContaining({
              displayName: 'AM',
              value: 'AM',
            }),
          }),
        );
      });
    });
  });

  describe('setSegment', () => {
    test('calls callback when setSegment is called', () => {
      const testDate = newUTC(2023, Month.February, 20, 12, 0, 0);
      const callback = jest.fn();
      const { result } = renderUseTimeSegmentsAndSelectUnitHook({
        initialDate: testDate,
        callback,
      });

      result.current.setSegment('hour', '13');

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          newSegments: expect.objectContaining({
            hour: '13',
            minute: '00',
            second: '00',
          }),
          newSelectUnit: expect.objectContaining({
            displayName: 'AM',
            value: 'AM',
          }),
          prevSegments: expect.objectContaining({
            hour: '12',
            minute: '00',
            second: '00',
          }),
          prevSelectUnit: expect.objectContaining({
            displayName: 'AM',
            value: 'AM',
          }),
        }),
      );
    });
  });

  describe('setSelectUnit', () => {
    test('calls callback when setSelectUnit is called', () => {
      const testDate = newUTC(2023, Month.February, 20, 12, 0, 0);
      const callback = jest.fn();
      const { result } = renderUseTimeSegmentsAndSelectUnitHook({
        initialDate: testDate,
        callback,
        initialLocale: SupportedLocales.en_US,
      });

      result.current.setSelectUnit({ displayName: 'AM', value: 'AM' });

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          newSegments: expect.objectContaining({
            hour: '12',
            minute: '00',
            second: '00',
          }),
          newSelectUnit: expect.objectContaining({
            displayName: 'AM',
            value: 'AM',
          }),
          prevSegments: expect.objectContaining({
            hour: '12',
            minute: '00',
            second: '00',
          }),
          prevSelectUnit: expect.objectContaining({
            displayName: 'PM',
            value: 'PM',
          }),
        }),
      );
    });
  });
});
