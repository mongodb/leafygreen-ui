import React, { ChangeEvent, MouseEvent, useCallback, useState } from 'react';
import { closeSearchPanel } from '@codemirror/search';

import Button from '@leafygreen-ui/button';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import TextInput from '@leafygreen-ui/text-input';

import { Icon } from '../../../icon/src/Icon';

import {
  allButtonStyles,
  closeButtonStyles,
  findInputContainerStyles,
  findInputIconButtonStyles,
  findInputStyles,
  findSectionStyles,
  getContainerStyles,
  getReplaceInnerSectionStyles,
  getToggleIconStyles,
  replaceButtonStyles,
  replaceInputContainerStyles,
  replaceSectionStyles,
  toggleButtonStyles,
} from './SearchForm.styles';
import { SearchFormProps } from './SearchForm.types';

export function SearchForm({ view }: SearchFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useDarkMode();

  const handleToggleButtonClick = useCallback(
    (_e: MouseEvent<HTMLButtonElement>) => {
      setIsOpen(currState => !currState);
    },
    [],
  );

  const handleCloseButtonClick = useCallback(
    (_e: MouseEvent<HTMLButtonElement>) => {
      closeSearchPanel(view);
    },
    [view],
  );

  const handleFindInputChange = useCallback(
    (_e: ChangeEvent<HTMLInputElement>) => {
      // const newQuery = new SearchQuery({
      //   search: 'test',
      //   caseSensitive: true,
      //   regexp: false,
      //   wholeWord: false,
      //   replace: '',
      // });
      // view.dispatch({ effects: setSearchQuery.of(newQuery) });
      // if (!query || !query.eq(newQuery)) {
      //   setQuery(newQuery);
      //   view.dispatch({ effects: setSearchQuery.of(newQuery) });
      // }
    },
    [],
  );

  return (
    <div
      className={getContainerStyles({ theme, isOpen })}
      data-no-context-menu="true"
    >
      <div className={findSectionStyles}>
        <IconButton
          className={toggleButtonStyles}
          aria-label="Toggle button"
          aria-expanded={isOpen}
          onClick={handleToggleButtonClick}
        >
          <Icon glyph="ChevronDown" className={getToggleIconStyles(isOpen)} />
        </IconButton>
        <div className={findInputContainerStyles}>
          <TextInput
            placeholder="Find"
            aria-labelledby="find"
            onChange={handleFindInputChange}
            className={findInputStyles}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <IconButton
            className={findInputIconButtonStyles}
            aria-label="filter button"
          >
            <Icon glyph="Filter" />
          </IconButton>
        </div>
        <IconButton aria-label="next item button">
          <Icon glyph="ArrowUp" />
        </IconButton>
        <IconButton aria-label="previous item button">
          <Icon glyph="ArrowDown" />
        </IconButton>
        <Button className={allButtonStyles}>All</Button>
        <IconButton
          aria-label="close find menu button"
          onClick={handleCloseButtonClick}
          className={closeButtonStyles}
        >
          <Icon glyph="X" />
        </IconButton>
      </div>
      <div
        className={replaceSectionStyles}
        // @ts-expect-error - react type issue: https://github.com/facebook/react/pull/24730
        inert={!isOpen ? 'inert' : undefined}
        aria-hidden={!isOpen}
      >
        <div className={getReplaceInnerSectionStyles(theme)}>
          <TextInput
            placeholder="Replace"
            aria-labelledby="replace"
            className={replaceInputContainerStyles}
          />
          <Button aria-label="replace button" className={replaceButtonStyles}>
            Replace
          </Button>
          <Button
            aria-label="replace all button"
            className={replaceButtonStyles}
          >
            Replace All
          </Button>
        </div>
      </div>
    </div>
  );
}
