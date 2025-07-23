import userEvent from '@testing-library/user-event';
import range from 'lodash/range';

/** Presses the `tab` key `count` times */
export const tabNTimes = (count: number) => {
  for (const _ in range(count)) {
    userEvent.tab();
  }
};
