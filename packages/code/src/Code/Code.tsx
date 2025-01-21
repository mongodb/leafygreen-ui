import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';

import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';
import ChevronDown from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronUp from '@leafygreen-ui/icon/dist/ChevronUp';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';

import { numOfCollapsedLinesOfCode } from '../constants';
import { Syntax } from '../Syntax';
import { Language } from '../types';

import {
  getCodeStyles,
  getCodeWrapperStyles,
  getExpandedButtonStyles,
  wrapperStyle,
} from './Code.styles';
import { CodeProps, DetailedElementProps, ScrollState } from './Code.types';
import CodeContextProvider from '../CodeContext/CodeContext';
import { Panel } from '../Panel';

export function hasMultipleLines(string: string): boolean {
  return string.trim().includes('\n');
}

function getHorizontalScrollbarHeight(element: HTMLElement): number {
  return element.offsetHeight - element.clientHeight;
}

function Code({
  children = '',
  className,
  language: languageProp,
  darkMode: darkModeProp,
  showLineNumbers = false,
  lineNumberStart = 1,
  copyable = true,
  expandable = false,
  onCopy,
  highlightLines = [],
  panel,
  customActionButtons,
  showCustomActionButtons = false,
  chromeTitle,
  languageOptions,
  onChange,
  ...rest
}: CodeProps) {
  const scrollableElementRef = useRef<HTMLPreElement>(null);
  const [scrollState, setScrollState] = useState<ScrollState>(ScrollState.None);
  const [expanded, setExpanded] = useState(!expandable);
  const [numOfLinesOfCode, setNumOfLinesOfCode] = useState<number>();
  const [codeHeight, setCodeHeight] = useState<number>(0);
  const [collapsedCodeHeight, setCollapsedCodeHeight] = useState<number>(0);
  const isMultiline = useMemo(() => hasMultipleLines(children), [children]);
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const baseFontSize = useBaseFontSize();

  useIsomorphicLayoutEffect(() => {
    const scrollableElement = scrollableElementRef.current;

    if (
      scrollableElement != null &&
      scrollableElement.scrollWidth > scrollableElement.clientWidth
    ) {
      setScrollState(ScrollState.Right);
    }
  }, []);

  //TODO: move to utils
  function setExpandableState() {
    if (!expandable || !scrollableElementRef.current) return;

    const scrollableElement = scrollableElementRef.current;
    const scrollbarHeight = getHorizontalScrollbarHeight(scrollableElement);
    const codeHeight = scrollableElement.scrollHeight + scrollbarHeight;
    const linesOfCode = scrollableElement.querySelectorAll('tr');
    let collapsedCodeHeight = codeHeight;

    if (linesOfCode.length > numOfCollapsedLinesOfCode) {
      const topOfCode = scrollableElement.getBoundingClientRect().top;
      const lastVisisbleLineOfCode = linesOfCode[numOfCollapsedLinesOfCode - 1];
      const bottomOfLastVisibleLineOfCode =
        lastVisisbleLineOfCode.getBoundingClientRect().bottom;
      collapsedCodeHeight =
        bottomOfLastVisibleLineOfCode - topOfCode + scrollbarHeight;
    }

    setCodeHeight(codeHeight);
    setCollapsedCodeHeight(collapsedCodeHeight);
    setNumOfLinesOfCode(linesOfCode.length);
  }

  useIsomorphicLayoutEffect(setExpandableState, [
    expandable,
    scrollableElementRef,
    baseFontSize, // will cause changes in code height
  ]);

  const highLightLanguage =
    typeof languageProp === 'string' ? languageProp : languageProp.displayName;

  const renderedSyntaxComponent = (
    <Syntax
      showLineNumbers={showLineNumbers}
      lineNumberStart={lineNumberStart}
      language={highLightLanguage as Language}
      highlightLines={highlightLines}
    >
      {children}
    </Syntax>
  );

  //TODO: move to utils
  function handleScroll(e: React.UIEvent) {
    const { scrollWidth, clientWidth: elementWidth } = e.target as HTMLElement;
    const isScrollable = scrollWidth > elementWidth;

    if (isScrollable) {
      const scrollPosition = (e.target as HTMLElement).scrollLeft;
      const maxPosition = scrollWidth - elementWidth;

      if (scrollPosition > 0 && scrollPosition < maxPosition) {
        setScrollState(ScrollState.Both);
      } else if (scrollPosition > 0) {
        setScrollState(ScrollState.Left);
      } else if (scrollPosition < maxPosition) {
        setScrollState(ScrollState.Right);
      }
    }
  }

  function handleExpandButtonClick() {
    setExpanded(prev => !prev);
  }

  const debounceScroll = debounce(handleScroll, 50, { leading: true });

  const onScroll: React.UIEventHandler<HTMLDivElement | HTMLPreElement> = e => {
    e.persist();
    debounceScroll(e);
  };

  const showExpandButton = !!(
    expandable &&
    numOfLinesOfCode &&
    numOfLinesOfCode > numOfCollapsedLinesOfCode
  );

  const currentLanguage = languageOptions?.find(
    option => option.displayName === highLightLanguage,
  );

  // const shouldRenderTempPanelSubComponent =
  //   (!panel &&
  //     showCustomActionButtons &&
  //     customActionButtons &&
  //     customActionButtons.length > 0) ||
  //   (!panel && !!chromeTitle) ||
  //   (!panel &&
  //     languageOptions &&
  //     languageOptions.length > 0 &&
  //     typeof languageProp !== 'string' &&
  //     !!currentLanguage) ||
  //   (!panel && copyable) ||
  //   (!panel && !!chromeTitle);

  const shouldRenderTempPanelSubComponent =
    !panel &&
    ((showCustomActionButtons &&
      !!customActionButtons &&
      customActionButtons.length > 0) ||
      !!chromeTitle ||
      (!!languageOptions &&
        languageOptions.length > 0 &&
        typeof languageProp !== 'string' &&
        !!currentLanguage &&
        !!onChange) ||
      copyable);

  const showPanel = !!panel || shouldRenderTempPanelSubComponent;

  console.log(
    {
      shouldRenderTempPanelSubComponent,
      showPanel,
      hasCustomActionButtons:
        showCustomActionButtons &&
        !!customActionButtons &&
        customActionButtons.length > 0,
      hasChormeTitle: !!chromeTitle,
      hasLanguageOptions:
        !!languageOptions &&
        languageOptions.length > 0 &&
        typeof languageProp !== 'string' &&
        !!currentLanguage &&
        !!onChange,
      isCopyable: copyable,
      currentLanguage,
      highLightLanguage,
    },
    '🤡',
  );

  return (
    <CodeContextProvider
      darkMode={darkMode}
      contents={children}
      language={languageProp}
    >
      <div className={wrapperStyle[theme]}>
        <div
          className={getCodeStyles({
            scrollState,
            theme,
            showPanel,
            showExpandButton,
          })}
        >
          <pre
            {...(rest as DetailedElementProps<HTMLPreElement>)}
            className={getCodeWrapperStyles({
              theme,
              showPanel,
              expanded,
              codeHeight,
              collapsedCodeHeight,
              isMultiline,
              showExpandButton,
              className,
            })}
            onScroll={onScroll}
            ref={scrollableElementRef}
            // Adds to Tab order when content is scrollable, otherwise overflowing content is inaccessible via keyboard navigation
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={scrollState !== ScrollState.None ? 0 : -1}
          >
            {renderedSyntaxComponent}
          </pre>

          {!!panel && panel}

          {/* if there are props then manually render the panel component */}
          {/* TODO: remove when deprecated props are removed */}
          {shouldRenderTempPanelSubComponent && (
            <Panel
              showCustomActionButtons={showCustomActionButtons}
              customActionButtons={customActionButtons}
              title={chromeTitle}
              languageOptions={languageOptions}
              onChange={onChange}
            />
          )}

          {showExpandButton && (
            <button
              className={getExpandedButtonStyles({ theme })}
              onClick={handleExpandButtonClick}
              data-testid="lg-code-expand_button"
            >
              {expanded ? <ChevronUp /> : <ChevronDown />}
              Click to{' '}
              {expanded ? 'collapse' : `expand (${numOfLinesOfCode} lines)`}
            </button>
          )}
        </div>
      </div>
    </CodeContextProvider>
  );
}

Code.displayName = 'Code';

Code.propTypes = {
  children: PropTypes.string.isRequired,
  language: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(Language)),
    PropTypes.string,
  ]),
  darkMode: PropTypes.bool,
  className: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  lineNumberStart: PropTypes.number,
  showWindowChrome: PropTypes.bool,
  chromeTitle: PropTypes.string,
  highlightLines: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.number,
    ]),
  ),
};

export default Code;
