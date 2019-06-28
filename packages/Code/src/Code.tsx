import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Syntax, {
  Props as SyntaxProps,
  Variant,
  Lang,
  variantColors,
} from '@leafygreen-ui/syntax';
import LineNumbers from './LineNumbers';
import WindowChrome, { windowChromeHeight } from './WindowChrome';

function stringFragmentIsInvalid(str: string): str is '' | ' ' {
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
    while (stringFragmentIsInvalid(splitString[0])) {
      splitString.shift();
    }

    // If the last line is blank, remove the last line of code.
    // This is a similar issue to the one above.
    while (stringFragmentIsInvalid(splitString[splitString.length - 1])) {
      splitString.pop();
    }

    return {
      content: splitString.join('\n'),
      lineCount: splitString.length,
    };
  }, [snippet]);
}

const whiteSpace = 12;

const wrapperStyle = css`
  overflow-x: auto;
  border: 1px solid;
  border-left-width: 3px;
  border-radius: 4px;
  padding: ${whiteSpace}px;
  margin: 0;
  position: relative;
`;

const wrapperStyleWithLineNumbers = css`
  padding-left: ${whiteSpace * 3.5}px;
`;

const wrapperStyleWithWindowChrome = css`
  padding-top: ${windowChromeHeight + whiteSpace}px;
  border-left-width: 1px;
`;

function getWrapperVariantStyle(variant: Variant): string {
  const colors = variantColors[variant];

  return css`
    border-color: ${colors['01']};
    background-color: ${colors['00']};
    color: ${colors['03']};
  `;
}

interface Props extends SyntaxProps {
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
  lang = Lang.Auto,
  variant = Variant.Light,
  showLineNumbers = false,
  showWindowChrome = false,
  chromeTitle = '',
  ...rest
}: Props) {
  const wrapperClassName = cx(
    wrapperStyle,
    getWrapperVariantStyle(variant),
    {
      [wrapperStyleWithLineNumbers]: multiline && showLineNumbers,
      [wrapperStyleWithWindowChrome]: showWindowChrome,
    },
    className,
  );

  const { content, lineCount } = useProcessedCodeSnippet(children);

  if (!multiline) {
    return (
      <div
        {...(rest as DetailedElementProps<HTMLDivElement>)}
        className={wrapperClassName}
      >
        {showWindowChrome && (
          <WindowChrome chromeTitle={chromeTitle} variant={variant} />
        )}

        <Syntax variant={variant} lang={lang}>
          {content}
        </Syntax>
      </div>
    );
  }

  return (
    <pre
      {...(rest as DetailedElementProps<HTMLPreElement>)}
      className={wrapperClassName}
    >
      {showWindowChrome && (
        <WindowChrome chromeTitle={chromeTitle} variant={variant} />
      )}

      {showLineNumbers && (
        <LineNumbers
          variant={variant}
          lineCount={lineCount}
          className={
            showWindowChrome
              ? css`
                  top: ${windowChromeHeight}px;
                `
              : ''
          }
        />
      )}

      <Syntax variant={variant} lang={lang}>
        {content}
      </Syntax>
    </pre>
  );
}

Code.displayName = 'Code';

Code.propTypes = {
  children: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  lang: PropTypes.oneOf(Object.values(Lang)),
  variant: PropTypes.oneOf(Object.values(Variant)),
  className: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  showWindowChrome: PropTypes.bool,
  chromeTitle: PropTypes.string,
};

export default Code;
