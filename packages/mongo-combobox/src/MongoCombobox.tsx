import React, { useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import Popover from '@leafygreen-ui/popover';
import { uiColors } from '@leafygreen-ui/palette';
import Trigger from './Trigger';
import MongoComboboxTextbox from './MongoComboboxTextbox';
import MongoComboboxListbox from './MongoComboboxListbox';

const containerStyle = css`
  background-color: ${uiColors.white};
  border: 1px solid #dee0e3;
  box-shadow: 0px 2px 6px 0px #dee0e3;
  padding: 16px;
  width: 282px;
`;

const linkStyle = css`
  color: ${uiColors.blue.base};
  text-decoration: none;
  margin-top: 15px;
  font-size: 14px;
  font-weight: bolder;
`;

const resetButtonStyle = css`
  padding: 0px;
  border: 0px;
`;

interface MongoComboboxProps {
  children?: React.ReactNode;
  selected: string;
  title: string;
  data: Array<{ name: string; product: string }>;
  placeholder: string;
  onSelect?: React.MouseEventHandler;
}

export default function MongoCombobox({
  selected,
  title,
  data,
  placeholder,
  onSelect,
}: MongoComboboxProps) {
  const [active, setActive] = useState(false);
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

  console.log(active);

  return (
    <Trigger selected={selected} onClick={() => setActive(curr => !curr)}>
      <Popover active={active}>
        {/* container div that prevents popover from closing when content inside is clicked */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div onClick={e => e.stopPropagation()} className={containerStyle}>
          <MongoComboboxTextbox
            title={title}
            placeholder={placeholder}
            onChange={onChange}
          />
          <MongoComboboxListbox
            data={filteredData}
            selected={selected}
            onSelect={onSelect}
          />
          <div
            className={css`
              width: 100%;
              border: 1px solid ${uiColors.gray.light2};
            `}
          />
          <button className={cx(linkStyle, resetButtonStyle)}>
            View All Organizations
          </button>
        </div>
      </Popover>
    </Trigger>
  );
}
