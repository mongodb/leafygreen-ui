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
  user-select: no-select;
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
  variant: Variant;
}

function LineNumbers({
  content = '',
  variant,
  ...rest
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  if (!content.length) {
    return null;
  }

  const lines = useMemo(() => {
    const splitContent = content.split('\n');

    if (splitContent[splitContent.length - 1] === '') {
      splitContent.pop();
    }

    return splitContent;
  }, [content]);

  return (
    <div
      {...rest}
      className={cx(lineNumberStyles, lineNumberVariants[variant])}
    >
      {lines.map((line, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  );
}

LineNumbers.displayName = 'LineNumbers';

LineNumbers.propTypes = {
  content: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(Variant)).isRequired,
};

export default LineNumbers;
