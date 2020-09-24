/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 199d6530ec1e11cb20f705abcdd2f1e0
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface UnsortedProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('Unsorted');

const Unsorted = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: UnsortedProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Unsorted', title);
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
        <title id={titleId}>{'Glyphs / Sorting / Unsorted'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Sorting-/-Unsorted"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M10.7525,10.4955 C10.4985,10.2415 10.0875,10.2415 9.8335,10.4955 L8.6225,11.7055 L8.6225,4.2445 L9.7865,5.4085 C10.0405,5.6625 10.4515,5.6625 10.7055,5.4085 C10.9595,5.1545 10.9595,4.7425 10.7055,4.4895 L8.4075,2.1905 C8.1535,1.9365 7.7425,1.9365 7.4885,2.1905 L5.1905,4.4885 C4.9365,4.7425 4.9365,5.1545 5.1905,5.4085 C5.4435,5.6625 5.8555,5.6625 6.1085,5.4085 L7.3225,4.1945 L7.3225,4.3695 C7.3225,4.3755 7.3195,4.3805 7.3195,4.3865 L7.3195,11.6595 L6.1555,10.4955 C5.9015,10.2415 5.4895,10.2415 5.2355,10.4955 C4.9815,10.7495 4.9815,11.1605 5.2355,11.4145 L7.5335,13.7125 C7.7875,13.9665 8.1985,13.9665 8.4525,13.7125 L10.7515,11.4145 C11.0055,11.1615 11.0055,10.7495 10.7525,10.4955"
          id="Fill-1"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Unsorted.displayName = 'Unsorted';
Unsorted.isGlyph = true;
Unsorted.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Unsorted;
