import {
  ComponentPropsWithRef,
  ForwardedRef,
  PropsWithoutRef,
  ReactElement,
  RefAttributes,
  WeakValidationMap,
} from 'react';
import { RowData } from '@tanstack/react-table';
import { VirtualItem } from '@tanstack/react-virtual';

import { LeafyGreenTableRow } from '../useLeafyGreenTable';
export interface ExpandedContentProps<T extends RowData>
  extends ComponentPropsWithRef<'tr'> {
  row: LeafyGreenTableRow<T>;
  /**
   * Virtual row object passed from the `useLeafyGreenTable` hook
   */
  virtualRow?: VirtualItem;
}

// https://stackoverflow.com/a/58473012
// React.forwardRef can only work with plain function types.
// This is a type assertion that restores the original function signature to work with generics.
/**
 * The HeaderCellComponentType that restores the original function signature to work with generics.
 *
 */
export interface ExpandedContentComponentType {
  <T extends RowData>(
    props: ExpandedContentProps<T>,
    ref: ForwardedRef<HTMLTableRowElement>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?:
    | WeakValidationMap<
        PropsWithoutRef<ExpandedContentProps<RowData> & RefAttributes<any>>
      >
    | undefined;
}
