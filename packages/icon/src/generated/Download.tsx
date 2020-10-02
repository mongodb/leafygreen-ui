/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 04205c9b314b0d13631a573e67b28c01
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface DownloadProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('Download');

const Download = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: DownloadProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Download', title);
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
        <title id={titleId}>{'Download'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <g
        id="Glyphs-/-Download"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M5.94741393,0.937714678 L6.64108652,0.226013282 C6.93480373,-0.0753377605 7.40975073,-0.0753377605 7.70034329,0.226013282 L13.7746654,6.45500343 C14.0683826,6.75635447 14.0683826,7.24364553 13.7746654,7.5417907 L7.70034329,13.7739867 C7.40662607,14.0753378 6.93167909,14.0753378 6.64108652,13.7739867 L5.94741393,13.0622853 C5.65057206,12.7577284 5.65682136,12.2608198 5.95991254,11.9626746 L9.72511731,8.28234486 L2.75496303,8.28234486 C2.33938442,8.28234486 2.00504673,7.93931761 2.00504673,7.51293795 C2.00504673,7.28496553 2.00504673,7.11398621 2.00504673,7 C2.00504673,6.88601379 2.00504673,6.71503447 2.00504673,6.48706205 C2.00504673,6.06068239 2.33938442,5.71765514 2.75496303,5.71765514 L9.72511731,5.71765514 L5.95991254,2.0373254 C5.65369672,1.73918021 5.64744741,1.24227158 5.94741393,0.937714678 Z"
          id="Path"
          fill={'currentColor'}
          transform="translate(8.000000, 7.000000) scale(-1, 1) rotate(90.000000) translate(-8.000000, -7.000000) "
        />
        <rect
          id="Rectangle"
          fill={'currentColor'}
          x={1}
          y={14}
          width={14}
          height={2}
          rx={0.75}
        />
      </g>
    </svg>
  );
};

Download.displayName = 'Download';
Download.isGlyph = true;
Download.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Download;
