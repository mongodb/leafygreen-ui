/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 3421f904133cde4611342a9fffbe1339
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChevronLeftProps extends LGGlyph.ComponentProps {}

const ChevronLeft = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ChevronLeftProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'ChevronLeft', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
  });
  return (
    <svg
      className={cx(
        {
          [fillStyle]: fill != null,
        },
        noFlexShrink,
        className,
      )}
      height={typeof size === 'number' ? size : sizeMap[size]}
      width={typeof size === 'number' ? size : sizeMap[size]}
      role={role}
      {...accessibleProps}
      {...props}
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.6211 12.7524C10.9566 12.4169 10.9502 11.8709 10.6069 11.5433L7.01802 8.11896L10.5391 4.42867C10.856 4.09654 10.8499 3.57217 10.5253 3.24756C10.1897 2.912 9.64374 2.9184 9.31614 3.26174L5.32947 7.43995C5.27336 7.49875 5.22738 7.56358 5.1915 7.63226C4.91394 7.96998 4.93874 8.47144 5.26174 8.77963L9.43995 12.7663C9.77208 13.0832 10.2965 13.0771 10.6211 12.7524Z"
        fill={'currentColor'}
      />
    </svg>
  );
};

ChevronLeft.displayName = 'ChevronLeft';
ChevronLeft.isGlyph = true;
ChevronLeft.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ChevronLeft;
