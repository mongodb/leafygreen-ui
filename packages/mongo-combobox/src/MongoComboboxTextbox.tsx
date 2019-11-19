import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const containerStyle = css`
  text-align: initial;
`;

const labelStyle = css`
  font-size: 16px;
  line-height: 19px;
  font-weight: bolder;
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
`;

const inputStyle = css`
  margin-top: 14px;
  margin-bottom: 12px;
  width: 100%;
  padding: 8px;
  border: 1px solid ${uiColors.blue.base};
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
`;

interface MongoComboboxTextboxProps {
  title: string;
  placeholder: string;
  onChange: React.ChangeEventHandler;
}

export default function MongoComboboxTextbox({
  title,
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
      <label
        htmlFor="mongo-combobox-input"
        id="mongo-combobox-label"
        className={labelStyle}
      >
        {title}
      </label>
      <input
        type="text"
        aria-autocomplete="list"
        aria-controls="mongo-combobox-listbox"
        id="mongo-combobox-input"
        aria-activedescendant=""
        placeholder={placeholder}
        onChange={onChange}
        className={inputStyle}
      />
    </div>
  );
}
