/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 7073f9a16a44e14430f7ee173663aba4
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface MagnifyingGlassProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('MagnifyingGlass');

const MagnifyingGlass = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: MagnifyingGlassProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('MagnifyingGlass', title);
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
        <title id={titleId}>{'Glyphs / Magnifying Glass'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Magnifying-Glass"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M10.6246494,9.82290055 C10.8263905,9.85767278 11.0491384,9.87867966 11.2928932,9.87867966 L15.8890873,14.4748737 L14.4748737,15.8890873 L9.87867966,11.2928932 C9.87867966,11.0491384 9.85767278,10.8263905 9.82290055,10.6246494 C8.78482761,11.4837272 7.45270479,12 6,12 C2.6862915,12 2.66453526e-14,9.3137085 2.66453526e-14,6 C2.66453526e-14,2.6862915 2.6862915,1.77635684e-15 6,1.77635684e-15 C9.3137085,1.77635684e-15 12,2.6862915 12,6 C12,7.45270479 11.4837272,8.78482761 10.6246494,9.82290055 Z M6,10 C8.209139,10 10,8.209139 10,6 C10,3.790861 8.209139,2 6,2 C3.790861,2 2,3.790861 2,6 C2,8.209139 3.790861,10 6,10 Z M6,3 C7.65685425,3 9,4.34314575 9,6 L8,6 C8,4.8954305 7.1045695,4 6,4 L6,3 Z"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

MagnifyingGlass.displayName = 'MagnifyingGlass';
MagnifyingGlass.isGlyph = true;
MagnifyingGlass.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default MagnifyingGlass;
