import React from 'react';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { SortState } from '../types';
import { SortIconProps } from './types';
import { palette } from '@leafygreen-ui/palette';

const glyphs: Record<SortState, string> = {
  [SortState.Ascending]: 'SortAscending',
  [SortState.Descending]: 'SortDescending',
  [SortState.Off]: 'Unsorted',
};

const glyphColors: Record<SortState, string> = {
  [SortState.Ascending]: palette.blue.base,
  [SortState.Descending]: palette.blue.base,
  [SortState.Off]: palette.gray.dark1,
};

const SortIcon = ({
  sortState,
  onSortIconClick,
  ...rest
}: SortIconProps) => {
  const getNextState = () => {
    const allStates = Object.keys(glyphs);
    return allStates[(allStates.indexOf(sortState) + 1) % allStates.length];
  };

  const handleClick = () => {
    const newSortState = getNextState();
    onSortIconClick(newSortState);
  };

  return (
    <IconButton onClick={handleClick} {...rest}>
      <Icon glyph={glyphs[sortState]} fill={glyphColors[sortState]} />
    </IconButton>
  );
};

export default SortIcon;
