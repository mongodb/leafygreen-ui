import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  closeSearchPanel,
  findNext,
  findPrevious,
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
  const [searchString, setSearchString] = useState('');
  const [findCount, setFindCount] = useState(0);
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

  const handleSearchQueryChange = useCallback(
    (_e: ChangeEvent<HTMLInputElement>) => {
      setSearchString(_e.target.value);
    },
    [],
  );

  useEffect(() => {
    const query = new SearchQuery({
      search: searchString,
      caseSensitive: true,
      regexp: false,
      wholeWord: false,
      replace: '',
    });

    view.dispatch({ effects: setSearchQuery.of(query) });

    const cursor = query.getCursor(view.state.doc);
    let count = 0;

    let result = cursor.next();

    while (!result.done) {
      count++;
      result = cursor.next();
    }

    setFindCount(count);
  }, [searchString, view]);

  const handleFindFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      findNext(view);
    },
    [view],
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
          <form onSubmit={handleFindFormSubmit}>
            <TextInput
              placeholder="Find"
              aria-labelledby="find"
              onChange={handleSearchQueryChange}
              className={findInputStyles}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={searchString}
            />
          </form>
          <IconButton
            className={findInputIconButtonStyles}
            aria-label="filter button"
          >
            <Icon glyph="Filter" />
          </IconButton>
        </div>
        <IconButton
          aria-label="previous item button"
          disabled={!searchString || findCount === 0}
          onClick={() => findPrevious(view)}
        >
          <Icon glyph="ArrowUp" />
        </IconButton>
        <IconButton
          aria-label="next item button"
          disabled={!searchString || findCount === 0}
          onClick={() => findNext(view)}
        >
          <Icon glyph="ArrowDown" />
        </IconButton>
        <Button
          className={allButtonStyles}
          disabled={!searchString || findCount === 0}
          onClick={() => selectMatches(view)}
        >
          All
        </Button>
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
