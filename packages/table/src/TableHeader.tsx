import React from 'react';
import SortAscendingIcon from '@leafygreen-ui/icon/dist/SortAscending';
import SortDescendingIcon from '@leafygreen-ui/icon/dist/SortDescending';
import UnsortedIcon from '@leafygreen-ui/icon/dist/Unsorted';
import IconButton from '@leafygreen-ui/icon-button';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { commonCellStyles } from './styles';
import { useSortContext } from './SortContext';
import { useTableContext, TableActionTypes, DataType } from './TableContext';
import { enforceExhaustive } from '@leafygreen-ui/lib';
import { useDarkModeContext } from './DarkModeContext';

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

const modeStyles = {
  [Mode.Light]: {
    thStyle: css`
      border-color: ${uiColors.gray.light2};
    `,
    labelStyle: css`
      color: ${uiColors.gray.dark2};
    `,
    glyphColor: css`
      color: ${uiColors.blue.base};
    `,
  },

  [Mode.Dark]: {
    thStyle: css`
      background-color: ${uiColors.gray.dark3};
      border-color: ${uiColors.gray.dark1};
    `,
    labelStyle: css`
      color: ${uiColors.gray.light2};
    `,
    glyphColor: css`
      color: ${uiColors.blue.light1};
    `,
  },
};

const thStyle = css`
  border-width: 0px 1px 3px 1px;
  border-style: solid;
`;

const flexDisplay = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 32px;
`;

const labelStyle = css`
  padding-right: 4px;
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
  label: React.ReactElement | string;
  onClick?: (
    colId: number,
    accessorValue: ((data: any) => string) | string,
  ) => void;
  index?: number;
  sortBy?: ((data: Shape) => string) | string;
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
  ...rest
}: TableHeaderProps<Shape>) {
  const { dispatch } = useTableContext();
  const { sort, setSort } = useSortContext();
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

  const sortDirection = sort && sort.columnId === index ? sort.direction : null;
  const glyph: 'unsorted' | 'asc' | 'desc' = sortDirection ?? 'unsorted';
  const Glyph = glyphMap[glyph];

  const sortRows = () => {
    if (typeof index === 'number' && normalizedAccessor) {
      setSort(prevSort => ({
        columnId: index,
        direction:
          index === prevSort?.columnId
            ? prevSort.direction === 'asc'
              ? 'desc'
              : 'asc'
            : 'desc',
        accessorValue: normalizedAccessor,
      }));
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
        thStyle,
        modeStyles[mode].thStyle,
        commonCellStyles,
        className,
      )}
    >
      <div className={flexDisplay}>
        <span className={cx(labelStyle, modeStyles[mode].labelStyle)}>
          {label}
        </span>
        {sortBy != null && (
          <IconButton aria-label="sort" onClick={sortRows} darkMode={darkMode}>
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
