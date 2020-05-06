import React from 'react';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { commonCellStyles } from './styles';

const thStyle = css`
  width: 190px;
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

interface TableHeaderInterface {
  label: string;
  onClick?: (colId: number | undefined) => void;
  index?: number;
  glyph?: string;
  isEditable?: boolean;
}

export type TableHeaderProps = Omit<
  React.ComponentPropsWithoutRef<'th'>,
  keyof TableHeaderInterface
> &
  TableHeaderInterface;

function TableHeader({
  glyph = 'Unsorted',
  label,
  onClick,
  index,
  isEditable = false,
}: TableHeaderProps) {
  return (
    <th className={cx(thStyle, commonCellStyles)}>
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
        <IconButton aria-label="sort" onClick={() => onClick?.(index)}>
          <Icon size="small" glyph={glyph} />
        </IconButton>
      </div>
    </th>
  );
}

TableHeader.displayName = 'TableHeader';

export default TableHeader;
