import React from 'react';
import SortAscendingIcon from '@leafygreen-ui/icon/dist/SortAscending';
import SortDescendingIcon from '@leafygreen-ui/icon/dist/SortDescending';
import UnsortedIcon from '@leafygreen-ui/icon/dist/Unsorted';
import IconButton from '@leafygreen-ui/icon-button';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { commonCellStyles } from './styles';
import { useTableContext, Types } from './TableContext';
import { DataType } from './utils';

const thStyle = css`
  width: 144px;
  border-width: 0px 1px 3px 1px;
  border-color: ${uiColors.gray.light2};
  border-style: solid;
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

const glyphMap = {
  unsorted: UnsortedIcon,
  asc: SortAscendingIcon,
  desc: SortDescendingIcon,
};

interface TableHeaderInterface {
  label: React.ReactElement | string;
  onClick?: (colId: number, accessorValue: (data: any) => string) => void;
  index?: number;
  sortBy?: (data: any) => string | string;
  dataType?: DataType;
}

export type TableHeaderProps = Omit<
  React.ComponentPropsWithoutRef<'th'>,
  keyof TableHeaderInterface
> &
  TableHeaderInterface;

function TableHeader({
  label,
  onClick,
  index,
  className,
  dataType,
  sortBy,
  ...rest
}: TableHeaderProps) {
  const {
    state: { selectable, sort },
    dispatch,
  } = useTableContext();

  const glyph = sort?.direction ?? 'unsorted';
  const Glyph = glyphMap[glyph];

  const handleClick = () => {
    if (typeof index === 'number') {
      return onClick?.(index, sortBy!);
    }
  };

  React.useEffect(() => {
    if (typeof index === 'number') {
      dispatch({
        type: Types.SetColumnInfo,
        payload: {
          // Offsetting 0-indexed columns
          index: selectable ? index + 2 : index + 1,
          dataType,
        },
      });
    }
  }, [dataType]);

  return (
    <th {...rest} className={cx(thStyle, commonCellStyles, className)}>
      <div className={flexDisplay}>
        <span className={labelStyle}>{label}</span>
        {sortBy != null && (
          <IconButton
            aria-label="sort"
            onClick={handleClick}
            className={css`
              margin-bottom: 2px;
            `}
          >
            <Glyph
              size="small"
              title={`${glyph}-${index}`}
              className={cx({
                [css`
                  color: ${uiColors.blue.base};
                `]: glyph === 'asc' || glyph === 'desc',
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
