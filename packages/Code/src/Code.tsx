import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Syntax, {
  SupportedLanguages,
  Props as SyntaxProps,
  Variants,
} from '@leafygreen-ui/syntax';

const codeWhiteSpace = 12;

const wrapperStyle = css`
  overflow-x: auto;
  border: 1px solid;
  border-left-width: 3px;
  border-radius: 4px;
  padding: ${codeWhiteSpace}px;
  margin: 0;
  position: relative;
`;

const wrapperStyleWithLineNumbers = css`
  padding-left: ${codeWhiteSpace * 3.5}px;
`;

const wrapperVariants: { [K in Variants]: string } = {
  [Variants.Light]: css`
    border-color: #e7eeec;
    background-color: #f9fbfa;
    color: #21313c;
  `,

  [Variants.Dark]: css`
    border-color: #061621;
    background-color: #21313c;
    color: #f9fbfa;
  `,
} as const;

const lineNumberStyles = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${codeWhiteSpace}px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 13px;
  line-height: 24px;
`;

const lineNumberVariants: { [K in Variants]: string } = {
  [Variants.Light]: css`
    color: #b8c4c2;
  `,

  [Variants.Dark]: css`
    color: #5d6c74;
  `,
} as const;

interface Props extends SyntaxProps {
  /**
   * When true, whitespace and line breaks will be preserved.
   *
   * default: `true`
   * */
  multiline: boolean;

  /**
   * Shows line numbers in preformatted code blocks.
   *
   * default: `false`
   */
  showLineNumbers?: boolean;
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
 * @param props.children Any React node.
 * @param props.className An additional CSS class added to the root element of Code.
 * @param props.multiline When true, whitespace and line breaks will be preserved.
 * @param props.showLineNumbers When true, shows line numbers in preformatted code blocks.
 * @param props.lang The language used for syntax highlighing.
 */
function Code({
  children,
  className,
  multiline = true,
  lang = 'auto',
  variant = Variants.Light,
  showLineNumbers = false,
}: Props) {
  const lineNumbers: React.ReactNode | null = (() => {
    if (!showLineNumbers || !children.length) {
      return null;
    }

    const lines: Array<string> = children.split('\n');

    if (lines[lines.length - 1] === '') {
      lines.pop();
    }

    return (
      <div className={cx(lineNumberStyles, lineNumberVariants[variant])}>
        {lines.map((line, i) => <div key={i}>{i + 1}</div>)}
      </div>
    );
  })();

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
      <div className={wrapperClassName}>
        <Syntax variant={variant} lang={lang}>
          {children}
        </Syntax>
      </div>
    );
  }

  return (
    <pre className={wrapperClassName}>
      {lineNumbers}

      <Syntax variant={variant} lang={lang}>
        {children}
      </Syntax>
    </pre>
  );
}

Code.displayName = 'Code';

Code.propTypes = {
  children: PropTypes.node,
  multiline: PropTypes.bool,
  lang: PropTypes.oneOf([...Object.keys(SupportedLanguages), 'auto']),
  variant: PropTypes.oneOf(Object.values(Variants)),
};

export default Code;
