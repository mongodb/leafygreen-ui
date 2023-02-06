import React, { useEffect, useMemo, useRef, useState } from 'react';
import ClipboardJS from 'clipboard';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';

import { Panel } from '../Panel';
import { Syntax } from '../Syntax';
import { CodeProps, Language } from '../types';
import { WindowChrome } from '../WindowChrome';

import {
  baseScrollShadowStyles,
  codeWrapperStyle,
  codeWrapperStyleNoPanel,
  codeWrapperStyleWithLanguagePicker,
  contentWrapperStyles,
  contentWrapperStylesNoPanel,
  contentWrapperStyleWithPicker,
  getCodeWrapperVariantStyle,
  getScrollShadow,
  panelStyles,
  scrollShadowStylesNoPanel,
  scrollShadowStylesWithPicker,
  singleLineCodeWrapperStyle,
  wrapperStyle,
} from './Code.styles';
import { DetailedElementProps, ScrollState } from './Code.types';

export function hasMultipleLines(string: string): boolean {
  return string.trim().includes('\n');
}

/**
 *
 * React Component that outputs single-line and multi-line code blocks.
 *
 * @param props.children The string to be formatted.
 * @param props.className An additional CSS class added to the root element of Code.
 * @param props.language The language used for syntax highlighting.
 * @param props.darkMode Determines if the code block will be rendered in dark mode. Default: `false`
 * @param props.showLineNumbers When true, shows line numbers in preformatted code blocks. Default: `false`
 * @param props.lineNumberStart Specifies the numbering of the first line in the block. Default: 1
 * @param props.copyable When true, allows the code block to be copied to the user's clipboard. Default: `true`
 * @param props.onCopy Callback fired when Code is copied
 */
function Code({
  children = '',
  className,
  language: languageProp,
  darkMode: darkModeProp,
  showLineNumbers = false,
  lineNumberStart = 1,
  showWindowChrome = false,
  chromeTitle = '',
  copyable = true,
  onCopy,
  highlightLines = [],
  languageOptions,
  onChange,
  customActionButtons = [],
  showCustomActionButtons = false,
  usePortal = true,
  portalClassName,
  portalContainer,
  scrollContainer,
  popoverZIndex,
  ...rest
}: CodeProps) {
  const scrollableElementRef = useRef<HTMLPreElement>(null);
  const [scrollState, setScrollState] = useState<ScrollState>(ScrollState.None);
  const [showCopyBar, setShowCopyBar] = useState(false);
  const isMultiline = useMemo(() => hasMultipleLines(children), [children]);
  const { theme, darkMode } = useDarkMode(darkModeProp);

  const filteredCustomActionIconButtons = customActionButtons.filter(
    (item: React.ReactElement) => isComponentType(item, 'IconButton') === true,
  );

  const showCustomActionsInPanel =
    showCustomActionButtons && !!filteredCustomActionIconButtons.length;

  const currentLanguage = languageOptions?.find(
    option => option.displayName === languageProp,
  );

  const showPanel =
    !showWindowChrome &&
    (copyable || !!currentLanguage || showCustomActionsInPanel);

  const highlightLanguage = currentLanguage
    ? currentLanguage.language
    : languageProp;

  const showLanguagePicker = !!currentLanguage;

  useEffect(() => {
    setShowCopyBar(copyable && ClipboardJS.isSupported());
  }, [copyable, showWindowChrome]);

  useIsomorphicLayoutEffect(() => {
    const scrollableElement = scrollableElementRef.current;

    if (
      scrollableElement != null &&
      scrollableElement.scrollWidth > scrollableElement.clientWidth
    ) {
      setScrollState(ScrollState.Right);
    }
  }, []);

  const renderedSyntaxComponent = (
    <Syntax
      showLineNumbers={showLineNumbers}
      lineNumberStart={lineNumberStart}
      language={highlightLanguage as Language}
      highlightLines={highlightLines}
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

  const debounceScroll = debounce(handleScroll, 50, { leading: true });

  const onScroll: React.UIEventHandler<HTMLDivElement | HTMLPreElement> = e => {
    e.persist();
    debounceScroll(e);
  };

  const popoverProps = {
    popoverZIndex,
    ...(usePortal
      ? {
          usePortal,
          portalClassName,
          portalContainer,
          scrollContainer,
        }
      : { usePortal }),
  } as const;

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div className={wrapperStyle[theme]}>
        {showWindowChrome && <WindowChrome chromeTitle={chromeTitle} />}

        <div
          className={cx(
            contentWrapperStyles,
            baseScrollShadowStyles,
            getScrollShadow(scrollState, theme),
            {
              [contentWrapperStyleWithPicker]: showLanguagePicker,
              [scrollShadowStylesWithPicker]: showLanguagePicker,
              [contentWrapperStylesNoPanel]: !showPanel,
              [scrollShadowStylesNoPanel]: !showPanel,
            },
          )}
        >
          <pre
            {...(rest as DetailedElementProps<HTMLPreElement>)}
            className={cx(
              codeWrapperStyle,
              getCodeWrapperVariantStyle(theme),
              {
                [codeWrapperStyleWithLanguagePicker]: showLanguagePicker,
                [codeWrapperStyleNoPanel]: !showPanel,
                [singleLineCodeWrapperStyle]: !isMultiline,
              },
              className,
            )}
            onScroll={onScroll}
            ref={scrollableElementRef}
            // Adds to Tab order when content is scrollable, otherwise overflowing content is inaccessible via keyboard navigation
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={scrollState !== ScrollState.None ? 0 : -1}
          >
            {renderedSyntaxComponent}
          </pre>

          {/* Can make this a more robust check in the future */}
          {/* Right now the panel will only be rendered with copyable or a language switcher */}
          {showPanel && (
            <Panel
              className={cx(panelStyles)}
              language={currentLanguage}
              languageOptions={languageOptions}
              onChange={onChange}
              contents={children}
              onCopy={onCopy}
              showCopyButton={showCopyBar}
              isMultiline={isMultiline}
              customActionButtons={filteredCustomActionIconButtons}
              showCustomActionButtons={showCustomActionsInPanel}
              {...popoverProps}
            />
          )}
        </div>
      </div>
    </LeafyGreenProvider>
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
