import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';
import Syntax, {
  SyntaxProps,
  Language,
  Mode,
  variantColors,
} from '@leafygreen-ui/syntax';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import IconButton from '@leafygreen-ui/icon-button';
import WindowChrome from './WindowChrome';
import debounce from 'lodash/debounce';
import { uiColors } from '@leafygreen-ui/palette';
import ClipboardJS from 'clipboard';

const whiteSpace = 12;

const codeWrapperStyle = css`
  overflow-x: auto;
  border-left: 2px solid;
  padding: ${whiteSpace}px;
  margin: 0;
  position: relative;
  flex-grow: 1;
`;

const codeWrapperStyleWithWindowChrome = css`
  border-left: 0;
`;

const copyStyle = css`
  width: 38px;
  border-left: solid 1px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding-top: 6px;
`;

const singleLineCopyStyle = css`
  padding: 10px;
`;

function getWrapperVariantStyle(mode: Mode): string {
  const colors = variantColors[mode];

  return css`
    border-color: ${colors[1]};
    background-color: ${colors[0]};
    color: ${colors[3]};
  `;
}

function getSidebarVariantStyle(mode: Mode): string {
  const colors = variantColors[mode];

  switch (mode) {
    case Mode.Light:
      return css`
        border-color: ${colors[1]};
        background-color: white;
      `;
    case Mode.Dark:
      return css`
        border-color: ${colors[1]};
        background-color: ${colors[1]};
      `;
  }
}

