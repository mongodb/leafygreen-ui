import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';

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
   * When true, whitespace and line breaks will be preserved.
   *
   * default: `true`
   * */
  multiline: boolean,

  /**
   * An additional CSS class added to the root element of Code
   */
  className: string,
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
 * @param props.children Any React node
 * @param props.className An additional CSS class added to the root element of Code
 * @param props.multiline When true, whitespace and line breaks will be preserved.
 */
export default function Code({ children, className, multiline }: Props) {
  if (!multiline) {
    return (
      <Wrapper className={className}>
        <CodeBlock>{children}</CodeBlock>
      </Wrapper>
    );
  }

  return (
    <Wrapper className={className}>
      <pre className={preStyle}>
        <CodeBlock>{children}</CodeBlock>
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
};
