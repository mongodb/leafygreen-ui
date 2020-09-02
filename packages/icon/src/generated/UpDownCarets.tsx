/**
 * This is a generated file. Do not modify it manually. To regenerate the file, run:
 *   ts-node ./build.ts
 *
 * @checksum 689668f684c54119ccd02814edfe8d8a
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
  return 'UpDownCarets' + '-' + Math.floor(Math.random() * 1000000);
}

const UpDownCarets = ({
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
  title = getGlyphTitle('UpDownCarets', title);
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
        <title id={titleId}>{'Glyphs / Up Down Carets'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Up-Down-Carets"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M7.5273,1.2109 C7.7873,0.9299 8.2123,0.9299 8.4753,1.2109 L11.8023,4.7729 C12.2243,5.2249 11.9253,5.9999 11.3273,5.9999 L4.6733,5.9999 C4.0743,5.9999 3.7753,5.2249 4.1973,4.7729 L7.5273,1.2109 Z M11.3273,9.9999 C11.9253,9.9999 12.2243,10.7749 11.8023,11.2279 L8.4753,14.7889 C8.2123,15.0699 7.7873,15.0699 7.5273,14.7889 L4.1973,11.2279 C3.7753,10.7749 4.0743,9.9999 4.6733,9.9999 L11.3273,9.9999 Z"
          id="Fill-1"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

UpDownCarets.displayName = 'UpDownCarets';
UpDownCarets.isGlyph = true;
UpDownCarets.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default UpDownCarets;
