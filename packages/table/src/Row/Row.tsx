import { cx } from '@leafygreen-ui/emotion';
import { Row as RTRow } from '@tanstack/react-table';
import React, { Fragment, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { useTableContext } from '../TableContext';
import { baseStyles, zebraStyles, nestedBgStyles } from './styles';
import { RowProps } from './types';

const Row = <T extends unknown & { renderExpandedContent: ({ row }: { row: RTRow<T> }) => JSX.Element }>({ children, className, row, virtualRow, ...rest }: PropsWithChildren<RowProps<T>>) => {
  const { shouldAlternateRowColor } = useTableContext();
  // const isNestedRowParent = row && row.depth === 0 && row.getIsExpanded()
  const isNestedRowOrParent = row && (row.getIsExpanded() || row.depth > 0);
  // // todo: figure out this last line
  // const isLastNestedRow = row && row.depth > 0 && true;
  const ExpandableContentComponent = row?.original.renderExpandedContent;
  const isRenderingExpandedContent = !!ExpandableContentComponent
  const ContainerElement = isRenderingExpandedContent ? (props: any) => <tbody {...props} ref={virtualRow && virtualRow.measureRef} /> : Fragment;

  return (
    <ContainerElement>
      <tr
        className={cx(
          baseStyles,
          {
            [zebraStyles]: shouldAlternateRowColor,
            // [nestedBorderTopStyles]: isNestedRowParent,
            // [nestedBorderBottomStyles]: isLastNestedRow,
            [nestedBgStyles]: isNestedRowOrParent,
          },
          className,
        )}
        {...rest}
      >
        {React.Children.map(children, (child: ReactNode, index: number) => {
          return React.cloneElement(child as ReactElement, {
            cellIndex: index,
            ...(child as ReactElement).props,
          });
        })}
      </tr>
      {row && row.getIsExpanded() && ExpandableContentComponent &&
        <tr>
          <td colSpan={row?.getVisibleCells().length}>
            <ExpandableContentComponent row={row} />
          </td>
        </tr>
      }
    </ContainerElement>
  );
};

export default Row;
