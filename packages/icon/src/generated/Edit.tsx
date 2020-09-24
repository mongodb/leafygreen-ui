/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 91b9e8897a508d52346347b367afbb1d
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface EditProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('Edit');

const Edit = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: EditProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Edit', title);
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
        <title id={titleId}>{'Edit'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Edit-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M11.3515625,6.6484375 L9.3515625,4.6484375 L11,3 L13,5 L11.3515625,6.6484375 Z M6,12 L3,13 L4,10 L8.6484375,5.3515625 L10.6484375,7.3515625 L6,12 Z"
          id="\uE222"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Edit.displayName = 'Edit';
Edit.isGlyph = true;
Edit.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Edit;
