import React, { MouseEvent, useCallback, useState } from 'react';

import Button from '@leafygreen-ui/button';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import TextInput from '@leafygreen-ui/text-input';

import { Icon } from '../../../icon/src/Icon';

import {
  findInputContainerStyles,
  findInputIconButtonStyles,
  findSectionStyles,
  getIconStyles,
  getSearchFormContainerStyles,
} from './SearchForm.styles';
import { SearchFormProps } from './SearchForm.types';

export function SearchForm({ view }: SearchFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useDarkMode();

  const handleToggleButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      setIsOpen(currState => !currState);
    },
    [],
  );

  return (
    <div className={getSearchFormContainerStyles(theme)}>
      <div className={findSectionStyles}>
        <IconButton
          // className={toggleButtonStyles}
          aria-label="Toggle button"
          aria-expanded={isOpen}
          onClick={handleToggleButtonClick}
        >
          <Icon glyph="ChevronDown" className={getIconStyles(isOpen)} />
        </IconButton>
        <div className={findInputContainerStyles}>
          <TextInput placeholder="Find" aria-labelledby="find" />
          <IconButton
            className={findInputIconButtonStyles}
            aria-label="filter button"
            // onClick={}
          >
            <Icon glyph="Filter" />
          </IconButton>
        </div>
        <IconButton
          aria-label="next item button"
          // onClick={}
        >
          <Icon glyph="ArrowUp" />
        </IconButton>
        <IconButton
          aria-label="previous item button"
          // onClick={}
        >
          <Icon glyph="ArrowDown" />
        </IconButton>
        <Button>All</Button>
        <IconButton
          aria-label="close find menu button"
          // onClick={}
        >
          <Icon glyph="X" />
        </IconButton>
      </div>
    </div>
  );
}
