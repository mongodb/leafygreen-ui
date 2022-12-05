import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import SortAscendingIcon from '@leafygreen-ui/icon/dist/SortAscending';
import SortDescendingIcon from '@leafygreen-ui/icon/dist/SortDescending';
import UnsortedIcon from '@leafygreen-ui/icon/dist/Unsorted';
import IconButton from '@leafygreen-ui/icon-button';
import { enforceExhaustive } from '@leafygreen-ui/lib';
import { palette, uiColors } from '@leafygreen-ui/palette';

import { useDarkModeContext } from './DarkModeContext';
import { useFontSizeContext } from './FontSizeContext';
import { SortDirection, useSortContext } from './SortContext';
import { getCommonCellStyles } from './styles';
import { DataType, TableActionTypes, useTableContext } from './TableContext';

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

const modeStyles = {
  [Mode.Light]: {
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

  [Mode.Dark]: {
    thStyle: css`
      background-color: ${uiColors.gray.dark3};
      border-color: ${uiColors.gray.dark1};
    `,
    labelStyle: css`
      color: ${uiColors.gray.light3};
    `,
    glyphColor: css`
      color: ${uiColors.blue.light1};
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
  const baseFontSize = useFontSizeContext();
  const darkMode = useDarkModeContext();

  const mode = darkMode ? Mode.Dark : Mode.Light;

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
        modeStyles[mode].thStyle,
        {
          // TODO: Refresh - remove darkMode overrides
          [css`
            font-size: 14px;
            border-width: 0px 1px 3px 1px;
          `]: darkMode,
        },
        className,
      )}
    >
      <div className={flexDisplay}>
        <span className={cx(labelStyle, modeStyles[mode].labelStyle)}>
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
                [modeStyles[mode].glyphColor]:
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
