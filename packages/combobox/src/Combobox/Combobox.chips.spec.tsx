import { renderCombobox } from '../utils/ComboboxTestUtils';

describe('Combobox chips', () => {
  const ellipsis = '…';
  const options = [
    'loremipsumdolor',
    'sitametconsectetur',
    'anotherlongoption',
  ];

  test('Chips truncate at the beginning', () => {
    const { queryAllChips } = renderCombobox('multiple', {
      options,
      initialValue: ['loremipsumdolor'],
      chipTruncationLocation: 'start',
    });
    const firstChipEl = queryAllChips()[0];
    expect(firstChipEl).toHaveTextContent(ellipsis + 'psumdolor');
  });

  test('Chips truncate in the middle', () => {
    const { queryAllChips } = renderCombobox('multiple', {
      options,
      initialValue: ['loremipsumdolor'],
      chipTruncationLocation: 'middle',
    });
    const [firstChipEl] = queryAllChips();
    expect(firstChipEl).toHaveTextContent('lore' + ellipsis + 'dolor');
  });
  test('Chips truncate at the end', () => {
    const { queryAllChips } = renderCombobox('multiple', {
      options,
      initialValue: ['loremipsumdolor'],
      chipTruncationLocation: 'end',
    });
    const [firstChipEl] = queryAllChips();
    expect(firstChipEl).toHaveTextContent('loremipsu' + ellipsis);
  });

  test('Chips truncate to the provided length', () => {
    const { queryAllChips } = renderCombobox('multiple', {
      options,
      initialValue: ['loremipsumdolor'],
      chipTruncationLocation: 'start',
      chipCharacterLimit: 8,
    });
    const [firstChipEl] = queryAllChips();
    expect(firstChipEl).toHaveTextContent(ellipsis + 'dolor');
  });
});
