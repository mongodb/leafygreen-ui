import React from 'react';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { commonCellStyles } from './styles';
import { useTableContext, Types } from './table-context';
import { DataType } from './utils';

const thStyle = css`
  width: 144px;
  border-width: 0px 1px 3px 1px;
  border-color: ${uiColors.gray.light2};
  border-style: solid;
`;

const stickyTh = css`
  top: 0;
  left: 0;
  z-index: 2;
  position: sticky;
`;

const flexDisplay = css`
  display: flex;
  justify-content: space-between;
`;

const labelStyle = css`
  display: flex;
  align-items: center;
  color: ${uiColors.gray.dark2};
  padding-right: 4px;
`;

interface TableHeaderInterface {
  label: React.ReactElement | string;
  onClick?: (colId: number, key: string) => void;
  index?: number;
  glyph?: 'SortAscending' | 'SortDescending' | 'Unsorted';
  stickyColumn?: boolean;
  sortable?: boolean;
  accessor?: Function | string;
  dataType?: DataType;
}

export type TableHeaderProps = Omit<
  React.ComponentPropsWithoutRef<'th'>,
  keyof TableHeaderInterface
> &
  TableHeaderInterface;

function TableHeader({
  glyph = 'Unsorted',
  sortable = false,
  stickyColumn = false,
  label,
  onClick,
  index,
  className,
  dataType,
  accessor: accessorProp,
  ...rest
}: TableHeaderProps) {
  const {
    state: { selectable },
    dispatch,
  } = useTableContext();

  let accessor: string = label.toString().toLowerCase();

  if (accessorProp) {
    if (typeof accessorProp === 'function') {
      accessor = accessorProp();
    } else {
      accessor = accessorProp;
    }
  }

  const handleClick = () => {
    if (typeof index === 'number') {
      return onClick?.(index, accessor);
    }
  };

  React.useEffect(() => {
    if (typeof index === 'number') {
      dispatch({
        type: Types.SetColumnInfo,
        payload: {
          index: selectable ? index + 2 : index + 1,
          sticky: stickyColumn,
          dataType,
        },
      });
    }
  }, [stickyColumn, dataType]);

  return (
    <th
      {...rest}
      className={cx(
        thStyle,
        commonCellStyles,
        { [stickyTh]: stickyColumn },
        className,
      )}
    >
      <div className={flexDisplay}>
        <span className={labelStyle}>{label}</span>
        {sortable && (
          <IconButton aria-label="sort" onClick={handleClick}>
            <Icon size="small" glyph={glyph} />
          </IconButton>
        )}
      </div>
    </th>
  );
}

TableHeader.displayName = 'TableHeader';

export default TableHeader;
