import { HTMLElementProps } from '@leafygreen-ui/lib';
import { VirtualItem } from 'react-virtual';
import { LeafygreenTableRow } from '../useLeafygreenTable';

export interface InternalRowBaseProps
  extends HTMLElementProps<'tr'> {
  /**
   * Determines whether or not the row is disabled
   */
  disabled?: boolean;
}

export interface InternalRowWithoutRTProps extends InternalRowBaseProps { }

export interface InternalRowWithRTProps<T extends unknown>
  extends InternalRowBaseProps {
  /**
   * Row object passed from the `useLeafygreenTable` hook.
   */
  row: LeafygreenTableRow<T>;
  /**
   * Virtual row passed from the `useLeafygreenTable` hook
   */
  virtualRow?: VirtualItem;
}

export type RowProps<T extends unknown> = InternalRowWithoutRTProps | InternalRowWithRTProps<T>;
