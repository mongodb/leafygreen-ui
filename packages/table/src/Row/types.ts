import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { Row } from '@tanstack/react-table';
import { ChangeEvent } from 'react';
import { VirtualItem } from 'react-virtual';
import { LeafygreenTableRowData } from '../useLeafygreenTable/useLeafygreenTable';

export interface InternalRowBaseProps
  extends HTMLElementProps<'tr'>,
    DarkModeProps {
  /**
   * Determines whether or not the row is disabled
   */
  disabled?: boolean;
}

export interface InternalRowWithoutVSProps extends InternalRowBaseProps {}

export interface InternalRowWithRTProps<T extends unknown>
  extends InternalRowBaseProps {
  row: Row<LeafygreenTableRowData<T>>;
  virtualRow?: VirtualItem;
}

export interface RowProps<T extends unknown>
  extends InternalRowWithoutVSProps,
    Partial<InternalRowWithRTProps<T>> {}
