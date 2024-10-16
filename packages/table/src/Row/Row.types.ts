import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

import { HTMLElementProps, Theme } from '@leafygreen-ui/lib';

import { LeafyGreenTableRow, LGRowData } from '../useLeafyGreenTable';

export interface InternalRowBaseProps extends HTMLElementProps<'tr'> {
  /**
   * Determines whether the row is disabled
   */
  disabled?: boolean;
}

export interface InternalRowWithoutRTProps extends InternalRowBaseProps {}

export interface InternalRowWithRTProps<T extends LGRowData>
  extends InternalRowBaseProps {
  /**
   * Row object passed from the `useLeafyGreenTable` hook.
   */
  row: LeafyGreenTableRow<T>;
  /**
   * Virtual row object passed from the `useLeafyGreenTable` hook
   */
  virtualRow?: VirtualItem;

  shouldAlternateRowColor: boolean;
  theme: Theme;
  measureElement: Virtualizer<HTMLElement, Element>['measureElement'];
  isExpanded: boolean;
  isParentExpanded: boolean;
  isSelected: boolean;
}

export type RowProps<T extends LGRowData> = InternalRowWithoutRTProps &
  Partial<InternalRowWithRTProps<T>>;
