import { Month } from '@leafygreen-ui/date-utils';
import { getNewUTCDateFromSegments } from './getNewUTCDateFromSegments';

describe('getNewUTCDateFromSegments', () => {
  // test cases
  // 1. all segments are filled and valid and the date is valid, then it should return the UTC date (12h and 24h format)
  // 1.1. New york TimeZone (-5 hours ahead of UTC)
  // 1.2. Los Angeles TimeZone (-8 hours ahead of UTC)
  // 1.3. UTC (0 hours ahead of UTC)
  // 1.4 Kiritimati TimeZone (14 hours ahead of UTC)

  // 2. all segments are filled and but not all are valid, then it should return the invalid date

  // 3. not all segments are filled, then it should return the null

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

    // describe('Pacific/Auckland', () => {
    //   describe('NZST (UTC+12)', () => {
    //     describe('12h format', () => {
    //       describe('PM', () => {
    //         test('returns the UTC date', () => {
    //           const segments = {
    //             hour: '11',
    //             minute: '00',
    //             second: '00',
    //           };
    //           const newDate = getNewUTCDateFromSegments({
    //             segments,
    //             is12HourFormat: true,
    //             timeZone: 'Pacific/Auckland',
    //             dayPeriod: 'PM',
    //             dateValues: {
    //               day: '01',
    //               month: '05',
    //               year: '2026',
    //             },
    //           }); // May 1, 2026 11:00:00 PM Pacific/Auckland

    //           // May 1, 2026 11:00:00 PM in Pacific/Auckland is May 1, 2026 11:00:00 UTC
    //           expect(newDate).toEqual(
    //             new Date(Date.UTC(2026, Month.May, 1, 11, 0, 0)),
    //           );
    //         });
    //       });
    //       // describe('AM', () => {
    //       //   test('returns the UTC date', () => {
    //       //     const segments = {
    //       //       hour: '11',
    //       //       minute: '00',
    //       //       second: '00',
    //       //     };
    //       //     const newDate = getNewUTCDateFromSegments({
    //       //       segments,
    //       //       is12HourFormat: true,
    //       //       timeZone: 'Pacific/Auckland',
    //       //       dayPeriod: 'AM',
    //       //       dateValues: {
    //       //         day: '20',
    //       //         month: '02',
    //       //         year: '2026',
    //       //       },
    //       //     }); // February 20, 2026 11:00:00 AM America/New_York

    //       //     // February 20, 2026 11:00:00 AM in America/New_York is February 20, 2026 16:00:00 UTC
    //       //     expect(newDate).toEqual(
    //       //       new Date(Date.UTC(2026, Month.February, 20, 16, 0, 0)),
    //       //     );
    //       //   });
    //       // });
    //     });
    //     describe('24h format', () => {});
    //   });
    //   // describe('NZDT (UTC+13)', () => {
    //   //   describe('12h format', () => {
    //   //     describe('PM', () => {
    //   //       test('returns the UTC date', () => {
    //   //         const segments = {
    //   //           hour: '11',
    //   //           minute: '00',
    //   //           second: '00',
    //   //         };
    //   //         const newDate = getNewUTCDateFromSegments({
    //   //           segments,
    //   //           is12HourFormat: true,
    //   //           timeZone: 'Pacific/Auckland',
    //   //           dayPeriod: 'PM',
    //   //           dateValues: {
    //   //             day: '20',
    //   //             month: '03',
    //   //             year: '2026',
    //   //           },
    //   //         }); // March 20, 2026 11:00:00 PM America/New_York

    //   //         // March 20, 2026 11:00:00 PM in America/New_York is March 21, 2026 03:00:00 UTC
    //   //         expect(newDate).toEqual(
    //   //           new Date(Date.UTC(2026, Month.March, 21, 3, 0, 0)),
    //   //         );
    //   //       });
    //   //     });
    //   //     describe('AM', () => {
    //   //       test('returns the UTC date', () => {
    //   //         const segments = {
    //   //           hour: '11',
    //   //           minute: '00',
    //   //           second: '00',
    //   //         };
    //   //         const newDate = getNewUTCDateFromSegments({
    //   //           segments,
    //   //           is12HourFormat: true,
    //   //           timeZone: 'Pacific/Auckland',
    //   //           dayPeriod: 'AM',
    //   //           dateValues: {
    //   //             day: '20',
    //   //             month: '03',
    //   //             year: '2026',
    //   //           },
    //   //         }); // March 20, 2026 11:00:00 AM America/New_York

    //   //         // March 20, 2026 11:00:00 AM in America/New_York is March 20, 2026 15:00:00 UTC
    //   //         expect(newDate).toEqual(
    //   //           new Date(Date.UTC(2026, Month.March, 20, 15, 0, 0)),
    //   //         );
    //   //       });
    //   //     });
    //   //   });
    //   //   describe('24h format', () => {});
    //   // });
    // });
  });
});
