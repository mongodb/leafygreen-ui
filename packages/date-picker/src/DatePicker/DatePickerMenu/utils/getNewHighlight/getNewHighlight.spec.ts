import { getNewHighlight } from '.';

describe('packages/date-picker/date-picker-menu/utils/getNewHighlight', () => {
  test('new highlight is the first day when new month is after current month', () => {
    const newHighlight = getNewHighlight(
      new Date(Date.UTC(2023, 6, 5)),
      new Date(Date.UTC(2023, 6, 1)),
      new Date(Date.UTC(2023, 11, 5)),
    );

    expect(newHighlight).toEqual(new Date(Date.UTC(2023, 11, 1)));
  });

  test('new highlight is the last day when new month is before current month', () => {
    const newHighlight = getNewHighlight(
      new Date(Date.UTC(2023, 6, 5)),
      new Date(Date.UTC(2023, 6, 1)),
      new Date(Date.UTC(2023, 1, 5)),
    );

    expect(newHighlight).toEqual(new Date(Date.UTC(2023, 1, 28)));
  });

  test('returns undefined when the new month is the same as current month', () => {
    const newHighlight = getNewHighlight(
      new Date(Date.UTC(2023, 1, 5)),
      new Date(Date.UTC(2023, 6, 5)),
      new Date(Date.UTC(2023, 6, 15)),
    );

    expect(newHighlight).toBeUndefined();
  });

  test('returns undefined when the new month is the same as current highlight', () => {
    const newHighlight = getNewHighlight(
      new Date(Date.UTC(2023, 1, 5)),
      new Date(Date.UTC(2023, 6, 5)),
      new Date(Date.UTC(2023, 1, 15)),
    );

    expect(newHighlight).toBeUndefined();
  });

  test('returns the current value when the new month is the same as the current value', () => {
    const newHighlight = getNewHighlight(
      new Date(Date.UTC(2023, 5, 5)),
      new Date(Date.UTC(2023, 5, 1)),
      new Date(Date.UTC(2023, 11, 5)),
      new Date(Date.UTC(2023, 11, 12)),
    );

    expect(newHighlight).toEqual(new Date(Date.UTC(2023, 11, 12)));
  });
});
