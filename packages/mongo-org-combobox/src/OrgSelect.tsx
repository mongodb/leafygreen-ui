import React, { useState } from 'react';
import {
  Menu,
  FocusableMenuItem,
  MenuItem,
  MenuSeparator,
} from '@leafygreen-ui/menu';
import Icon from '@leafygreen-ui/icon';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import Trigger from './Trigger';

const inputStyle = css`
  margin: 20px 20px 12px 20px;
  height: 30px;
  padding: 0px 24px 0px 12px;
  width: calc(100% - 40px);
  font-size: 14px;
  border: 1px solid ${uiColors.gray.light2};
  border-radius: 5px;

  &: focus {
    border-color: orange;
  }

  &::placeholder {
    color: ${uiColors.gray.light1};
    font-family: 'Akzidenz', Helvetica, Arial, sans-serif;
  }
`;

const magnifyingGlassStyle = css`
  position: absolute;
  top: 28px;
  right: 28px;
  color: ${uiColors.blue.base};
`;

const nameStyle = css`
  font-size: 14px;
  color: ${uiColors.gray.dark3};
`;

const productStyle = css`
  font-size: 12px;
  color: ${uiColors.gray.dark2};
  font-weight: bolder;
`;

interface OrgSelect {
  selected: string;
  data: Array<{ name: string; product: string }>;
  onClick?: React.MouseEventHandler;
}

export default function OrgSelect({ selected, data, onClick }: OrgSelect) {
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const onChange = (e: React.ChangeEvent) => {
    setFilteredData(
      data.filter(datum => {
        return datum.name
          .toLowerCase()
          .includes((e.target as HTMLInputElement).value.toLowerCase());
      }),
    );
  };

  return (
    <Menu
      open={open}
      setOpen={setOpen}
      trigger={<Trigger selected={selected} />}
      className={css`
        width: 280px;
      `}
      justify="start"
    >
      <FocusableMenuItem>
        <input
          placeholder="Search for an organization..."
          className={inputStyle}
          onChange={onChange}
        />
      </FocusableMenuItem>
      <Icon glyph="MagnifyingGlass" className={magnifyingGlassStyle} />
      {filteredData.map(datum => (
        <MenuItem
          key={datum.name}
          className={css`
            flex-direction: row;
            justify-content: space-between;
          `}
          onClick={onClick}
        >
          <div
            className={css`
              display: flex;
              justify-content: space-between;
              width: calc(100% - 20px);
            `}
          >
            <span className={cx(nameStyle)}>{datum.name}</span>
            <span className={cx(productStyle)}>{datum.product}</span>
          </div>
        </MenuItem>
      ))}
      <MenuSeparator />
      <MenuItem>
        <span
          className={css`
            color: ${uiColors.blue.base};
            font-weight: bolder;
          `}
        >
          View All Organizations
        </span>
      </MenuItem>
    </Menu>
  );
}
