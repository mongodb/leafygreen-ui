import { SupportedLocales } from '@leafygreen-ui/date-utils';

import { getInitialState } from './getInitialState';

describe('packages/time-input/hooks/useTimeSegmentsAndSelectUnit/utils/getInitialState', () => {
  test('12 hour format returns the initial state', () => {
    const initialState = getInitialState(
      new Date('2025-01-01T22:00:00Z'),
      SupportedLocales.en_US,
      'America/New_York',
    );
    expect(initialState).toEqual({
      segments: {
        hour: '05',
        minute: '00',
        second: '00',
      },
      selectUnit: {
        displayName: 'PM',
        value: 'PM',
      },
    });
  });

  test('24 hour format returns the initial state', () => {
    const initialState = getInitialState(
      new Date('2025-01-01T22:00:00Z'),
      SupportedLocales.ISO_8601,
      'America/New_York',
    );
    expect(initialState).toEqual({
      segments: {
        hour: '17',
        minute: '00',
        second: '00',
      },
      selectUnit: {
        displayName: 'AM',
        value: 'AM',
      },
    });
  });
});
