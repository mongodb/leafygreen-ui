import React, { ChangeEvent, MouseEvent, useCallback, useState } from 'react';
import {
  closeSearchPanel,
  findNext,
  findPrevious,
  replaceAll,
  replaceNext,
  SearchQuery,
  selectMatches,
  setSearchQuery,
} from '@codemirror/search';

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

  const handleCloseButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      closeSearchPanel(view);
    },
    [view],
  );

  const handleFindInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newQuery = new SearchQuery({
        search: 'test',
        caseSensitive: true,
        regexp: false,
        wholeWord: false,
        replace: '',
      });

      view.dispatch({ effects: setSearchQuery.of(newQuery) });

      // if (!query || !query.eq(newQuery)) {
      //   setQuery(newQuery);
      //   view.dispatch({ effects: setSearchQuery.of(newQuery) });
      // }
    },
    [view],
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
          <TextInput
            placeholder="Find"
            aria-labelledby="find"
            onChange={handleFindInputChange}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
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
          onClick={handleCloseButtonClick}
        >
          <Icon glyph="X" />
        </IconButton>
      </div>
    </div>
  );
}
