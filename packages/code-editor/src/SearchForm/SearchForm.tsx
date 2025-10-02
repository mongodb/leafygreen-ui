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
import { Body } from '@leafygreen-ui/typography';

import { Icon } from '../../../icon/src/Icon';

import {
  allButtonStyles,
  closeButtonStyles,
  findInputContainerStyles,
  findInputStyles,
  findOptionsContainerStyles,
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
  const [replaceString, setReplaceString] = useState('');
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [isWholeWord, setIsWholeWord] = useState(false);
  const [isRegex, setIsRegex] = useState(false);
  const [query, setQuery] = useState<SearchQuery>(
    new SearchQuery({
      search: searchString,
      caseSensitive: isCaseSensitive,
      regexp: isRegex,
      wholeWord: isWholeWord,
      replace: replaceString,
    }),
  );
  const [findCount, setFindCount] = useState(0);
  const { theme } = useDarkMode();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const updateSelectedIndex = useCallback(() => {
    const cursor = query.getCursor(view.state.doc);
    const selection = view.state.selection.main;

    let index = 1;
    let result = cursor.next();

    while (!result.done) {
      if (
        result.value.from === selection.from &&
        result.value.to === selection.to
      ) {
        setSelectedIndex(index);
        return;
      }
      index++;
      result = cursor.next();
    }

    setSelectedIndex(null);
  }, [query, view]);

  const updateFindCount = useCallback(() => {
    const cursor = query.getCursor(view.state.doc);
    let count = 0;
    let result = cursor.next();

    while (!result.done) {
      count++;
      result = cursor.next();
    }

    setFindCount(count);
  }, [query, view]);

  useEffect(() => {
    const newQuery = new SearchQuery({
      search: searchString,
      caseSensitive: isCaseSensitive,
      regexp: isRegex,
      wholeWord: isWholeWord,
      replace: replaceString,
    });

    setQuery(newQuery);
    view.dispatch({ effects: setSearchQuery.of(query) });
    updateFindCount();
  }, [
    replaceString,
    searchString,
    isCaseSensitive,
    isRegex,
    isWholeWord,
    view,
    updateFindCount,
    query,
  ]);

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

  const handleReplaceQueryChange = useCallback(
    (_e: ChangeEvent<HTMLInputElement>) => {
      setReplaceString(_e.target.value);
    },
    [],
  );

  const handleFindFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      findNext(view);
      updateSelectedIndex();
    },
    [view, updateSelectedIndex],
  );

  const handleNextClick = useCallback(() => {
    findNext(view);
    updateSelectedIndex();
  }, [view, updateSelectedIndex]);

  const handlePreviousClick = useCallback(() => {
    findPrevious(view);
    updateSelectedIndex();
  }, [view, updateSelectedIndex]);

  const handleReplace = useCallback(() => {
    replaceNext(view);
    updateSelectedIndex();
    updateFindCount();
  }, [view, updateSelectedIndex, updateFindCount]);

  const handleReplaceAll = useCallback(() => {
    replaceAll(view);
    updateSelectedIndex();
    updateFindCount();
  }, [view, updateSelectedIndex, updateFindCount]);

  const handleReplaceFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleReplace();
    },
    [handleReplace],
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
          <div className={findOptionsContainerStyles}>
            {searchString && (
              <Body>
                {selectedIndex ?? '?'}/{findCount}
              </Body>
            )}
            <IconButton aria-label="filter button">
              <Icon glyph="Filter" />
            </IconButton>
          </div>
        </div>
        <IconButton
          aria-label="previous item button"
          disabled={!searchString || findCount === 0}
          onClick={handlePreviousClick}
        >
          <Icon glyph="ArrowUp" />
        </IconButton>
        <IconButton
          aria-label="next item button"
          disabled={!searchString || findCount === 0}
          onClick={handleNextClick}
        >
          <Icon glyph="ArrowDown" />
        </IconButton>
        <Button
          className={allButtonStyles}
          disabled={!searchString || findCount === 0}
          onClick={() => {
            selectMatches(view);
            setSelectedIndex(null);
          }}
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
          <form onSubmit={handleReplaceFormSubmit}>
            <TextInput
              placeholder="Replace"
              aria-labelledby="replace"
              className={replaceInputContainerStyles}
              value={replaceString}
              onChange={handleReplaceQueryChange}
            />
          </form>
          <Button
            aria-label="replace button"
            className={replaceButtonStyles}
            onClick={handleReplace}
          >
            Replace
          </Button>
          <Button
            aria-label="replace all button"
            className={replaceButtonStyles}
            onClick={handleReplaceAll}
          >
            Replace All
          </Button>
        </div>
      </div>
    </div>
  );
}
