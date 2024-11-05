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
   * Virtual row object passed from the `useLeafyGreenVirtualTable` hook
   */
  virtualRow?: VirtualItem;

  /**
   * Determines whether alternating rows will have dark backgrounds.
   * @default false
   */
  shouldAlternateRowColor: boolean;

  /**
   * Whether the theme is dark or light
   */
  theme: Theme;

  /**
   * Function from TanStack Virtual that is called to dynamically measure the size of an item
   */
  measureElement?: Virtualizer<HTMLElement, Element>['measureElement'];

  /**
   * Whether the row is expanded
   */
  isExpanded: boolean;

  /**
   * Whether the parent row is expanded
   */
  isParentExpanded: boolean;

  /**
   * Whether the row is selected
   */
  isSelected: boolean;
}

export type RowProps<T extends LGRowData> = InternalRowWithoutRTProps &
  Partial<InternalRowWithRTProps<T>>;
