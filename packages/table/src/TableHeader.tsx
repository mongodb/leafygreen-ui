import React, { MouseEventHandler } from 'react';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { commonCellStyles } from './styles';

export interface TableHeaderProps extends React.ComponentPropsWithoutRef<'th'> {
  label: string;
  onClick?: MouseEventHandler;
  index?: number;
}

function TableHeader({ label, onClick, index }: TableHeaderProps) {
  return (
    <th
      className={cx(
        css`
          width: 190px;
          border-width: 0px 1px 3px 1px;
          border-color: ${uiColors.gray.light2};
          border-style: solid;
        `,
        commonCellStyles,
      )}
    >
      <div
        className={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <span
          className={css`
            display: flex;
            align-items: center;
            color: ${uiColors.gray.dark2};
            padding-right: 4px;
          `}
        >
          {label}
          <IconButton aria-label="menu">
            <Icon
              color={uiColors.gray.base}
              glyph="Ellipsis"
              size="small"
              className={css`
                transform: rotate(90deg);
              `}
            />
          </IconButton>
        </span>
        <IconButton aria-label="sort" onClick={() => onClick(index)}>
          <Icon size="small" glyph="ArrowUp" />
        </IconButton>
      </div>
    </th>
  );
}

TableHeader.displayName = 'TableHeader';

export default TableHeader;
