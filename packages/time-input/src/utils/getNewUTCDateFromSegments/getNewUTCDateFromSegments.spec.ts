import { Month } from '@leafygreen-ui/date-utils';

import { getNewUTCDateFromSegments } from './getNewUTCDateFromSegments';

describe('getNewUTCDateFromSegments', () => {
  describe('When all segments are filled and valid, a valid date is returned', () => {
    describe('UTC (UTC+0)', () => {
      describe('12h format', () => {
        describe('PM', () => {
          test('returns the UTC date', () => {
            const segments = {
              hour: '11',
              minute: '00',
              second: '00',
            };
            const newDate = getNewUTCDateFromSegments({
              segments,
              is12HourFormat: true,
              timeZone: 'UTC',
              dayPeriod: 'PM',
              dateValues: {
                day: '20',
                month: '02',
                year: '2026',
              },
            }); // February 20, 2026 11:00:00 PM

            // February 20, 2026 11:00:00 PM in UTC is February 20, 2026 23:00:00 UTC
            expect(newDate).toEqual(
              new Date(Date.UTC(2026, Month.February, 20, 23, 0, 0)),
            );
          });
        });
        describe('AM', () => {
          test('returns the UTC date', () => {
            const segments = {
              hour: '11',
              minute: '00',
              second: '00',
            };
            const newDate = getNewUTCDateFromSegments({
              segments,
              is12HourFormat: true,
              timeZone: 'UTC',
              dayPeriod: 'AM',
              dateValues: {
                day: '20',
                month: '02',
                year: '2026',
              },
            }); // February 20, 2026 11:00:00 AM

            // February 20, 2026 11:00:00 AM in UTC is February 20, 2026 11:00:00 UTC
            expect(newDate).toEqual(
              new Date(Date.UTC(2026, Month.February, 20, 11, 0, 0)),
            );
          });
        });
      });
      describe('24h format', () => {});
    });

    describe('America/New_York', () => {
      describe('EST (UTC-5)', () => {
        describe('12h format', () => {
          describe('PM', () => {
            test('returns the UTC date', () => {
              const segments = {
                hour: '11',
                minute: '00',
                second: '00',
              };
              const newDate = getNewUTCDateFromSegments({
                segments,
                is12HourFormat: true,
                timeZone: 'America/New_York',
                dayPeriod: 'PM',
                dateValues: {
                  day: '20',
                  month: '02',
                  year: '2026',
                },
              }); // February 20, 2026 11:00:00 PM America/New_York

              // February 20, 2026 11:00:00 PM in America/New_York is February 21, 2026 04:00:00 UTC
              expect(newDate).toEqual(
                new Date(Date.UTC(2026, Month.February, 21, 4, 0, 0)),
              );
            });
          });
          describe('AM', () => {
            test('returns the UTC date', () => {
              const segments = {
                hour: '11',
                minute: '00',
                second: '00',
              };
              const newDate = getNewUTCDateFromSegments({
                segments,
                is12HourFormat: true,
                timeZone: 'America/New_York',
                dayPeriod: 'AM',
                dateValues: {
                  day: '20',
                  month: '02',
                  year: '2026',
                },
              }); // February 20, 2026 11:00:00 AM America/New_York

              // February 20, 2026 11:00:00 AM in America/New_York is February 20, 2026 16:00:00 UTC
              expect(newDate).toEqual(
                new Date(Date.UTC(2026, Month.February, 20, 16, 0, 0)),
              );
            });
          });
        });
        describe('24h format', () => {
          test('returns the UTC date', () => {
            const segments = {
              hour: '14',
              minute: '00',
              second: '00',
            };
            const newDate = getNewUTCDateFromSegments({
              segments,
              is12HourFormat: false,
              timeZone: 'America/New_York',
              dayPeriod: 'AM', // This is not used for 24h format
              dateValues: {
                day: '20',
                month: '02',
                year: '2026',
              },
            }); // February 20, 2026 14:00:00 America/New_York

            // February 20, 2026 14:00:00 in America/New_York is February 20, 2026 19:00:00 UTC
            expect(newDate).toEqual(
              new Date(Date.UTC(2026, Month.February, 20, 19, 0, 0)),
            );
          });
        });
      });
      describe('EDT (UTC-4)', () => {
        describe('12h format', () => {
          describe('PM', () => {
            test('returns the UTC date', () => {
              const segments = {
                hour: '11',
                minute: '00',
                second: '00',
              };
              const newDate = getNewUTCDateFromSegments({
                segments,
                is12HourFormat: true,
                timeZone: 'America/New_York',
                dayPeriod: 'PM',
                dateValues: {
                  day: '20',
                  month: '03',
                  year: '2026',
                },
              }); // March 20, 2026 11:00:00 PM America/New_York

              // March 20, 2026 11:00:00 PM in America/New_York is March 21, 2026 03:00:00 UTC
              expect(newDate).toEqual(
                new Date(Date.UTC(2026, Month.March, 21, 3, 0, 0)),
              );
            });
          });
          describe('AM', () => {
            test('returns the UTC date', () => {
              const segments = {
                hour: '11',
                minute: '00',
                second: '00',
              };
              const newDate = getNewUTCDateFromSegments({
                segments,
                is12HourFormat: true,
                timeZone: 'America/New_York',
                dayPeriod: 'AM',
                dateValues: {
                  day: '20',
                  month: '03',
                  year: '2026',
                },
              }); // March 20, 2026 11:00:00 AM America/New_York

              // March 20, 2026 11:00:00 AM in America/New_York is March 20, 2026 15:00:00 UTC
              expect(newDate).toEqual(
                new Date(Date.UTC(2026, Month.March, 20, 15, 0, 0)),
              );
            });
          });
        });
        describe('24h format', () => {
          test('returns the UTC date', () => {
            const segments = {
              hour: '14',
              minute: '00',
              second: '00',
            };
            const newDate = getNewUTCDateFromSegments({
              segments,
              is12HourFormat: false,
              timeZone: 'America/New_York',
              dayPeriod: 'AM', // This is not used for 24h format
              dateValues: {
                day: '20',
                month: '03',
                year: '2026',
              },
            }); // March 20, 2026 14:00:00 America/New_York

            // March 20, 2026 14:00:00 in America/New_York is March 20, 2026 18:00:00 UTC
            expect(newDate).toEqual(
              new Date(Date.UTC(2026, Month.March, 20, 18, 0, 0)),
            );
          });
        });
      });
    });

    describe('Pacific/Auckland', () => {
      describe('NZST (UTC+12)', () => {
        describe('12h format', () => {
          describe('PM', () => {
            test('returns the UTC date', () => {
              const segments = {
                hour: '11',
                minute: '00',
                second: '00',
              };
              const newDate = getNewUTCDateFromSegments({
                segments,
                is12HourFormat: true,
                timeZone: 'Pacific/Auckland',
                dayPeriod: 'PM',
                dateValues: {
                  day: '01',
                  month: '05',
                  year: '2026',
                },
              }); // May 1, 2026 11:00:00 PM Pacific/Auckland

              // May 1, 2026 11:00:00 PM in Pacific/Auckland is May 1, 2026 11:00:00 UTC
              expect(newDate).toEqual(
                new Date(Date.UTC(2026, Month.May, 1, 11, 0, 0)),
              );
            });
          });
          describe('AM', () => {
            test('returns the UTC date', () => {
              const segments = {
                hour: '11',
                minute: '00',
                second: '00',
              };
              const newDate = getNewUTCDateFromSegments({
                segments,
                is12HourFormat: true,
                timeZone: 'Pacific/Auckland',
                dayPeriod: 'AM',
                dateValues: {
                  day: '01',
                  month: '05',
                  year: '2026',
                },
              }); // May 1, 2026 11:00:00 AM Pacific/Auckland

              // May 1, 2026 11:00:00 AM in Pacific/Auckland is April 30, 2026 23:00:00 UTC
              expect(newDate).toEqual(
                new Date(Date.UTC(2026, Month.April, 30, 23, 0, 0)),
              );
            });
          });
        });
        describe('24h format', () => {
          test('returns the UTC date', () => {
            const segments = {
              hour: '13',
              minute: '00',
              second: '00',
            };
            const newDate = getNewUTCDateFromSegments({
              segments,
              is12HourFormat: false,
              timeZone: 'Pacific/Auckland',
              dayPeriod: 'AM', // This is not used for 24h format
              dateValues: {
                day: '01',
                month: '05',
                year: '2026',
              },
            }); // May 1, 2026 13:00:00 Pacific/Auckland

            // May 1, 2026 13:00:00 Pacific/Auckland is May 1, 2026 01:00:00 UTC
            expect(newDate).toEqual(
              new Date(Date.UTC(2026, Month.May, 1, 1, 0, 0)),
            );
          });
        });
      });
      describe('NZDT (UTC+13)', () => {
        describe('PM', () => {
          test('returns the UTC date', () => {
            const segments = {
              hour: '11',
              minute: '00',
              second: '00',
            };
            const newDate = getNewUTCDateFromSegments({
              segments,
              is12HourFormat: true,
              timeZone: 'Pacific/Auckland',
              dayPeriod: 'PM',
              dateValues: {
                day: '20',
                month: '02',
                year: '2026',
              },
            }); // February 20, 2026 11:00:00 PM Pacific/Auckland

            // February 20, 2026 11:00:00 PM in Pacific/Auckland is February 20, 2026 10:00:00 UTC
            expect(newDate).toEqual(
              new Date(Date.UTC(2026, Month.February, 20, 10, 0, 0)),
            );
          });

          describe('AM', () => {
            test('returns the UTC date', () => {
              const segments = {
                hour: '11',
                minute: '00',
                second: '00',
              };
              const newDate = getNewUTCDateFromSegments({
                segments,
                is12HourFormat: true,
                timeZone: 'Pacific/Auckland',
                dayPeriod: 'AM',
                dateValues: {
                  day: '20',
                  month: '02',
                  year: '2026',
                },
              }); // February 20, 2026 11:00:00 AM Pacific/Auckland

              // February 20, 2026 11:00:00 AM in Pacific/Auckland is February 19, 2026 22:00:00 UTC
              expect(newDate).toEqual(
                new Date(Date.UTC(2026, Month.February, 19, 22, 0, 0)),
              );
            });
          });
        });
        describe('24h format', () => {
          test('returns the UTC date', () => {
            const segments = {
              hour: '13',
              minute: '00',
              second: '00',
            };
            const newDate = getNewUTCDateFromSegments({
              segments,
              is12HourFormat: false,
              timeZone: 'Pacific/Auckland',
              dayPeriod: 'AM', // This is not used for 24h format
              dateValues: {
                day: '20',
                month: '02',
                year: '2026',
              },
            }); // February 20, 2026 13:00:00 Pacific/Auckland

            // February 20, 2026 13:00:00 Pacific/Auckland is February 20, 2026 00:00:00 UTC
            expect(newDate).toEqual(
              new Date(Date.UTC(2026, Month.February, 20, 0, 0, 0)),
            );
          });
        });
      });
    });
  });

  describe('When all segments are filled but not all segments are valid, an invalid date object is returned', () => {
    describe('12h format', () => {
      describe('hour', () => {
        test('is invalid', () => {
          const segments = {
            hour: '13', // Invalid hour
            minute: '00',
            second: '00',
          };
          const newDate = getNewUTCDateFromSegments({
            segments,
            is12HourFormat: true,
            timeZone: 'UTC',
            dayPeriod: 'PM',
            dateValues: {
              day: '20',
              month: '02',
              year: '2026',
            },
          });

          expect(newDate?.getTime()).toBeNaN();
          expect(newDate).not.toBeNull();
        });

        test('is empty', () => {
          const segments = {
            hour: '', // Empty hour
            minute: '00',
            second: '00',
          };
          const newDate = getNewUTCDateFromSegments({
            segments,
            is12HourFormat: true,
            timeZone: 'UTC',
            dayPeriod: 'PM',
            dateValues: {
              day: '20',
              month: '02',
              year: '2026',
            },
          });

          expect(newDate?.getTime()).toBeNaN();
          expect(newDate).not.toBeNull();
        });
      });
    });

    describe('24h format', () => {
      describe('hour', () => {
        test('is invalid', () => {
          const segments = {
            hour: '24', // Invalid hour
            minute: '00',
            second: '00',
          };
          const newDate = getNewUTCDateFromSegments({
            segments,
            is12HourFormat: false,
            timeZone: 'UTC',
            dayPeriod: 'PM',
            dateValues: {
              day: '20',
              month: '02',
              year: '2026',
            },
          });

          expect(newDate?.getTime()).toBeNaN();
          expect(newDate).not.toBeNull();
        });

        test('is empty', () => {
          const segments = {
            hour: '', // Empty hour
            minute: '00',
            second: '00',
          };
          const newDate = getNewUTCDateFromSegments({
            segments,
            is12HourFormat: false,
            timeZone: 'UTC',
            dayPeriod: 'PM',
            dateValues: {
              day: '20',
              month: '02',
              year: '2026',
            },
          });

          expect(newDate?.getTime()).toBeNaN();
          expect(newDate).not.toBeNull();
        });
      });
    });

    describe('minute', () => {
      test('is invalid', () => {
        const segments = {
          hour: '11',
          minute: '60', // Invalid minute
          second: '00',
        };
        const newDate = getNewUTCDateFromSegments({
          segments,
          is12HourFormat: true,
          timeZone: 'UTC',
          dayPeriod: 'PM',
          dateValues: {
            day: '20',
            month: '02',
            year: '2026',
          },
        });

        expect(newDate?.getTime()).toBeNaN();
        expect(newDate).not.toBeNull();
      });

      test('is empty', () => {
        const segments = {
          hour: '11',
          minute: '', // Empty minute
          second: '00',
        };
        const newDate = getNewUTCDateFromSegments({
          segments,
          is12HourFormat: true,
          timeZone: 'UTC',
          dayPeriod: 'PM',
          dateValues: {
            day: '20',
            month: '02',
            year: '2026',
          },
        });

        expect(newDate?.getTime()).toBeNaN();
        expect(newDate).not.toBeNull();
      });
    });

    describe('second', () => {
      test('is invalid', () => {
        const segments = {
          hour: '11',
          minute: '00',
          second: '60', // Invalid second
        };
        const newDate = getNewUTCDateFromSegments({
          segments,
          is12HourFormat: true,
          timeZone: 'UTC',
          dayPeriod: 'PM',
          dateValues: {
            day: '20',
            month: '02',
            year: '2026',
          },
        });

        expect(newDate?.getTime()).toBeNaN();
        expect(newDate).not.toBeNull();
      });

      test('is empty', () => {
        const segments = {
          hour: '11',
          minute: '00',
          second: '', // Empty second
        };
        const newDate = getNewUTCDateFromSegments({
          segments,
          is12HourFormat: true,
          timeZone: 'UTC',
          dayPeriod: 'PM',
          dateValues: {
            day: '20',
            month: '02',
            year: '2026',
          },
        });

        expect(newDate?.getTime()).toBeNaN();
        expect(newDate).not.toBeNull();
      });
    });
  });

  test('When all segments are empty, null is returned', () => {
    const segments = {
      hour: '',
      minute: '',
      second: '',
    };
    const newDate = getNewUTCDateFromSegments({
      segments,
      is12HourFormat: true,
      timeZone: 'UTC',
      dayPeriod: 'PM',
      dateValues: {
        day: '20',
        month: '02',
        year: '2026',
      },
    });

    expect(newDate).toBeNull();
  });
});
