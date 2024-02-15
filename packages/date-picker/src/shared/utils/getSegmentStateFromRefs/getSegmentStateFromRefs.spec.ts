import { SegmentRefs } from '../../hooks';
import { segmentRefsMock } from '../../testutils';

import { getSegmentStateFromRefs } from '.';

describe('packages/date-picker/utils/getSegmentStateFromRefs', () => {
  test('empty refs', () => {
    expect(getSegmentStateFromRefs(segmentRefsMock)).toEqual({
      day: '',
      month: '',
      year: '',
    });
  });

  test('Refs with values', () => {
    const refs: SegmentRefs = { ...segmentRefsMock };
    // @ts-expect-error - current is read-only
    refs.day.current = document.createElement('input');
    // @ts-expect-error - current is read-only
    refs.month.current = document.createElement('input');
    // @ts-expect-error - current is read-only
    refs.year.current = document.createElement('input');

    refs.day.current.value = '02';
    refs.month.current.value = '02';
    refs.year.current.value = '2020';

    expect(getSegmentStateFromRefs(refs)).toEqual({
      day: '02',
      month: '02',
      year: '2020',
    });
  });
});
