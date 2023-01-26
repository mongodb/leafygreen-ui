import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import React, { Fragment, ReactElement, ReactNode } from 'react';
import InternalCellWithRT from '../Cell/InternalCellWithRT';
import { LeafygreenTableRow } from '../useLeafygreenTable';
import InternalRowBase from './InternalRowBase';
import {
  expandedContentStyles,
  nestedBgStyles,
  nestedBorderTopStyles,
} from './Row.styles';
import { InternalRowWithRTProps } from './Row.types';

const InternalRowWithRT = <T extends unknown>({
  children,
  className,
  row,
  virtualRow,
  disabled,
  ...rest
}: InternalRowWithRTProps<T>) => {
  const { theme } = useDarkMode();
  const isNestedRowParent = row.depth === 0 && row.getIsExpanded();
  const isNestedRowOrParent = row.getIsExpanded() || row.depth > 0;
  const ExpandedContentRowProp = row?.original.renderExpandedContent;
  const ContainerElement = ExpandedContentRowProp
    ? (props: HTMLElementProps<'tbody'>) => (
        <tbody
          {...props}
          ref={virtualRow ? virtualRow.measureRef : undefined}
        />
      )
    : Fragment;

  return (
    <ContainerElement>
      <InternalRowBase
        className={cx(
          {
            [nestedBorderTopStyles[theme]]: isNestedRowParent,
            [nestedBgStyles[theme]]: isNestedRowOrParent,
          },
          className,
        )}
        disabled={disabled}
        data-depth={row.depth}
        {...rest}
      >
        {React.Children.map(children, (child: ReactNode, index: number) => {
          return React.createElement(InternalCellWithRT, {
            ...(child as ReactElement)?.props,
            cellIndex: index,
            depth: row.depth,
            disabled,
          });
        })}
      </InternalRowBase>
      {row.getIsExpanded() && ExpandedContentRowProp && (
        <tr>
          <td
            colSpan={row?.getVisibleCells().length}
            className={expandedContentStyles[theme]}
          >
            {ExpandedContentRowProp(row as LeafygreenTableRow<T>)}
          </td>
        </tr>
      )}
    </ContainerElement>
  );
};

export default InternalRowWithRT;
