/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 418082b6d564af3708a10ce33e862c9b
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface BellProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('Bell');

const Bell = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: BellProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Bell', title);
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
        <title id={titleId}>{'Bell'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Bell-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M14.9335938,13.25 L10.8164062,13.25 C10.4023438,14.4140625 9.29296875,15.25 7.98828125,15.25 C6.68359375,15.25 5.57421875,14.4140625 5.16015625,13.25 L1.06640625,13.25 L2.13671875,10.515625 C2.56640625,9.4296875 2.97265625,8.1015625 2.98828125,7.7421875 L2.98828125,7.7109375 C3.00390625,5.4765625 3.32421875,3.3046875 6.61328125,2.84375 C6.53515625,2.6640625 6.48828125,2.4609375 6.48828125,2.25 C6.48828125,1.421875 7.16015625,0.75 7.98828125,0.75 C8.81640625,0.75 9.48828125,1.421875 9.48828125,2.25 C9.48828125,2.453125 9.44921875,2.65625 9.37109375,2.8359375 C10.2929688,2.953125 11.2304688,3.25 11.9335938,3.9609375 C13.0195312,5.0625 13.0039062,6.5 12.9882812,7.7578125 C13.0039062,8.125 13.4101562,9.4375 13.8320312,10.5078125 L14.9335938,13.25 Z M4.98828125,7.75 C4.98046875,8.75 3.99609375,11.25 3.99609375,11.25 L11.9804688,11.25 C11.9804688,11.25 10.9804688,8.75 10.9882812,7.75 C11.0117188,5.75 10.9882812,4.75 7.98828125,4.75 C4.98828125,4.75 4.99609375,5.75 4.98828125,7.75 Z"
          id="\uE201"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Bell.displayName = 'Bell';
Bell.isGlyph = true;
Bell.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Bell;
