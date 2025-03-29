import React, { useMemo, useRef, useState } from 'react';
import ClipboardJS from 'clipboard';
import debounce from 'lodash/debounce';

import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';
import ChevronDown from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronUp from '@leafygreen-ui/icon/dist/ChevronUp';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { CodeSkeleton } from '@leafygreen-ui/skeleton-loader';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import CodeContextProvider from '../CodeContext/CodeContext';
import { numOfCollapsedLinesOfCode } from '../constants';
import CopyButton from '../CopyButton/CopyButton';
import { Syntax } from '../Syntax';
import { Language } from '../types';
import { DEFAULT_LGID_ROOT, getLgIds } from '../utils/getLgIds';

import {
  getCodeStyles,
  getCodeWrapperStyles,
  getCopyButtonWithoutPanelStyles,
  getExpandedButtonStyles,
  getLoadingStyles,
  getWrapperStyles,
} from './Code.styles';
import {
  CodeProps,
  CopyButtonAppearance,
  DetailedElementProps,
  ScrollState,
} from './Code.types';
import { getHorizontalScrollbarHeight, hasMultipleLines } from './utils';

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
  customKeywords,
  'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
  baseFontSize: baseFontSizeProp,
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
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);

  const lgIds = getLgIds(dataLgId);

  const showPanel = !!panel;

  if (
    // @ts-expect-error detecting deprecated props
    rest.copyable ||
    // @ts-expect-error detecting deprecated props
    rest.showCustomActionButtons ||
    // @ts-expect-error detecting deprecated props
    rest.languageOptions ||
    // @ts-expect-error detecting deprecated props
    rest.customActionButtons ||
    // @ts-expect-error detecting deprecated props
    rest.chromeTitle ||
    // @ts-expect-error detecting deprecated props
    rest.onChange
  ) {
    console.warn(
      'The following props are deprecated and have been removed: copyable, showCustomActionButtons, languageOptions, customActionButtons, chromeTitle, onChange. Please use the Panel component instead.',
    );
  }

  useIsomorphicLayoutEffect(() => {
    const scrollableElement = scrollableElementRef.current;

    if (
      scrollableElement != null &&
      scrollableElement.scrollWidth > scrollableElement.clientWidth
    ) {
      setScrollState(ScrollState.Right);
    }
  }, []);

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

  const renderedSyntaxComponent = (
    <Syntax
      showLineNumbers={showLineNumbers}
      lineNumberStart={lineNumberStart}
      language={languageProp as Language}
      highlightLines={highlightLines}
      customKeywords={customKeywords}
    >
      {children}
    </Syntax>
  );

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

  const showCopyButtonWithoutPanel =
    !showPanel &&
    copyButtonAppearance !== CopyButtonAppearance.None &&
    ClipboardJS.isSupported() &&
    !isLoading;

  return (
    <CodeContextProvider
      darkMode={darkMode}
      contents={children}
      language={languageProp}
      isLoading={isLoading}
      showPanel={showPanel}
      lgids={lgIds}
    >
      <div
        className={getWrapperStyles({ theme, className })}
        data-language={languageProp}
        data-lgid={dataLgId}
      >
        <div
          className={getCodeStyles({
            scrollState,
            theme,
            showPanel,
            showExpandButton,
            isLoading,
          })}
        >
          {!isLoading && (
            <pre
              data-testid={lgIds.pre}
              {...(rest as DetailedElementProps<HTMLPreElement>)}
              className={getCodeWrapperStyles({
                theme,
                showPanel,
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

          {isLoading && (
            <CodeSkeleton
              data-testid={lgIds.skeleton}
              data-lgid={lgIds.skeleton}
              className={getLoadingStyles(theme)}
            />
          )}

          {/* This div is below the pre tag so that we can target it using the css sibiling selector when the pre tag is hovered */}
          {showCopyButtonWithoutPanel && (
            <CopyButton
              className={getCopyButtonWithoutPanelStyles({
                copyButtonAppearance,
              })}
              onCopy={onCopy}
              contents={children}
            />
          )}

          {!!panel && panel}

          {showExpandButton && (
            <button
              className={getExpandedButtonStyles({ theme })}
              onClick={handleExpandButtonClick}
              data-testid={lgIds.expandButton}
              data-lgid={lgIds.expandButton}
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
