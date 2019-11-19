import React, { MouseEventHandler } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const liStyle = css`
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 31px;
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
`;

const truncate = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const nameStyle = css`
  color: ${uiColors.blue.base};
  font-size: 14px;
  line-height: 21px;
`;

const productStyle = css`
  color: ${uiColors.gray.base};
  font-size: 11px;
  line-height: 21px;
`;

interface MongoComboboxOptionProps {
  name: string;
  product: string;
  selected: string;
  onSelect: MouseEventHandler;
}

export default function MongoComboboxOption({
  name,
  product,
  selected,
  onSelect,
}: MongoComboboxOptionProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      onClick={onSelect}
      tabIndex={0}
      role="option"
      key={name}
      aria-selected={selected === name}
      className={liStyle}
    >
      <span className={cx(nameStyle, truncate)}>{name}</span>
      <span className={cx(productStyle, truncate)}>{product}</span>
    </li>
  );
}
