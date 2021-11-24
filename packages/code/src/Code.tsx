import React, { useRef, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';
import facepaint from 'facepaint';
import debounce from 'lodash/debounce';
import { css, cx } from '@leafygreen-ui/emotion';
import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';
import { spacing } from '@leafygreen-ui/tokens';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { variantColors } from './globalStyles';
import { Language, CodeProps, Mode } from './types';
import Syntax from './Syntax';
import Panel from './Panel';
import WindowChrome from './WindowChrome';
import { isComponentType } from '@leafygreen-ui/lib';

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

const codeWrapperStyle = css`
  overflow-x: auto;
  // Many applications have global styles that are adding a border and border radius to this element.
  border-radius: 0;
  border: 0;
  // We apply left / right padding in Syntax to support line highlighting
  padding-top: ${spacing[2]}px;
  padding-bottom: ${spacing[2]}px;
  margin: 0;
  position: relative;
  flex-grow: 1;

  ${mq({
    // Fixes annoying issue where font size is overridden in mobile Safari to be 20px.
    // Ideally, we wouldn't need to set the text to wrap, but from what I can tell, this is the one possible solution to the problem.
    whiteSpace: ['pre', 'pre-wrap', 'pre'],
  })}
`;

const codeWrapperStyleWithWindowChrome = css`
  border-left: 0;
`;

const singleLineWrapperStyle = css`
  display: flex;
  align-items: center;
  padding-top: ${(singleLineComponentHeight - lineHeight) / 2}px;
  padding-bottom: ${(singleLineComponentHeight - lineHeight) / 2}px;
`;

const wrapperFocusStyle = css`
  &:focus {
    outline: none;
  }
`;

const languagePickerStyle = css`
  display: flex;
  flex-direction: column-reverse;
  width: 700px;
`;

function getWrapperVariantStyle(mode: Mode): string {
  const colors = variantColors[mode];

  const borderStyle =
    mode === 'dark' ? `border: 0` : `border-color: ${colors[1]}`;

  return css`
    ${borderStyle};
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

function getScrollShadowStyle(scrollState: ScrollState, mode: Mode): string {
  const colors = variantColors[mode];
  const shadowColor =
    mode === Mode.Light ? 'rgba(93,108,116,0.3)' : 'rgba(0,0,0,0.35)';

  if (scrollState === ScrollState.Both) {
    return css`
      box-shadow: inset 6px 0 6px -6px ${shadowColor},
        inset -6px 0 6px -6px ${shadowColor}, inset 0 6px 6px -6px ${colors[0]},
        inset 0 -6px 6px -6px ${colors[0]};
    `;
  }

  if (scrollState === ScrollState.Left) {
    return css`
      box-shadow: inset 6px 0 6px -6px ${shadowColor};
    `;
  }

  if (scrollState === ScrollState.Right) {
    return css`
      box-shadow: inset -6px 0 6px -6px ${shadowColor};
    `;
  }

  return '';
}

type DetailedElementProps<T> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

/**
 * # Code
 *
 * React Component that outputs single-line and multi-line code blocks.
 *
 * ```
<Code>Hello world!</Code>
  ```
 * ---
 * @param props.children The string to be formatted.
 * @param props.className An additional CSS class added to the root element of Code.
 * @param props.language The language used for syntax highlighing.
 * @param props.darkMode Determines if the code block will be rendered in dark mode. Default: `false`
 * @param props.showLineNumbers When true, shows line numbers in preformatted code blocks. Default: `false`
 * @param props.lineOffset Specifies the number by which to offset line numbers. Default: 0
 * @param props.copyable When true, allows the code block to be copied to the user's clipboard. Default: `true`
 * @param props.onCopy Callback fired when Code is copied
 */
function Code({
  children = '',
  className,
  language: languageProp,
  darkMode = false,
  showLineNumbers = false,
  lineOffset = 0,
  showWindowChrome = false,
  chromeTitle = '',
  copyable = true,
  onCopy,
  highlightLines = [],
  languageOptions,
  onChange,
  customActionButtons = [],
  showCustomActionButtons = false,
  ...rest
}: CodeProps) {
  const scrollableElementRef = useRef<HTMLPreElement>(null);
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const [scrollState, setScrollState] = useState<ScrollState>(ScrollState.None);
  const [showCopyBar, setShowCopyBar] = useState(false);
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const isMultiline = useMemo(() => hasMultipleLines(children), [children]);

  const filteredCustomActionIconButtons = customActionButtons.filter(
    (item: React.ReactNode) => isComponentType(item, 'IconButton') === true,
  );

  const showCustomActionsInPanel =
    showCustomActionButtons && !!filteredCustomActionIconButtons.length;

  const currentLanguage = languageOptions?.find(
    option => option.displayName === languageProp,
  );

  const highlightLanguage = currentLanguage
    ? currentLanguage.language
    : languageProp;

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

  const wrapperClassName = cx(
    css`
      border: ${currentLanguage ? '1px solid;' : '2px solid;'};
    `,
    codeWrapperStyle,
    getWrapperVariantStyle(mode),
    {
      [codeWrapperStyleWithWindowChrome]: showWindowChrome,
    },
    className,
    getScrollShadowStyle(scrollState, mode),
    { [singleLineWrapperStyle]: !isMultiline },
    { [wrapperFocusStyle]: !showFocus },
  );

  const renderedSyntaxComponent = (
    <Syntax
      showLineNumbers={showLineNumbers}
      lineOffset={lineOffset}
      darkMode={darkMode}
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

  const borderStyle = darkMode
    ? `border: 0`
    : `border: 1px solid ${variantColors[mode][1]}`;

  const wrapperStyle = css`
    ${borderStyle};
    border-radius: 4px;
    overflow: hidden;
  `;

  return (
    <div className={wrapperStyle}>
      {showWindowChrome && (
        <WindowChrome chromeTitle={chromeTitle} darkMode={darkMode} />
      )}

      <div
        className={cx(
          css`
            display: flex;
          `,
          {
            [languagePickerStyle]: !!currentLanguage,
          },
        )}
      >
        <pre
          {...(rest as DetailedElementProps<HTMLPreElement>)}
          className={wrapperClassName}
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
        {!showWindowChrome &&
          (copyable || !!currentLanguage || showCustomActionsInPanel) && (
            <Panel
              language={currentLanguage}
              languageOptions={languageOptions}
              onChange={onChange}
              contents={children}
              onCopy={onCopy}
              showCopyButton={showCopyBar}
              darkMode={darkMode}
              isMultiline={isMultiline}
              customActionButtons={filteredCustomActionIconButtons}
              showCustomActionButtons={showCustomActionsInPanel}
            />
          )}
      </div>
    </div>
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
  lineOffset: PropTypes.number,
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
