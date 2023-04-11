import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import SortAscendingIcon from '@leafygreen-ui/icon/dist/SortAscending';
import SortDescendingIcon from '@leafygreen-ui/icon/dist/SortDescending';
import UnsortedIcon from '@leafygreen-ui/icon/dist/Unsorted';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { enforceExhaustive, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { SortDirection, useSortContext } from './SortContext';
import { getCommonCellStyles } from './styles';
import { DataType, TableActionTypes, useTableContext } from './TableContext';

type StyledElements = 'thStyle' | 'labelStyle' | 'glyphColor';

const themeStyles: Record<Theme, Record<StyledElements, string>> = {
  [Theme.Light]: {
    thStyle: css`
      border-color: ${palette.gray.light2};
    `,
    labelStyle: css`
      color: ${palette.gray.dark3};
    `,
    glyphColor: css`
      color: ${palette.blue.base};
    `,
  },

  [Theme.Dark]: {
    thStyle: css`
      background-color: ${palette.black};
      border-color: ${palette.gray.dark2};
    `,
    labelStyle: css`
      color: ${palette.gray.light2};
    `,
    glyphColor: css`
      color: ${palette.blue.light1};
    `,
  },
};

const thStyle = css`
  border-bottom: 3px solid;
`;

const flexDisplay = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const labelStyle = css`
  padding-right: 4px;
`;

const iconButtonMargin = css`
  margin: -4px 0;
`;

const glyphMap = {
  unsorted: UnsortedIcon,
  asc: SortDescendingIcon,
  desc: SortAscendingIcon,
} as const;

type NormalizedAccessor<T extends string | Function> = T extends string
  ? <U>(data: U) => T extends keyof U ? U[T] : undefined
  : T;
export function normalizeAccessor<T extends string | Function>(
  accessor: T,
): NormalizedAccessor<T> {
  let accessorFn = accessor as NormalizedAccessor<T>;

  if (typeof accessor === 'string') {
    if (accessor.includes('.')) {
      const accessorArr = accessor.split('.');

      accessorFn = ((data: any) => {
        return accessorArr.reduce((obj, access) => {
          return obj[access];
        }, data);
      }) as NormalizedAccessor<T>;
    } else {
      accessorFn = ((data: any) => data[accessor]) as NormalizedAccessor<T>;
    }
  }

  return accessorFn;
}

/**
 * @deprecated
 * @noDocgen
 */
interface TableHeaderInterface<Shape> {
  /**
   * The label of the column
   *
   * @type string
   */
  label: React.ReactElement | string;

  /**
   * The index of the column
   */
  index?: number;

  /**
   * Callback fired when the header is clicked
   */
  onClick?: (
    colId: number,
    accessorValue: ((data: any) => string) | string,
  ) => void;

  /**
   * A callback to define which property of the data structure to sort on
   */
  sortBy?: ((data: Shape) => string) | string;

  /**
   * A callback to provide more customization in column sorting.
   * This callback has a similar signature to the Array.sort method,
   * with the addition of a `direction` parameter, which has values `asc` or `desc`.
   *
   * Pin a row to the top by returning -1 if `a` matches, and 1 if `b` matches the desired row
   */
  compareFn?: (a: Shape, b: Shape, direction: SortDirection) => number;

  /**
   * A callback that gets called when a user initiates sort on the column.
   * Internal sorting is disabled when this callback is provided.
   */
  handleSort?: (direction: SortDirection) => void;

  /**
   * The type of data as a `DataType`
   */
  dataType?: DataType;
}

export type TableHeaderProps<Shape> = Omit<
  React.ComponentPropsWithoutRef<'th'>,
  keyof TableHeaderInterface<Shape>
> &
  TableHeaderInterface<Shape>;

export type TableHeaderElement = React.ReactComponentElement<
  typeof TableHeader
>;

/**
 * @deprecated
 * @noDocgen
 */
function TableHeader<Shape>({
  label,
  onClick,
  index,
  className,
  dataType,
  sortBy,
  compareFn,
  handleSort,
  ...rest
}: TableHeaderProps<Shape>) {
  const { dispatch } = useTableContext();
  const { sort, setSort } = useSortContext();
  const baseFontSize = useUpdatedBaseFontSize();
  const { theme, darkMode } = useDarkMode();

  React.useEffect(() => {
    if (typeof index === 'number') {
      dispatch({
        type: TableActionTypes.RegisterColumn,
        payload: {
          // Offsetting 0-index
          index: index + 1,
          dataType,
        },
      });
    }
  }, [index, dataType, dispatch]);

  const normalizedAccessor = sortBy && normalizeAccessor(sortBy);
  const isSortable = !!(sortBy || compareFn || handleSort);

  const sortDirection = sort && sort.columnId === index ? sort.direction : null;
  const glyph: 'unsorted' | SortDirection = sortDirection ?? 'unsorted';
  const Glyph = glyphMap[glyph];

  const sortRows = () => {
    if (typeof index === 'number' && isSortable) {
      const newDirection: SortDirection =
        index === sort?.columnId
          ? sort.direction === 'asc'
            ? 'desc'
            : 'asc'
          : 'desc';

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setSort(prevSort => {
        return {
          columnId: index,
          direction: newDirection,
          accessorValue: normalizedAccessor || undefined,
          compareFn,
        };
      });

      handleSort?.(newDirection);
    }
  };

  let ariaSort: React.AriaAttributes['aria-sort'];

  switch (sortDirection) {
    case 'asc':
      ariaSort = 'ascending';
      break;
    case 'desc':
      ariaSort = 'descending';
      break;
    case null:
      ariaSort = 'none';
      break;
    default:
      enforceExhaustive(sortDirection);
  }

  return (
    <th
      role="columnheader"
      scope="col"
      aria-sort={ariaSort}
      {...rest}
      className={cx(
        getCommonCellStyles(baseFontSize),
        thStyle,
        themeStyles[theme].thStyle,
        className,
      )}
    >
      <div className={flexDisplay}>
        <span className={cx(labelStyle, themeStyles[theme].labelStyle)}>
          {label}
        </span>
        {isSortable && (
          <IconButton
            className={iconButtonMargin}
            aria-label="sort"
            onClick={sortRows}
            darkMode={darkMode}
          >
            <Glyph
              size="small"
              title={`${glyph}-${index}`}
              className={cx({
                [themeStyles[theme].glyphColor]:
                  glyph === 'asc' || glyph === 'desc',
              })}
            />
          </IconButton>
        )}
      </div>
    </th>
  );
}

TableHeader.displayName = 'TableHeader';

export default TableHeader;
