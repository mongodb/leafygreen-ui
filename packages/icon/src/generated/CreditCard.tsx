/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 756fc07e7ba4297170017495831ae0df
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CreditCardProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('CreditCard');

const CreditCard = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: CreditCardProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('CreditCard', title);
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
        <title id={titleId}>{'CreditCard'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="CreditCard-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M13,3 C14.1015625,3 15,3.8984375 15,5 L15,11 C15,12.1015625 14.1015625,13 13,13 L3,13 C1.8984375,13 1,12.1015625 1,11 L1,5 C1,3.8984375 1.8984375,3 3,3 L13,3 Z M3,6 L13,6 L13,5 L3,5 L3,6 Z M13,11 L13,8 L3,8 L3,11 L13,11 Z M12,10 L9,10 L9,9 L12,9 L12,10 Z"
          id="\uE214"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

CreditCard.displayName = 'CreditCard';
CreditCard.isGlyph = true;
CreditCard.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default CreditCard;
