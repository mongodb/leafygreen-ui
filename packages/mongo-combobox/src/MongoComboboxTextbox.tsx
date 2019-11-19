import React from 'react';

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
    >
      <label htmlFor="mongo-combobox-input" id="mongo-combobox-label">
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
      />
    </div>
  );
}
