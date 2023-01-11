import React from 'react';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { SortState } from '../types';
import { SortIconProps } from './types';
import { palette } from '@leafygreen-ui/palette';

const glyphs: Record<SortState, string> = {
  [SortState.Asc]: 'SortAscending',
  [SortState.Desc]: 'SortDescending',
  [SortState.Off]: 'Unsorted',
  [SortState.None]: '',
};

const glyphColors: Record<SortState, string> = {
  [SortState.Asc]: palette.blue.base,
  [SortState.Desc]: palette.blue.base,
  [SortState.Off]: palette.gray.dark1,
  [SortState.None]: palette.white,
};

const SortIcon = ({
  sortState,
  onSortIconClick,
  ...rest
}: SortIconProps) => {
  const handleClick = (e: any) => {
    onSortIconClick && onSortIconClick(e);
  };

  return (
    <IconButton onClick={handleClick} {...rest}>
      <Icon glyph={glyphs[sortState]} fill={glyphColors[sortState]} />
    </IconButton>
  );
};

export default SortIcon;
