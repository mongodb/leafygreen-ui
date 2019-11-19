import React from 'react';
import { css } from '@leafygreen-ui/emotion';

import MongoComboboxOption from './MongoComboboxOption';

export default function MongoComboboxListbox({ data, selected, onSelect }) {
  return (
    <ul
      aria-labelledby="mongo-combobox-label"
      role="listbox"
      id="mongo-combobox-listbox"
      className={css`
        padding-left: 0px;
      `}
    >
      {data.map(datum => (
        <MongoComboboxOption
          key={datum.name}
          name={datum.name}
          product={datum.product}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
