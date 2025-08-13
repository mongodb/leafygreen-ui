import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ForwardedRef,
  PropsWithoutRef,
  ReactElement,
  RefAttributes,
  WeakValidationMap,
} from 'react';
import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

import { Theme } from '@leafygreen-ui/lib';

import { LeafyGreenTableRow, LGRowData } from '../useLeafyGreenTable';

export interface RowBaseProps extends ComponentPropsWithoutRef<'tr'> {
  /**
   * Determines whether the row is disabled
   */
  disabled?: boolean;
}

export interface RowWithRTBaseProps<T extends LGRowData> extends RowBaseProps {
  /**
   * Row object passed from the `useLeafyGreenTable` or `useLeafyGreenVirtualTable` hook.
   */
  row: LeafyGreenTableRow<T>;

  /**
   * Virtual row object passed from the `useLeafyGreenVirtualTable` hook
   */
  virtualRow?: VirtualItem;
}

export interface InternalRowWithRTProps<T extends LGRowData>
  extends RowWithRTBaseProps<T> {
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

  /**
   * An internal prop used to pass a ref to the row
   */
  rowRef?: React.MutableRefObject<HTMLTableRowElement | null>;

  /**
   * Whether the rows should be memoized.
   */
  shouldMemoizeRows?: boolean;
}

export type RowProps<T extends LGRowData> = ComponentPropsWithRef<'tr'> &
  RowBaseProps &
  Partial<RowWithRTBaseProps<T>>;

// https://stackoverflow.com/a/58473012
// React.forwardRef can only work with plain function types.
/**
 * Type definition for `Row` that works with generics.
 * row is optional
 */
export interface RowComponentType {
  <T extends LGRowData>(
    props: RowProps<T>,
    ref: ForwardedRef<HTMLTableRowElement>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?:
    | WeakValidationMap<
        PropsWithoutRef<RowProps<LGRowData> & RefAttributes<any>>
      >
    | undefined;
}

/**
 * Type definition for `InternalRowWithRT` that works with generics.
 * row is required
 */
export interface RowComponentWithRTType {
  <T extends LGRowData>(
    props: InternalRowWithRTProps<T>,
    ref: ForwardedRef<HTMLTableRowElement>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?:
    | WeakValidationMap<
        PropsWithoutRef<InternalRowWithRTProps<LGRowData> & RefAttributes<any>>
      >
    | undefined;
}
