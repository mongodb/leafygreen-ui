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
