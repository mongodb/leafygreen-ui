/**
 * This is a generated file. Do not modify it manually. To regenerate the file, run:
 *   ts-node ./build.ts
 *
 * @checksum 06b90b56a6782eee836fc9e7c40881f0
 *
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
export interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number | 'small' | 'default' | 'large' | 'xlarge';
  titleId?: string;
  title?: string | null | boolean;
}
const sizeMap = {
  small: 14,
  default: 16,
  large: 20,
  xlarge: 24,
};

function getGlyphTitle(name: string, title?: string | boolean | null) {
  if (title === false) {
    return null;
  }

  if (title == null || title === true) {
    return `${name.replace(/([a-z])([A-Z])/g, '$1 $2')} Icon`;
  }

  return title;
}

function generateGlyphTitle(): string {
  return 'ChevronUp' + '-' + Math.floor(Math.random() * 1000000);
}

const ChevronUp = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: Props) => {
  const titleId = React.useMemo(() => customTitleId || generateGlyphTitle(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('ChevronUp', title);
  return (
    <svg
      className={cx(
        {
          [fillStyle]: fill != null,
        },
        className,
      )}
      height={typeof size === 'number' ? size : sizeMap[size]}
      width={typeof size === 'number' ? size : sizeMap[size]}
      {...props}
      viewBox="0 0 16 16"
      role="img"
      aria-labelledby={titleId}
    >
      {title === undefined ? (
        <title id={titleId}>{'ChevronUp'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="ChevronUp-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M5.51396103,5.36396103 L12.513961,5.36396103 L12.513961,7.36396103 L5.51396103,7.36396103 L5.51396103,14.363961 L3.51396103,14.363961 L3.51396103,5.36396103 L5.51396103,5.36396103 Z"
          id="Combined-Shape"
          fill={'currentColor'}
          transform="translate(8.013961, 9.863961) rotate(45.000000) translate(-8.013961, -9.863961) "
        />
      </g>
    </svg>
  );
};

ChevronUp.displayName = 'ChevronUp';
ChevronUp.isGlyph = true;
ChevronUp.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ChevronUp;
