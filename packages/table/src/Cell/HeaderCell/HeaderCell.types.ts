import {
  ComponentPropsWithRef,
  ForwardedRef,
  PropsWithoutRef,
  ReactElement,
  RefAttributes,
  WeakValidationMap,
} from 'react';
import { Header } from '@tanstack/react-table';

import { LGRowData } from '../../useLeafyGreenTable';

export const SortState = {
  Asc: 'asc',
  Desc: 'desc',
  Off: 'off',
  None: 'none',
} as const;

export type SortState = (typeof SortState)[keyof typeof SortState];

export interface SortStates {
  [key: string]: SortState;
}

export interface HeaderCellProps<T extends LGRowData>
  extends ComponentPropsWithRef<'th'> {
  /**
   * Header object passed from the `useLeafyGreenTable` hook.
   */
  header?: Header<T, unknown>;
}

// https://stackoverflow.com/a/58473012
// React.forwardRef can only work with plain function types.
// This is an interface that restores the original function signature to work with generics.
/**
 * The HeaderCellComponentType that restores the original function signature to work with generics.
 *
 */
export interface HeaderCellComponentType {
  <T extends LGRowData>(
    props: HeaderCellProps<T>,
    ref: ForwardedRef<HTMLTableCellElement>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?:
    | WeakValidationMap<
        PropsWithoutRef<HeaderCellProps<LGRowData> & RefAttributes<any>>
      >
    | undefined;
}

// https://stackoverflow.com/a/58473012
// React.forwardRef can only work with plain function types.
// This is an interface that restores the original function signature to work with generics.
/**
 * The HeaderCellComponentType that restores the original function signature to work with generics.
 *
 */
export interface HeaderCellComponentType {
  <T extends LGRowData>(
    props: HeaderCellProps<T>,
    ref: ForwardedRef<HTMLTableCellElement>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?:
    | WeakValidationMap<
        PropsWithoutRef<HeaderCellProps<LGRowData> & RefAttributes<any>>
      >
    | undefined;
}
