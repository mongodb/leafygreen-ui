/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 1d6cf815002b2888f8d01082abfdaae4
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CloudProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('Cloud');

const Cloud = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: CloudProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Cloud', title);
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
        <title id={titleId}>{'Cloud'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Cloud-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M14.25,6.1953125 C15.3203125,6.921875 16,8.1484375 16,9.5 C16,11.703125 14.203125,13.5 12,13.5 L3.890625,13.5 L3.78125,13.484375 C1.625,13.25 0,11.421875 0,9.25 C0,7.40625 1.1796875,5.8359375 2.8203125,5.25 C3.53125,3.3515625 5.359375,2 7.5,2 C9.109375,2 10.59375,2.7890625 11.5234375,4.0390625 C12.765625,4.2265625 13.796875,5.0625 14.25,6.1953125 Z M12,11.5 C13.1015625,11.5 14,10.6015625 14,9.5 C14,8.5703125 13.359375,7.7890625 12.4921875,7.5703125 C12.4921875,7.546875 12.5,7.5234375 12.5,7.5 C12.5,6.671875 11.828125,6 11,6 C10.890625,6 10.78125,6.015625 10.6796875,6.0390625 L10.6640625,6.0390625 C10.5625,6.0625 10.46875,6.1015625 10.375,6.140625 C9.859375,6.375 9.5,6.8984375 9.5,7.5 L8.5,7.5 C8.5,6.5078125 9.0859375,5.6484375 9.9296875,5.25 C9.390625,4.4921875 8.5,4 7.5,4 C5.84375,4 4.5,5.34375 4.5,7 L4.5,7.0234375 C4.4140625,7.015625 4.3359375,7 4.25,7 C3.0078125,7 2,8.0078125 2,9.25 C2,10.40625 2.875,11.375 4,11.5 L12,11.5 Z"
          id="\uE204"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Cloud.displayName = 'Cloud';
Cloud.isGlyph = true;
Cloud.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Cloud;
