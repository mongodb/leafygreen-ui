import { AutoComplete, DateSegment } from '../../types';

import { getAutoComplete } from '.';

describe('packages/date-picker/utils/getAutoComplete', () => {
  test('off', () => {
    expect(getAutoComplete(AutoComplete.Off, DateSegment.Day)).toEqual('off');
    expect(getAutoComplete(AutoComplete.Off, DateSegment.Month)).toEqual('off');
    expect(getAutoComplete(AutoComplete.Off, DateSegment.Year)).toEqual('off');
  });

  test('on', () => {
    expect(getAutoComplete(AutoComplete.On, DateSegment.Day)).toEqual('on');
    expect(getAutoComplete(AutoComplete.On, DateSegment.Month)).toEqual('on');
    expect(getAutoComplete(AutoComplete.On, DateSegment.Year)).toEqual('on');
  });

  test('bday', () => {
    expect(getAutoComplete(AutoComplete.Bday, DateSegment.Day)).toEqual(
      'bday-day',
    );
    expect(getAutoComplete(AutoComplete.Bday, DateSegment.Month)).toEqual(
      'bday-month',
    );
    expect(getAutoComplete(AutoComplete.Bday, DateSegment.Year)).toEqual(
      'bday-year',
    );
  });
});
