import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { Variant } from '@leafygreen-ui/syntax';

const lineNumberStyles = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 13px;
  line-height: 24px;
  user-select: none;
`;

const lineNumberVariants: { [K in Variant]: string } = {
  [Variant.Light]: css`
    color: #b8c4c2;
  `,

  [Variant.Dark]: css`
    color: #5d6c74;
  `,
} as const;

interface LineNumbersProps {
  lineCount: number;
  variant?: Variant;
  className?: string;
}

function LineNumbers({
  lineCount,
  variant = Variant.Light,
  className,
  ...rest
}: LineNumbersProps & React.HTMLAttributes<HTMLDivElement>) {
  const renderedLines = [];

  for (let i = 0; i < lineCount; i++) {
    renderedLines.push(<div key={i}>{i + 1}</div>);
  }

  return (
    <div
      {...rest}
      className={cx(lineNumberStyles, lineNumberVariants[variant], className)}
    >
      {renderedLines}
    </div>
  );
}

LineNumbers.displayName = 'LineNumbers';

LineNumbers.propTypes = {
  lineCount: PropTypes.number,
  variant: PropTypes.oneOf(Object.values(Variant)),
  className: PropTypes.string,
};

export default LineNumbers;
