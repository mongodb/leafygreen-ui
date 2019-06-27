import React, { useMemo } from 'react';
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

interface Props {
  content: string;
  variant?: Variant;
  className?: string;
}

function LineNumbers({
  content,
  variant = Variant.Light,
  className,
  ...rest
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  if (!content.length) {
    return null;
  }

  const lines = useMemo(() => {
    const splitContent = content.split(/\r|\n/);

    // If first line is blank, remove the first line.
    // This is likely to be common when someone assigns a template literal
    // string to a variable, and doesn't add an '\' escape character after
    // breaking to a new line before the first line of code.
    if (splitContent[0] === '') {
      splitContent.shift();
    }

    // If the last line is blank, remove the last line of code.
    // This is a similar issue to the one above.
    if (splitContent[splitContent.length - 1] === '') {
      splitContent.pop();
    }

    return splitContent;
  }, [content]);

  return (
    <div
      {...rest}
      className={cx(lineNumberStyles, lineNumberVariants[variant], className)}
    >
      {lines.map((l, i) => <div key={i}>{i + 1}</div>)}
    </div>
  );
}

LineNumbers.displayName = 'LineNumbers';

LineNumbers.propTypes = {
  content: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(Variant)),
  className: PropTypes.string,
};

export default LineNumbers;
