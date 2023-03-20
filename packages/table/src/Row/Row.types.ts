import { PropsWithChildren } from 'react';
import { VirtualItem } from 'react-virtual';

import { HTMLElementProps } from '@leafygreen-ui/lib';

import { LeafyGreenTableRow, LGRowData } from '../useLeafygreenTable';

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
   * Row object passed from the `useLeafygreenTable` hook.
   */
  row: LeafyGreenTableRow<T>;
  /**
   * Virtual row object passed from the `useLeafygreenTable` hook
   */
  virtualRow?: VirtualItem;
  isNestedRow?: boolean;
}

export type RowProps<T extends LGRowData> = PropsWithChildren<
  InternalRowWithoutRTProps & Partial<InternalRowWithRTProps<T>>
>;
