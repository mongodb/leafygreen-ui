import { Align } from './HeaderCell/types';

export interface TableContextValues {
  /**
   * Defines which rows should be selected by default
   */
  selectedRows?: Array<number>;
  columnAlignments: Record<number, Align>;
  setColumnAlignments: React.Dispatch<
    React.SetStateAction<Record<number, Align> | undefined>
  >;
  shouldAlternateRowColor: boolean;
}
