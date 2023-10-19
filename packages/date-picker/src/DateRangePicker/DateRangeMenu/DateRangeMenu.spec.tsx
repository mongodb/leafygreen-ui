import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { subDays } from 'date-fns';

import { MIN_DATE, Month } from '../../constants';
import { DatePickerProvider } from '../../DatePickerContext';
import { DateRangeType } from '../../types';
import { newUTC } from '../../utils';
import {
  DateRangeProvider,
  type DateRangeProviderProps,
} from '../DateRangeContext';

describe('packages/date-picker/date-range-picker/menu', () => {
  describe('Keyboard Interaction', () => {
    describe('Arrow keys', () => {
      test.todo('');
    });
  });
});
