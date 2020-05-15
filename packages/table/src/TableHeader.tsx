import React from 'react';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { commonCellStyles } from './styles';
import { useTableContext, Types } from './table-context';

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
  glyph?: string;
  isEditable?: boolean;
  stickyColumn?: boolean;
  sortable?: boolean;
  accessor?: string;
}

export type TableHeaderProps = Omit<
  React.ComponentPropsWithoutRef<'th'>,
  keyof TableHeaderInterface
> &
  TableHeaderInterface;

function TableHeader({
  glyph = 'Unsorted',
  isEditable = false,
  sortable = true,
  label,
  onClick,
  index,
  stickyColumn,
  className,
  accessor: accessorProp,
  ...rest
}: TableHeaderProps) {
  const {
    state: { selectable },
    dispatch,
  } = useTableContext();
  const accessor = accessorProp ?? label.toString?.()?.toLowerCase();

  const handleClick = () => {
    if (typeof index === 'number') {
      return onClick?.(index, accessor);
    }
  };

  React.useEffect(() => {
    if (stickyColumn && index) {
      dispatch({
        type: Types.AddStickyColumnIndex,
        payload: selectable ? index + 1 : index,
      });
    }
  }, [stickyColumn]);

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
        <span className={labelStyle}>
          {label}
          {isEditable && (
            <IconButton aria-label="menu">
              <Icon
                color={uiColors.gray.base}
                glyph="VerticalEllipsis"
                size="small"
              />
            </IconButton>
          )}
        </span>
        {sortable && (
          <IconButton aria-label="sort" onClick={handleClick}>
            <Icon size="small" glyph={glyph} title="sorted icon" />
          </IconButton>
        )}
      </div>
    </th>
  );
}

TableHeader.displayName = 'TableHeader';

export default TableHeader;
