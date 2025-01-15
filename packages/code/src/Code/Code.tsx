import React, { useMemo, useRef, useState } from 'react';
import ClipboardJS from 'clipboard';
import debounce from 'lodash/debounce';

import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';
import ChevronDown from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronUp from '@leafygreen-ui/icon/dist/ChevronUp';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';

import { numOfCollapsedLinesOfCode } from '../constants';
import { Syntax } from '../Syntax';
import { Language } from '../types';

import { CodeSkeleton } from '@leafygreen-ui/skeleton-loader';

import {
  getCopyButtonWithoutPanelStyles,
  getCodeStyles,
  getCodeWrapperStyles,
  getExpandedButtonStyles,
  getWrapperStyles,
  getLoadingStyles,
} from './Code.styles';
import {
  CodeProps,
  CopyButtonAppearance,
  DetailedElementProps,
  ScrollState,
} from './Code.types';
import CodeContextProvider from '../CodeContext/CodeContext';
import CopyButton from '../CopyButton/CopyButton';

// TODO: move to utils
export function hasMultipleLines(string: string): boolean {
  return string.trim().includes('\n');
}

// TODO: move to utils
function getHorizontalScrollbarHeight(element: HTMLElement): number {
  return element.offsetHeight - element.clientHeight;
}

function Code({
  language: languageProp,
  darkMode: darkModeProp,
  showLineNumbers = false,
  lineNumberStart = 1,
  expandable = false,
  isLoading = false,
  highlightLines = [],
  copyButtonAppearance = CopyButtonAppearance.Hover,
  children = '',
  className,
  onCopy,
  panel,
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

  const hasPanel = !!panel;

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
    numOfLinesOfCode > numOfCollapsedLinesOfCode &&
    !isLoading
  );

  return (
    <CodeContextProvider
      darkMode={darkMode}
      contents={children}
      language={languageProp}
      hasPanel={hasPanel}
      isLoading={isLoading}
    >
      {/* TODO: note in changeset that className was moved to the parent wrapper */}
      <div className={getWrapperStyles({ theme, className })}>
        <div
          className={getCodeStyles({
            scrollState,
            theme,
            hasPanel,
            showExpandButton,
          })}
        >
          {!isLoading && (
            <pre
              {...(rest as DetailedElementProps<HTMLPreElement>)}
              className={getCodeWrapperStyles({
                theme,
                hasPanel,
                expanded,
                codeHeight,
                collapsedCodeHeight,
                isMultiline,
                showExpandButton,
              })}
              onScroll={onScroll}
              ref={scrollableElementRef}
              // Adds to Tab order when content is scrollable, otherwise overflowing content is inaccessible via keyboard navigation
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={scrollState !== ScrollState.None ? 0 : -1}
            >
              {renderedSyntaxComponent}
            </pre>
          )}

          {isLoading && <CodeSkeleton className={getLoadingStyles(theme)} />}

          {/* This div is below the pre tag so that we can target it using the css sibiling selector when the pre tag is hovered */}
          {!hasPanel &&
            !isLoading &&
            copyButtonAppearance !== CopyButtonAppearance.None &&
            ClipboardJS.isSupported() && (
              <div
                className={getCopyButtonWithoutPanelStyles({
                  copyButtonAppearance,
                })}
              >
                <CopyButton onCopy={onCopy} contents={children} />
              </div>
            )}

          {!!panel && panel}

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

export default Code;
