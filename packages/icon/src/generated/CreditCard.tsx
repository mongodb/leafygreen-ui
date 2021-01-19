/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 15cf534e42e0a0b2f99d924df1d9ab4e
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CreditCardProps extends LGGlyph.ComponentProps {}

const CreditCard = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CreditCardProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'CreditCard', {
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
