import {
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

export interface InternalRowBaseProps extends ComponentPropsWithRef<'tr'> {
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
  measureElement?: Virtualizer<HTMLElement, Element>['measureElement'];
  isExpanded: boolean;
  isParentExpanded: boolean;
  isSelected: boolean;
}

export type RowProps<T extends LGRowData> = InternalRowWithoutRTProps &
  Partial<InternalRowWithRTProps<T>>;

// https://stackoverflow.com/a/58473012
// React.forwardRef can only work with plain function types.
// This is an interface that restores the original function signature to work with generics.
/**
 * The RowComponentType that restores the original function signature to work with generics.
 *
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
 * The RowComponentType that restores the original function signature to work with generics.
 *
 *  row is required
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
