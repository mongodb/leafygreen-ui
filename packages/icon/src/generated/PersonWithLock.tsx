/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum b261c20a039d2494fc3d8d298ff95c75
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface PersonWithLockProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('PersonWithLock');

const PersonWithLock = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: PersonWithLockProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('PersonWithLock', title);
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
        <title id={titleId}>{'PersonWithLock'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="PersonWithLock-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M11.1484375,8.640625 C10.5625,9.1015625 10.15625,9.78125 10.0390625,10.5546875 C9.4375,10.515625 8.765625,10.5 8,10.5 C3.5,10.5 2,11.0078125 2,14 L0,14 C0,10.09375 2.328125,8.96875 4.890625,8.6328125 C4.3359375,7.78125 4,6.6875 4,5.5 C4,2.7421875 5.7890625,1 8,1 C10.2109375,1 12,2.7421875 12,5.5 C12,6.6875 11.6640625,7.78125 11.1171875,8.6328125 C11.125,8.640625 11.140625,8.640625 11.1484375,8.640625 Z M8,8.5 C9.0625,8.5 10,7.1015625 10,5.5 C10,3.984375 9.21875,3 8,3 C6.78125,3 6,3.984375 6,5.5 C6,7.1015625 6.9375,8.5 8,8.5 Z M15,12.5 L16,12.5 L16,16 L10,16 L10,12.5 L11,12.5 L11,11 C11,9.8984375 11.8984375,9 13,9 C14.1015625,9 15,9.8984375 15,11 L15,12.5 Z M12,11 L12,12.5 L14,12.5 L14,11 C14,10.453125 13.546875,10 13,10 C12.453125,10 12,10.453125 12,11 Z"
          id="\uE230"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

PersonWithLock.displayName = 'PersonWithLock';
PersonWithLock.isGlyph = true;
PersonWithLock.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default PersonWithLock;
