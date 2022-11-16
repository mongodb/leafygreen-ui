import React, { useRef, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';
import facepaint from 'facepaint';
import debounce from 'lodash/debounce';
import { css, cx } from '@leafygreen-ui/emotion';
import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';
import LeafyGreenProvider, {
  useDarkMode,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { variantColors } from './globalStyles';
import { Language, CodeProps } from './types';
import Syntax from './Syntax';
import Panel from './Panel';
import WindowChrome from './WindowChrome';
import { isComponentType, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transparentize } from 'polished';

export function hasMultipleLines(string: string): boolean {
  return string.trim().includes('\n');
}

// We use max-device-width to select specifically for iOS devices
const mq = facepaint([
  `@media only screen and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 2)`,
  `@media only screen and (min-device-width: 813px) and (-webkit-min-device-pixel-ratio: 2)`,
]);

const singleLineComponentHeight = 36;
const lineHeight = 24;

const wrapperStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    border: 1px solid ${variantColors[Theme.Light][1]};
    border-radius: 12px;
    overflow: hidden;
  `,
  [Theme.Dark]: css`
    border: 1px solid ${variantColors[Theme.Dark][1]};
    border-radius: 12px;
    overflow: hidden;
  `,
};

const contentWrapperStyles = css`
  position: relative;
  display: grid;
  grid-template-areas: 'code panel';
  grid-template-columns: auto 38px;
  border-radius: inherit;
  z-index: 0; // new stacking context
`;

const contentWrapperStylesNoPanel = css`
  // No panel, all code
  grid-template-areas: 'code code';
`;

const contentWrapperStyleWithPicker = css`
  grid-template-areas: 'panel' 'code';
  grid-template-columns: unset;
`;

const codeWrapperStyle = css`
  grid-area: code;
  overflow-x: auto;
  // Many applications have global styles that are adding a border and border radius to this element.
  border-radius: inherit;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 0;
  // We apply left / right padding in Syntax to support line highlighting
  padding-top: ${spacing[2]}px;
  padding-bottom: ${spacing[2]}px;
  margin: 0;
  position: relative;
  transition: box-shadow ${transitionDuration.faster}ms ease-in-out;

  ${mq({
    // Fixes annoying issue where font size is overridden in mobile Safari to be 20px.
    // Ideally, we wouldn't need to set the text to wrap, but from what I can tell, this is the one possible solution to the problem.
    whiteSpace: ['pre', 'pre-wrap', 'pre'],
  })}
`;

const codeWrapperStyleNoPanel = css`
  border-left: 0;
  border-radius: inherit;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
`;
const codeWrapperStyleWithLanguagePicker = css`
  border-left: 0;
  border-radius: inherit;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
`;

const singleLineCodeWrapperStyle = css`
  display: flex;
  align-items: center;
  padding-top: ${(singleLineComponentHeight - lineHeight) / 2}px;
  padding-bottom: ${(singleLineComponentHeight - lineHeight) / 2}px;
`;

const codeWrapperFocusStyle = css`
  &:focus,
  &:active,
  &:focus-visible,
  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px ${palette.blue.light1} inset;
  }
`;

const panelStyles = css`
  z-index: 2; // Above the shadows
  grid-area: panel;
`;

function getCodeWrapperVariantStyle(theme: Theme): string {
  const colors = variantColors[theme];

  return css`
    background-color: ${colors[0]};
    color: ${colors[3]};
  `;
}

const ScrollState = {
  None: 'none',
  Left: 'left',
  Right: 'right',
  Both: 'both',
} as const;

type ScrollState = typeof ScrollState[keyof typeof ScrollState];

const baseScrollShadowStyles = css`
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    z-index: 1; // above the code
    top: 0;
    height: 100%;
    width: 40px;
    border-radius: 40%;
    box-shadow: unset;
    transition: box-shadow ${transitionDuration.faster}ms ease-in-out;
  }
  &:before {
    grid-column: 1;
    left: -40px;
  }
  &:after {
    grid-column: 2; // Placed either under Panel, or on the right edge
  }
`;

const scrollShadowStylesNoPanel = css`
  &:after {
    grid-column: -1; // Placed on the right edge
  }
`;

const scrollShadowStylesWithPicker = css`
  &:before,
  &:after {
    grid-row: 2; // Placed on the top under the Picker Panel
  }
`;

function getScrollShadow(scrollState: ScrollState, theme: Theme): string {
  const dropShadowBefore =
    theme === Theme.Light
      ? `1px 0 10px 0 ${transparentize(0.75, 'black')}`
      : `15px 0px 15px 0 ${transparentize(0.7, 'black')}`;

  const dropShadowAfter =
    theme === Theme.Light
      ? `-1px 0px 10px ${transparentize(0.75, 'black')}`
      : `-15px 0px 15px 0 ${transparentize(0.7, 'black')}`;

  return css`
    &:before {
      ${(scrollState === ScrollState.Both ||
        scrollState === ScrollState.Left) &&
      css`
        box-shadow: ${dropShadowBefore};
      `};
    }
    &:after {
      ${(scrollState === ScrollState.Both ||
        scrollState === ScrollState.Right) &&
      `
        box-shadow: ${dropShadowAfter};
      `};
    }
  `;
}

type DetailedElementProps<T> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

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
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
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
                [codeWrapperFocusStyle]: showFocus,
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
