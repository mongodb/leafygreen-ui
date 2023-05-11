import React, { MouseEventHandler } from 'react';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { SortState } from '../HeaderCell.types';

import { SortIconProps } from './SortIcon.types';

const glyphs: Record<SortState, string> = {
  [SortState.Asc]: 'SortAscending',
  [SortState.Desc]: 'SortDescending',
  [SortState.Off]: 'Unsorted',
  [SortState.None]: '',
};

const themeGlyphColors: Record<
  Theme,
  Record<Exclude<SortState, 'none'>, string>
> = {
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

const SortIcon = ({ sortState, onSortIconClick, ...rest }: SortIconProps) => {
  const { theme } = useDarkMode();

  const handleClick: MouseEventHandler = e => {
    onSortIconClick?.(e);
  };

  if (sortState === SortState.None) {
    return <></>;
  } else {
    return (
      <IconButton onClick={handleClick} {...rest}>
        <Icon
          glyph={glyphs[sortState]}
          fill={themeGlyphColors[theme][sortState]}
        />
      </IconButton>
    );
  }
};

export default SortIcon;
