/**
 * Static property names used to identify CollectionToolbarFilters compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const CollectionToolbarFiltersSubComponentProperty = {
  Select: 'isCollectionToolbarFiltersSelect',
  SelectOption: 'isCollectionToolbarFiltersSelectOption',
  DatePicker: 'isCollectionToolbarFiltersDatePicker',
  SegmentedControl: 'isCollectionToolbarFiltersSegmentedControl',
  SegmentedControlOption: 'isCollectionToolbarFiltersSegmentedControlOption',
  TextInput: 'isCollectionToolbarFiltersTextInput',
  NumberInput: 'isCollectionToolbarFiltersNumberInput',
  Combobox: 'isCollectionToolbarFiltersCombobox',
  ComboboxOption: 'isCollectionToolbarFiltersComboboxOption',
} as const;
export type CollectionToolbarFiltersSubComponentProperty =
  (typeof CollectionToolbarFiltersSubComponentProperty)[keyof typeof CollectionToolbarFiltersSubComponentProperty];
