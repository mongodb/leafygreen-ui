import React from 'react';
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
  chromeTitle?: string,

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

  if (!multiline) {
    return (
      <div
        {...(rest as DetailedElementProps<HTMLDivElement>)}
        className={wrapperClassName}
      >
        {showWindowChrome && <WindowChrome chromeTitle={chromeTitle} variant={variant} />}

        <Syntax variant={variant} lang={lang}>
          {children}
        </Syntax>
      </div>
    );
  }

  return (
    <pre
      {...(rest as DetailedElementProps<HTMLPreElement>)}
      className={wrapperClassName}
    >
      {showWindowChrome && <WindowChrome chromeTitle={chromeTitle} variant={variant} />}

      {showLineNumbers && (
        <LineNumbers
          variant={variant}
          content={children}
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
        {children}
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
};

export default Code;
