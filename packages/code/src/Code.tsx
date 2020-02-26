import React, { useMemo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Syntax, {
  SyntaxProps,
  Variant,
  Language,
  variantColors,
} from '@leafygreen-ui/syntax';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import LineNumbers from './LineNumbers';
import WindowChrome from './WindowChrome';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { uiColors } from '@leafygreen-ui/palette/src';

function stringFragmentIsBlank(str: string): str is '' | ' ' {
  return str === '' || str === ' ';
}

interface ProcessedCodeSnippet {
  /**
   * A processed string where any line breaks at the beginning or end
   * of the string are trimmed.
   */
  content: string;

  /**
   * A count of the number of separate lines in a given string.
   */
  lineCount: number;
}

function useProcessedCodeSnippet(snippet: string): ProcessedCodeSnippet {
  return useMemo(() => {
    const splitString = snippet.split(/\r|\n/);

    // If first line is blank, remove the first line.
    // This is likely to be common when someone assigns a template literal
    // string to a variable, and doesn't add an '\' escape character after
    // breaking to a new line before the first line of code.
    while (stringFragmentIsBlank(splitString[0])) {
      splitString.shift();
    }

    // If the last line is blank, remove the last line of code.
    // This is a similar issue to the one above.
    while (stringFragmentIsBlank(splitString[splitString.length - 1])) {
      splitString.pop();
    }

    return {
      content: splitString.join('\n'),
      lineCount: splitString.length,
    };
  }, [snippet]);
}

const whiteSpace = 12;

const codeWrapperStyle = css`
  overflow-x: auto;
  border-left: 2px solid;
  padding: ${whiteSpace}px;
  margin: 0;
  position: relative;
`;

const codeWrapperStyleWithLineNumbers = css`
  padding-left: ${whiteSpace * 3.5}px;
`;

const codeWrapperStyleWithWindowChrome = css`
  border-left: 0;
`;

const copyStyle = css`
  width: 38px;
  border-left: solid 1px;
  display: flex;
  flex-direction: column;
  padding-top: 6px;
`;

function getWrapperVariantStyle(variant: Variant): string {
  const colors = variantColors[variant];

  return css`
    border-color: ${colors[1]};
    background-color: ${colors[0]};
    color: ${colors[3]};
  `;
}

function getSidebarVariantStyle(variant: Variant): string {
  const colors = variantColors[variant];

  switch (variant) {
    case 'light':
      return css`
        border-color: ${colors[1]};
        background-color: white;
      `;
    case 'dark':
      return css`
        border-color: ${colors[1]};
        background-color: ${colors[1]};
      `;
  }
}

function getCopyButtonStyle(variant: Variant, copied: boolean): string {
  if (copied) {
    return css`
      align-self: center;
      color: ${uiColors.white};
      background-color: ${uiColors.green.base};
    `;
  }

  if (variant === Variant.Dark) {
    return css`
      align-self: center;
      color: ${uiColors.gray.base};
      background-color: ${uiColors.gray.dark3};
    `;
  }

  return css`
    align-self: center;
    color: ${uiColors.gray.base};
  `;
}

function getScrollShadowStyle(
  canScrollLeft: boolean,
  canScrollRight: boolean,
  variant: Variant,
): string {
  const colors = variantColors[variant];
  const shadowColor =
    variant === Variant.Light ? 'rgba(93,108,116,0.3)' : 'rgba(0,0,0,0.35)';

  if (canScrollLeft && canScrollRight) {
    return css`
      box-shadow: inset 6px 0 6px -6px ${shadowColor},
        inset -6px 0 6px -6px ${shadowColor}, inset 0 6px 6px -6px ${colors[0]},
        inset 0 -6px 6px -6px ${colors[0]};
    `;
  }

  if (canScrollLeft) {
    return css`
      box-shadow: inset 6px 0 6px -6px ${shadowColor};
    `;
  }

  if (canScrollRight) {
    return css`
      box-shadow: inset -6px 0 6px -6px ${shadowColor};
    `;
  }

  return '';
}

interface CodeProps extends SyntaxProps {
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
 * @param props.multiline When true, whitespace and line breaks will be preserved. Default: `true`
 * @param props.lang The language used for syntax highlighing. Default: `auto`
 * @param props.variant Determines if the code block is rendered with a dark or light background. Default: 'light'
 * @param props.showLineNumbers When true, shows line numbers in preformatted code blocks. Default: `false`
 */
function Code({
  children = '',
  className,
  multiline = true,
  language = Language.Auto,
  variant = Variant.Light,
  showLineNumbers = false,
  showWindowChrome = false,
  chromeTitle = '',
  ...rest
}: CodeProps) {
  const [copied, setCopied] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollableElement = useRef<HTMLPreElement>(null);
  useEffect(() => {
    if (!isLoaded && scrollableElement.current !== null) {
      setIsLoaded(true);
      if (
        scrollableElement.current.scrollWidth >
        scrollableElement.current.clientWidth
      ) {
        setCanScrollRight(true);
      }
    }
  });

  const wrapperStyle = css`
    display: block;
    border: 1px solid ${variantColors[variant][1]};
    border-radius: 4px;
    overflow: hidden;
  `;

  const wrapperClassName = cx(
    codeWrapperStyle,
    getWrapperVariantStyle(variant),
    {
      [codeWrapperStyleWithLineNumbers]: multiline && showLineNumbers,
      [codeWrapperStyleWithWindowChrome]: showWindowChrome,
    },
    className,
    getScrollShadowStyle(canScrollLeft, canScrollRight, variant),
  );

  const { content, lineCount } = useProcessedCodeSnippet(children);

  const renderedWindowChrome = showWindowChrome && (
    <WindowChrome chromeTitle={chromeTitle} variant={variant} />
  );

  const renderedSyntaxComponent = (
    <Syntax variant={variant} language={language}>
      {content}
    </Syntax>
  );

  function handleScroll(e: React.UIEvent) {
    const scrollWidth = e.currentTarget.scrollWidth;
    const elementWidth = e.currentTarget.clientWidth;
    const isScrollable = scrollWidth > elementWidth;

    if (isScrollable) {
      const scrollPosition = e.currentTarget.scrollLeft;
      const maxPosition = scrollWidth - elementWidth;
      setCanScrollLeft(scrollPosition > 0);
      setCanScrollRight(scrollPosition < maxPosition);
    }
  }

  if (!multiline) {
    return (
      <div className={wrapperStyle}>
        {renderedWindowChrome}

        <div
          {...(rest as DetailedElementProps<HTMLDivElement>)}
          className={wrapperClassName}
        >
          {renderedSyntaxComponent}
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperStyle}>
      {renderedWindowChrome}
      <div
        className={css`
          display: flex;
        `}
      >
        <pre
          {...(rest as DetailedElementProps<HTMLPreElement>)}
          className={wrapperClassName}
          onScroll={handleScroll}
          ref={scrollableElement}
        >
          {showLineNumbers && (
            <LineNumbers variant={variant} lineCount={lineCount} />
          )}

          {renderedSyntaxComponent}
        </pre>

        {!showWindowChrome && (
          <div className={cx(copyStyle, getSidebarVariantStyle(variant))}>
            <CopyToClipboard
              text={content}
              onCopy={() => {
                setCopied(true);
              }}
            >
              <IconButton
                variant={variant}
                ariaLabel={'Copy'}
                className={getCopyButtonStyle(variant, copied)}
              >
                <Icon glyph={copied ? 'Checkmark' : 'Copy'} />
              </IconButton>
            </CopyToClipboard>
          </div>
        )}
      </div>
    </div>
  );
}

Code.displayName = 'Code';

Code.propTypes = {
  children: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  language: PropTypes.oneOf(Object.values(Language)),
  variant: PropTypes.oneOf(Object.values(Variant)),
  className: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  showWindowChrome: PropTypes.bool,
  chromeTitle: PropTypes.string,
};

export default Code;
