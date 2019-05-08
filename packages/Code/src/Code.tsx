import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Syntax, { SupportedLanguages } from '@leafygreen-ui/syntax';


const preStyle = css`
  margin: 0;
`;

const textStyle = css`
  font-size: 14px;
  line-height: 24px;
`;

const Wrapper = ({ children, className }) => (
  <div
    className={cx(
      css`
        border-left: 3px solid #dee0e3;
        background-color: #f4f6f7;
        padding: 12px;
      `,
      className,
    )}
  >
    {children}
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const CodeBlock = ({ children }) => (
  <code className={textStyle}>{children}</code>
);

CodeBlock.propTypes = {
  children: PropTypes.node,
};

interface Props {
  /**
   * The children to render inside Code. This is usually going to be a formatted code block or line.
   */
  children?: React.ReactNode,
  
  /**
   * An additional CSS class added to the root element of Code
   */
  className: string,

  /**
   * When true, whitespace and line breaks will be preserved.
   *
   * default: `true`
   * */
  multiline: boolean,

  /**
   * The language used for syntax highlighting.
   * 
   * default: `'auto'`
   */
  lang: SupportedLanguages,
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
 * @param props.lang The language used for syntax highlighing.
 */
export default function Code({ children, className, multiline, lang }: Props) {
  if (!multiline) {
    return (
      <Wrapper className={className}>
        <Syntax lang={lang}>{children}</Syntax>
      </Wrapper>
    );
  }

  return (
    <Wrapper className={className}>
      <pre className={preStyle}>
        <Syntax lang={lang}>{children}</Syntax>
      </pre>
    </Wrapper>
  );
}

Code.displayName = 'Code';

Code.propTypes = {
  children: PropTypes.node,
  multiline: PropTypes.bool,
};

Code.defaultProps = {
  multiline: true,
  lang: 'auto',
};
