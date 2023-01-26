import { PropsWithChildren } from 'react';
import { VirtualItem } from 'react-virtual';

import { HTMLElementProps } from '@leafygreen-ui/lib';

import { LeafygreenTableRow } from '../useLeafygreenTable';

export interface InternalRowBaseProps extends HTMLElementProps<'tr'> {
  /**
   * Determines whether the row is disabled
   */
  disabled?: boolean;
}

export interface InternalRowWithoutRTProps extends InternalRowBaseProps {}

export interface InternalRowWithRTProps<T extends unknown>
  extends InternalRowBaseProps {
  /**
   * Row object passed from the `useLeafygreenTable` hook.
   */
  row: LeafygreenTableRow<T>;
  /**
   * Virtual row object passed from the `useLeafygreenTable` hook
   */
  virtualRow?: VirtualItem;
}

export type RowProps<T extends unknown> = PropsWithChildren<
  InternalRowWithoutRTProps & Partial<InternalRowWithRTProps<T>>
>;
