import React, { useEffect, ReactElement } from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import { isComponentType } from '@leafygreen-ui/lib';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import NumRowsProvider from './NumRowsContext';
import TableHeader, { TableHeaderProps } from './TableHeader';
import CheckboxCell from './CheckboxCell';

// * Make sure dates are right aligned
// * Indent on Expanded Row
// * Be smarter for sort than children.props.children
// * Fixed header
// * Create common props

// * Row selection
// * pass check all to nested
// * reset to false when none are true

// * Hover styles fix
// * Pagination
// * colspan
// * rowspan
// * headerrow
// * truncation

const tableStyles = css`
  border-collapse: collapse;
  box-sizing: border-box;
`;

const SortOrder = {
  Asc: 'asc',
  Desc: 'desc',
} as const;

type SortOrder = keyof typeof SortOrder;

interface SortOrderState {
  [key: number]: SortOrder[keyof SortOrder];
}

interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  data?: Array<any>;
  columns?: Array<ReactElement<TableHeaderProps> | string>;
  selectable?: boolean;
}

export default function Table({
  columns = [],
  data = [],
  children,
  selectable,
}: TableProps) {
  const [rows, setRows] = React.useState<Array<React.ReactElement>>([]);
  const [sort, setSort] = React.useState<SortOrderState>({});
  const [checkAll, setCheckAll] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);

  useEffect(() => {
    if (typeof children === 'function') {
      const unsortedRows = data.map((datum, index) => {
        return children({ datum, index });
      });

      setRows(unsortedRows);
    } else {
      setRows(children);
    }
  }, [children]);

  const alphanumericCollator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
  });

  const sortRows = (colId?: number) => {
    if (typeof colId !== 'number') {
      return;
    }

    const sortedRows = rows.sort((a, b) => {
      const aVal = a.props.children[colId].props.children;
      const bVal = b.props.children[colId].props.children;

      if (sort[colId] === SortOrder.Asc || sort[colId] === undefined) {
        return alphanumericCollator.compare(aVal, bVal);
      }

      return alphanumericCollator.compare(bVal, aVal);
    });

    setRows(sortedRows);

    if (sort[colId] === SortOrder.Asc || sort[colId] === undefined) {
      setSort({ [colId]: SortOrder.Desc });
    } else {
      setSort({ [colId]: SortOrder.Asc });
    }
  };

  const renderColumns = () => {
    return columns.map((column, index) => {
      if (isComponentType(column, 'TableHeader')) {
        let glyph = 'Unsorted';

        if (sort[index] === SortOrder.Asc) {
          glyph = 'SortAscending';
        } else if (sort[index] === SortOrder.Desc) {
          glyph = 'SortDescending';
        }

        return React.cloneElement(column, {
          key: column?.props?.label,
          onClick: sortRows,
          index,
          glyph,
        });
      }

      if (typeof column === 'string') {
        return (
          <TableHeader
            label={column}
            key={column}
            index={index}
            onClick={sortRows}
          />
        );
      }

      return column;
    });
  };

  const renderBody = () => {
    if (!children) {
      return null;
    }

    if (selectable) {
      return rows.map(row => {
        const selectCell = <CheckboxCell checked={checkAll} />;

        return React.cloneElement(row, {
          selectable,
          setIndeterminate,
          checked: checkAll,
          children: [
            selectCell,
            [
              ...(row.props?.children instanceof Array
                ? row.props.children
                : [row.props.children]),
            ],
          ],
        });
      });
    }

    return rows;
  };

  console.log(checkAll);

  return (
    <NumRowsProvider numRows={data.length}>
      <table cellSpacing="0" cellPadding="0" className={tableStyles}>
        <thead>
          <tr>
            {selectable && (
              <th
                className={css`
                  width: 40px;
                  border-width: 0px 1px 3px 1px;
                  border-color: ${uiColors.gray.light2};
                  border-style: solid;
                `}
              >
                <div
                  className={css`
                    display: flex;
                    justify-content: center;
                  `}
                >
                  <Checkbox
                    checked={checkAll}
                    indeterminate={indeterminate}
                    onChange={() => {
                      if (!checkAll) {
                        setIndeterminate(false);
                      }

                      setCheckAll(curr => !curr);
                    }}
                  />
                </div>
              </th>
            )}
            {renderColumns()}
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </NumRowsProvider>
  );
}
