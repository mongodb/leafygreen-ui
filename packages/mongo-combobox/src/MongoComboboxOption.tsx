import React from 'react';
import { css } from '@leafygreen-ui/emotion';

export default function MongoComboboxOption({
  name,
  product,
  selected,
  onSelect,
}) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      onClick={onSelect}
      tabIndex={0}
      role="option"
      key={name}
      aria-selected={selected === name}
      className={css`
        list-style: none;
        display: flex;
        justify-content: space-between;
        width: 100%;
      `}
    >
      <span
        className={css`
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        `}
      >
        {name}
      </span>
      <span
        className={css`
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        `}
      >
        {product}
      </span>
    </li>
  );
}