function getCopyButtonStyle(mode: Mode, copied: boolean): string {
  const baseStyle = css`
    align-self: center;
    color: ${uiColors.gray.base};
  `;

  if (copied) {
    return cx(
      baseStyle,
      css`
        color: ${uiColors.white};
        background-color: ${uiColors.green.base};

        &:focus {
          color: ${uiColors.white};

          &:before {
            background-color: ${uiColors.green.base};
          }
        }

        &:hover {
          color: ${uiColors.white};

          &:before {
            background-color: ${uiColors.green.base};
          }
        }
      `,
    );
  }

  if (mode === Mode.Dark) {
    return cx(
      baseStyle,
      css`
        background-color: ${uiColors.gray.dark3};
      `,
    );
  }

  return baseStyle;
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

interface CodeProps extends Omit<SyntaxProps, 'onCopy'> {
  /**
   * Shows line numbers in preformatted code blocks.
   *
   * default: `false`
   */
  showLineNumbers?: boolean;

  /**
   * Shows window chrome for code block;
   *
   * default: `false`
   */
  showWindowChrome?: boolean;

  /**
   * Renders a file name or other descriptor for a block of code
   */
  chromeTitle?: string;

  /**
   * When true, whitespace and line breaks will be preserved.
   *
   * default: `true`
   * */
  multiline?: boolean;

  /**
   * When true, allows the code block to be copied to the user's clipboard
   *
   * default: `true`
   */
  copyable?: boolean;

  /**
   * Callback fired when Code is copied
   *
   */
  onCopy?: Function;
}

type DetailedElementProps<T> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

interface CodeOuterWrapperProps
  extends Pick<CodeProps, 'chromeTitle' | 'showWindowChrome' | 'darkMode'> {
  children: React.ReactNode;
}

function CodeOuterWrapper({
  children,
  chromeTitle,
  darkMode = false,
  showWindowChrome,
}: CodeOuterWrapperProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;

  const wrapperStyle = css`
    border: 1px solid ${variantColors[mode][1]};
    border-radius: 4px;
    overflow: hidden;
  `;

  return (
    <div className={wrapperStyle}>
      {showWindowChrome && (
        <WindowChrome chromeTitle={chromeTitle} darkMode={darkMode} />
      )}

      <div
        className={css`
          display: flex;
        `}
      >
        {children}
      </div>
    </div>
  );
}

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
 * @param props.multiline When true, whitespace and line breaks will be preserved. Default: `true`
 * @param props.language The language used for syntax highlighing.
 * @param props.darkMode Determines if the code block will be rendered in dark mode. Default: `false`
 * @param props.showLineNumbers When true, shows line numbers in preformatted code blocks. Default: `false`
 * @param props.copyable When true, allows the code block to be copied to the user's clipboard. Default: `true`
 * @param props.onCopy Callback fired when Code is copied
 */
function Code({
  children = '',
  className,
  multiline = true,
  language,
  darkMode = false,
  showLineNumbers = false,
  showWindowChrome = false,
  chromeTitle = '',
  copyable = true,
  onCopy,
  ...rest
}: CodeProps) {
  const scrollableMultiLine = useRef<HTMLPreElement>(null);
  const scrollableSingleLine = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<ScrollState>(ScrollState.None);
  const [copied, setCopied] = useState(false);
  const showCopyBar = !showWindowChrome && copyable;
  const mode = darkMode ? Mode.Dark : Mode.Light;

  useEffect(() => {
    let timeoutId: any;
    const clipboard = new ClipboardJS('.copy-btn');

    if (copied) {
      timeoutId = setTimeout(() => {
        setCopied(false);
        clipboard.destroy();
      }, 1500);
    }

    return () => clearTimeout(timeoutId);
  }, [copied]);

  useIsomorphicLayoutEffect(() => {
    if (multiline) {
      const multilineEl = scrollableMultiLine.current;

      if (
        multilineEl != null &&
        multilineEl.scrollWidth > multilineEl.clientWidth
      ) {
        setScrollState(ScrollState.Right);
      }
    } else {
      const singlelineEl = scrollableSingleLine.current;

      if (
        singlelineEl != null &&
        singlelineEl.scrollWidth > singlelineEl.clientWidth
      ) {
        setScrollState(ScrollState.Right);
      }
    }
  }, [multiline]);

  const wrapperClassName = cx(
    codeWrapperStyle,
    getWrapperVariantStyle(mode),
    {
      [codeWrapperStyleWithWindowChrome]: showWindowChrome,
    },
    className,
    getScrollShadowStyle(scrollState, mode),
  );

  const renderedSyntaxComponent = (
    <Syntax
      showLineNumbers={showLineNumbers}
      darkMode={darkMode}
      language={language}
    >
      {children}
    </Syntax>
  );

  function handleClick() {
    if (onCopy) {
      onCopy();
    }

    setCopied(true);
  }

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

  const copyBar = showCopyBar && (
    <div
      className={cx(
        copyStyle,
        { [singleLineCopyStyle]: !multiline },
        getSidebarVariantStyle(mode),
      )}
    >
      <IconButton
        darkMode={darkMode}
        aria-label="Copy"
        className={cx(getCopyButtonStyle(mode, copied), 'copy-btn')}
        onClick={handleClick}
        data-clipboard-text={children}
      >
        {copied ? <CheckmarkIcon /> : <CopyIcon />}
      </IconButton>
    </div>
  );

  const onScroll: React.UIEventHandler<HTMLDivElement | HTMLPreElement> = e => {
    e.persist();
    debounceScroll(e);
  };

  const commonWrapperProps = {
    chromeTitle,
    darkMode,
    showWindowChrome,
  } as const;

  if (!multiline) {
    return (
      <CodeOuterWrapper {...commonWrapperProps}>
        <div
          {...(rest as DetailedElementProps<HTMLDivElement>)}
          className={wrapperClassName}
          onScroll={onScroll}
          ref={scrollableSingleLine}
        >
          {renderedSyntaxComponent}
        </div>

        {copyBar}
      </CodeOuterWrapper>
    );
  }

  return (
    <CodeOuterWrapper {...commonWrapperProps}>
      <pre
        {...(rest as DetailedElementProps<HTMLPreElement>)}
        className={wrapperClassName}
        onScroll={onScroll}
        ref={scrollableMultiLine}
      >
        {renderedSyntaxComponent}
      </pre>

      {copyBar}
    </CodeOuterWrapper>
  );
}

Code.displayName = 'Code';

Code.propTypes = {
  children: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  language: PropTypes.oneOf(Object.values(Language)),
  darkMode: PropTypes.bool,
  className: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  showWindowChrome: PropTypes.bool,
  chromeTitle: PropTypes.string,
};

export default Code;
