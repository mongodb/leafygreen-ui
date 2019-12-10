import React, { useState } from 'react';
import {
  Menu,
  FocusableMenuItem,
  MenuItem,
  MenuSeparator,
} from '@leafygreen-ui/menu';
import { uiColors } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';
import { keyMap } from '@leafygreen-ui/lib';
import Input from './Input';
import Trigger from './Trigger';

const menuContainerStyle = css`
  width: 280px;
  padding-top: 20px;
`;

const listContainerStyle = css`
  max-height: ${36 * 5}px;
  overflow-y: auto;
`;

const ulContainerStyle = css`
  padding-left: 1px;
`;

const menuItemContainerStyle = css`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: left;
`;

const optionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 20px);
`;

const nameStyle = css`
  font-size: 14px;
  color: ${uiColors.gray.dark3};
`;

const productStyle = css`
  font-size: 12px;
  color: ${uiColors.gray.dark2};
  font-weight: bolder;
  white-space: nowrap;
`;

const viewAllStyle = css`
  color: ${uiColors.blue.base};
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

  const onKeyDown: React.KeyboardEventHandler = e => {
    if (e.keyCode === keyMap.ArrowDown || e.keyCode === keyMap.ArrowUp) {
      e.preventDefault();
    }
  };

  return (
    <Menu
      open={open}
      setOpen={setOpen}
      trigger={<Trigger selected={selected} />}
      className={menuContainerStyle}
      justify="start"
    >
      <FocusableMenuItem>
        <Input onChange={onChange} onKeyDown={onKeyDown} />
      </FocusableMenuItem>
      <li
        role="none"
        onKeyDown={e => e.preventDefault()}
        className={listContainerStyle}
      >
        <ul className={ulContainerStyle}>
          {filteredData.map(datum => (
            <MenuItem
              key={datum.name}
              className={menuItemContainerStyle}
              onClick={onClick}
            >
              <div className={optionStyle}>
                <span className={nameStyle}>{datum.name}</span>
                <span className={productStyle}>{datum.product}</span>
              </div>
            </MenuItem>
          ))}
        </ul>
      </li>
      <MenuSeparator />
      <MenuItem onKeyDown={onKeyDown}>
        <span className={viewAllStyle}>View All Organizations</span>
      </MenuItem>
    </Menu>
  );
}
