import React from 'react';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { SortState } from '../types';
import { SortIconProps } from './SortIcon.types';
import { palette } from '@leafygreen-ui/palette';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';

const glyphs: Record<SortState, string> = {
  [SortState.Asc]: 'SortAscending',
  [SortState.Desc]: 'SortDescending',
  [SortState.Off]: 'Unsorted',
  [SortState.None]: '',
};

const themeGlyphColors: Record<Theme, Record<SortState, string>> = {
  [Theme.Dark]: {
    [SortState.Asc]: palette.blue.base,
    [SortState.Desc]: palette.blue.base,
    [SortState.Off]: palette.gray.light1,
  },
  [Theme.Light]: {
    [SortState.Asc]: palette.blue.base,
    [SortState.Desc]: palette.blue.base,
    [SortState.Off]: palette.gray.dark1,
  },
};

const SortIcon = ({
  sortState,
  onSortIconClick,
  ...rest
}: SortIconProps) => {
  const { theme } = useDarkMode();
  const handleClick = (e: any) => {
    onSortIconClick && onSortIconClick(e);
  };

  return (
    <IconButton onClick={handleClick} {...rest}>
      <Icon glyph={glyphs[sortState]} fill={themeGlyphColors[theme][sortState]} />
    </IconButton>
  );
};

export default SortIcon;
