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

function getVariantStyle(variant: Variant): string {
  const colors = variantColors[variant];

  return css`
    border-color: ${colors['01']};
    background-color: ${colors['00']};
    color: ${colors['03']};
  `;
}

const wrapperVariants: { [K in Variant]: string } = {
  [Variant.Light]: getVariantStyle(Variant.Light),
  [Variant.Dark]: getVariantStyle(Variant.Dark),
} as const;

interface Props extends SyntaxProps {
  /**
   * Shows line numbers in preformatted code blocks.
   *
   * default: `false`
   */
  showLineNumbers?: boolean;

  /**
   * When true, whitespace and line breaks will be preserved.
   *
   * default: `true`
   * */
  multiline: boolean;
}

type DetailedPreProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
type DetailedDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

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
 * @param props.variant Determines if the code block is rendered with a dark or light background. Default: 'light'
 * @param props.multiline When true, whitespace and line breaks will be preserved. Default: `true`
 * @param props.showLineNumbers When true, shows line numbers in preformatted code blocks. Default: `false`
 * @param props.lang The language used for syntax highlighing. Default: `auto`
 */
function Code({
  children = '',
  className,
  multiline = true,
  lang = Lang.Auto,
  variant = Variant.Light,
  showLineNumbers = false,
  ...rest
}: Props) {
  const wrapperClassName = cx(
    wrapperStyle,
    wrapperVariants[variant],
    {
      [wrapperStyleWithLineNumbers]: showLineNumbers,
    },
    className,
  );

  if (!multiline) {
    return (
      <div {...(rest as DetailedDivProps)} className={wrapperClassName}>
        <Syntax variant={variant} lang={lang}>
          {children}
        </Syntax>
      </div>
    );
  }

  return (
    <pre {...(rest as DetailedPreProps)} className={wrapperClassName}>
      {showLineNumbers && <LineNumbers variant={variant} content={children} />}

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
