import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import React, { Fragment, ReactElement, ReactNode } from 'react';
import InternalCellWithVS from '../Cell/InternalCellWithVS';
import { LeafygreenTableRowData } from '../useLeafygreenTable/useLeafygreenTable.types';
import InternalRowBase from './InternalRowBase';
import {
  nestedBorderTopStyles,
  nestedBgStyles,
  expandedContentStyles,
} from './styles';
import { InternalRowWithRTProps } from './types';

const InternalRowWithRT = <T extends unknown>({
  children,
  className,
  row,
  virtualRow,
  ...rest
}: InternalRowWithRTProps<LeafygreenTableRowData<T>>) => {
  const { theme } = useDarkMode();
  const isNestedRowParent = row && row.depth === 0 && row.getIsExpanded();
  const isNestedRowOrParent = row && (row.getIsExpanded() || row.depth > 0);
  const ExpandedContentRowProp = row && row?.original.renderExpandedContent;
  const ContainerElement = ExpandedContentRowProp
    ? (props: any) => (
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
        {...rest}
      >
        {React.Children.map(children, (child: ReactNode, index: number) => {
          return React.createElement(InternalCellWithVS, {
            ...(child as ReactElement)?.props,
            cellIndex: index,
            depth: row.depth,
          });
        })}
      </InternalRowBase>
      {row && row.getIsExpanded() && ExpandedContentRowProp && (
        <tr>
          <td
            colSpan={row?.getVisibleCells().length}
            className={expandedContentStyles[theme]}
          >
            {ExpandedContentRowProp(row)}
          </td>
        </tr>
      )}
    </ContainerElement>
  );
};

export default InternalRowWithRT;
