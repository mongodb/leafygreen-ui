import { ComponentPropsWithRef, ReactElement } from 'react';
import React from 'react';
import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

import { MemoWithGenerics, Theme } from '@leafygreen-ui/lib';

import { LeafyGreenTableRow, LGRowData } from '../useLeafyGreenTable';

export interface InternalRowBaseProps extends ComponentPropsWithRef<'tr'> {
  /**
   * Determines whether the row is disabled
   */
  disabled?: boolean;
}

export interface InternalRowWithoutRTProps extends InternalRowBaseProps {}

export interface InternalRowWithRTBaseProps<T extends LGRowData>
  extends InternalRowBaseProps {
  /**
   * Row object passed from the `useLeafyGreenTable` hook.
   */
  row: LeafyGreenTableRow<T>;
  /**
   * Virtual row object passed from the `useLeafyGreenVirtualTable` hook
   */
  virtualRow?: VirtualItem;
}

export interface InternalRowWithRTProps<T extends LGRowData>
  extends InternalRowWithRTBaseProps<T> {
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
  Partial<InternalRowWithRTBaseProps<T>>;

// This removes propTypes and displayName but works in combination with MemoWithGenerics in R17 and R18
export interface ForwardRefWithGenerics {
  <T, P = NonNullable<unknown>>(
    render: (props: P, ref: React.ForwardedRef<T>) => ReactElement | null,
  ): (
    props: React.PropsWithoutRef<P> & React.RefAttributes<T>,
  ) => ReactElement | null;
}

export const forwardRefWithGenerics: ForwardRefWithGenerics = React.forwardRef;

export const memoWithGenerics: MemoWithGenerics = React.memo;
