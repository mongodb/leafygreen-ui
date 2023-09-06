import { toTimeZone } from '.';

describe.skip('packages/date-picker/utils/toTimeZone', () => {
  const clientMidnight = new Date('2023-09-01T00:00:00.000');

  test('ISO string', () => {
    expect(clientMidnight.toISOString()).toEqual('2023-09-01T04:00:00.000Z');
  });

  test('converting to America/New_York does nothing', () => {
    const nyc = toTimeZone(clientMidnight, 'America/New_York');
    expect(nyc.toISOString()).toEqual(clientMidnight.toISOString());
  });

  test('converts client midnight to 4:00 UTC', () => {
    const utc = toTimeZone(clientMidnight, 'UTC');
    expect(utc.toISOString()).toEqual('2023-09-01T04:00:00.000Z');
  });
});
