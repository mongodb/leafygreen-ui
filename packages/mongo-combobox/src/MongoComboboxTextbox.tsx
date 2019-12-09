import React from 'react';
import Icon from '@leafygreen-ui/icon';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const containerStyle = css`
  text-align: initial;
  position: relative;
`;

const inputStyle = css`
  width: 100%;
  padding: 8px;
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
  font-size: 14px;
  border: 1px solid ${uiColors.gray.light2};
  border-radius: 5px;

  &::placeholder {
    color: ${uiColors.gray.light1};
    font-family: 'Akzidenz', Helvetica, Arial, sans-serif;
  }
`;

const iconStyle = css`
  position: absolute;
  right: 8px;
  top: 8px;
  color: ${uiColors.blue.base};
`;

interface MongoComboboxTextboxProps {
  title: string;
  placeholder: string;
  onChange: React.ChangeEventHandler;
}

export default function MongoComboboxTextbox({
  placeholder,
  onChange,
}: MongoComboboxTextboxProps) {
  return (
    <div
      role="combobox"
      aria-controls="mongo-combobox-input"
      aria-expanded={true}
      aria-owns="mongo-combobox-listbox"
      aria-haspopup="listbox"
      id="mongo-combobox"
      className={containerStyle}
    >
      <input
        type="text"
        aria-autocomplete="list"
        aria-controls="mongo-combobox-listbox"
        aria-label="mongo-combobox-texbox"
        id="mongo-combobox-input"
        aria-activedescendant=""
        placeholder={placeholder}
        onChange={onChange}
        className={inputStyle}
      />
      <Icon glyph="MagnifyingGlass" className={iconStyle} />
    </div>
  );
}
