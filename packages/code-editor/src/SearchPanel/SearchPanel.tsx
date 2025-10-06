import React, {
  ChangeEvent,
  KeyboardEvent,
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

import { Button } from '@leafygreen-ui/button';
import { Checkbox } from '@leafygreen-ui/checkbox';
import { IconButton } from '@leafygreen-ui/icon-button';
import { InputOption } from '@leafygreen-ui/input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Menu, MenuVariant } from '@leafygreen-ui/menu';
import { TextInput } from '@leafygreen-ui/text-input';
import { Body, useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

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
} from './SearchPanel.styles';
import { SearchPanelProps } from './SearchPanel.types';

export function SearchPanel({
  view,
  darkMode,
  baseFontSize: baseFontSizeProp,
}: SearchPanelProps) {
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
  const { theme } = useDarkMode(darkMode);
  const baseFontSize = useUpdatedBaseFontSize();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const findOptions = {
    isCaseSensitive: 'Match case',
    isRegex: 'Regexp',
    isWholeWord: 'By word',
  } as const;
  const [highlightedOption, setHighlightedOption] = useState<string | null>(
    null,
  );

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

  const updateFindCount = useCallback(
    (searchQuery: SearchQuery) => {
      const cursor = searchQuery.getCursor(view.state.doc);
      let count = 0;
      let result = cursor.next();

      while (!result.done) {
        count++;
        result = cursor.next();
      }

      setFindCount(count);
    },
    [view],
  );

  useEffect(() => {
    const newQuery = new SearchQuery({
      search: searchString,
      caseSensitive: isCaseSensitive,
      regexp: isRegex,
      wholeWord: isWholeWord,
      replace: replaceString,
    });

    setQuery(newQuery);
    view.dispatch({ effects: setSearchQuery.of(newQuery) });
    updateFindCount(newQuery);
  }, [
    replaceString,
    searchString,
    isCaseSensitive,
    isRegex,
    isWholeWord,
    view,
    updateFindCount,
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

  const handleFindNext = useCallback(() => {
    findNext(view);
    updateSelectedIndex();
  }, [view, updateSelectedIndex]);

  const handleFindPrevious = useCallback(() => {
    findPrevious(view);
    updateSelectedIndex();
  }, [view, updateSelectedIndex]);

  const handleFindAll = useCallback(() => {
    selectMatches(view);
    updateSelectedIndex();
  }, [view, updateSelectedIndex]);

  const handleReplace = useCallback(() => {
    replaceNext(view);
    updateSelectedIndex();
    updateFindCount(query);
  }, [view, updateSelectedIndex, updateFindCount, query]);

  const handleReplaceAll = useCallback(() => {
    replaceAll(view);
    updateSelectedIndex();
    updateFindCount(query);
  }, [view, updateSelectedIndex, updateFindCount, query]);

  const handleFindInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) {
          handleFindPrevious();
        } else {
          handleFindNext();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeSearchPanel(view);
      }
    },
    [handleFindNext, handleFindPrevious, view],
  );

  const handleReplaceInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleReplace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeSearchPanel(view);
      }
    },
    [handleReplace, view],
  );

  return (
    <div
      className={getContainerStyles({
        theme,
        isOpen,
        baseFontSize: baseFontSizeProp || baseFontSize,
      })}
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
            onChange={handleSearchQueryChange}
            onKeyDown={handleFindInputKeyDown}
            className={findInputStyles}
            value={searchString}
            baseFontSize={baseFontSizeProp || baseFontSize}
            darkMode={darkMode}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            // CodeMirror looks for this attribute to refocus when CMD+F is pressed and the panel is already open
            main-field="true"
          />
          <div className={findOptionsContainerStyles}>
            {searchString && (
              <Body>
                {selectedIndex ?? '?'}/{findCount}
              </Body>
            )}
            <Menu
              trigger={
                <IconButton aria-label="filter button">
                  <Icon glyph="Filter" />
                </IconButton>
              }
              renderDarkMenu={false}
              variant={MenuVariant.Compact}
            >
              {Object.entries(findOptions).map(([key, value]) => (
                <InputOption
                  key={key}
                  as="li"
                  highlighted={highlightedOption === key}
                >
                  <Checkbox
                    label={value}
                    onChange={() => {
                      switch (key) {
                        case 'isCaseSensitive':
                          setIsCaseSensitive(!isCaseSensitive);
                          break;
                        case 'isRegex':
                          setIsRegex(!isRegex);
                          break;
                        case 'isWholeWord':
                          setIsWholeWord(!isWholeWord);
                          break;
                      }
                      setHighlightedOption(key);
                    }}
                  />
                </InputOption>
              ))}
            </Menu>
          </div>
        </div>
        <IconButton
          aria-label="previous item button"
          disabled={!searchString || findCount === 0}
          onClick={handleFindPrevious}
        >
          <Icon glyph="ArrowUp" />
        </IconButton>
        <IconButton
          aria-label="next item button"
          disabled={!searchString || findCount === 0}
          onClick={handleFindNext}
        >
          <Icon glyph="ArrowDown" />
        </IconButton>
        <Button
          className={allButtonStyles}
          disabled={!searchString || findCount === 0}
          onClick={handleFindAll}
          baseFontSize={baseFontSizeProp || baseFontSize}
          darkMode={darkMode}
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
            value={replaceString}
            onChange={handleReplaceQueryChange}
            onKeyDown={handleReplaceInputKeyDown}
            baseFontSize={baseFontSizeProp || baseFontSize}
            darkMode={darkMode}
          />
          <Button
            aria-label="replace button"
            className={replaceButtonStyles}
            onClick={handleReplace}
            baseFontSize={baseFontSizeProp || baseFontSize}
            darkMode={darkMode}
          >
            Replace
          </Button>
          <Button
            aria-label="replace all button"
            className={replaceButtonStyles}
            onClick={handleReplaceAll}
            baseFontSize={baseFontSizeProp || baseFontSize}
            darkMode={darkMode}
          >
            Replace All
          </Button>
        </div>
      </div>
    </div>
  );
}
