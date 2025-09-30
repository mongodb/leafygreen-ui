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
  const [findCount, setFindCount] = useState(0);
  const { theme } = useDarkMode();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  const computeSelectedIndex = useCallback(() => {
    const query = new SearchQuery({
      search: searchString,
      caseSensitive: true,
      regexp: false,
      wholeWord: false,
      replace: '',
    });

    const cursor = query.getCursor(view.state.doc);
    const selection = view.state.selection.main;

    let index = 1;
    let result = cursor.next();

    while (!result.done) {
      if (
        result.value.from === selection.from &&
        result.value.to === selection.to
      ) {
        return index;
      }
      index++;
      result = cursor.next();
    }

    return null;
  }, [searchString, view]);

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

    // Update selected index if current selection matches one of the results
    const selection = view.state.selection.main;
    const cursor2 = query.getCursor(view.state.doc);
    let idx = 1;
    let res2 = cursor2.next();
    let currentIndex: number | null = null;

    while (!res2.done) {
      if (
        res2.value.from === selection.from &&
        res2.value.to === selection.to
      ) {
        currentIndex = idx;
        break;
      }
      idx++;
      res2 = cursor2.next();
    }

    setSelectedIndex(currentIndex);
  }, [searchString, view, computeSelectedIndex]);

  const handleFindFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      findNext(view);
      setSelectedIndex(computeSelectedIndex());
    },
    [view, computeSelectedIndex],
  );

  const handleNextClick = useCallback(() => {
    findNext(view);
    setSelectedIndex(computeSelectedIndex());
  }, [view, computeSelectedIndex]);

  const handlePreviousClick = useCallback(() => {
    findPrevious(view);
    setSelectedIndex(computeSelectedIndex());
  }, [view, computeSelectedIndex]);

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
