/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 6686d0b57b3494f6ae36a3283efb9a80
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface LaptopProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('Laptop');

const Laptop = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: LaptopProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Laptop', title);
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
        <title id={titleId}>{'Laptop'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Laptop-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M14,4 L14,11 L2,11 L2,4 C2,2.8984375 2.8984375,2 4,2 L12,2 C13.1015625,2 14,2.8984375 14,4 Z M12,9 L12,4 L4,4 L4,9 L12,9 Z M0,12 L16,12 L16,13 C16,13.5546875 15.5546875,14 15,14 L1,14 C0.4453125,14 0,13.5546875 0,13 L0,12 Z"
          id="\uE206"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Laptop.displayName = 'Laptop';
Laptop.isGlyph = true;
Laptop.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Laptop;
