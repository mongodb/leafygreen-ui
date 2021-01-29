/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum e46cc460fcabebf6d079ed45816bb161
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChevronDownProps extends LGGlyph.ComponentProps {}

const ChevronDown = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ChevronDownProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'ChevronDown', {
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
        d="M12.7524 5.24756C12.4169 4.912 11.8709 4.91841 11.5433 5.26174L8.11896 8.8506L4.42866 5.32948C4.09653 5.01257 3.57216 5.01872 3.24755 5.34333C2.91199 5.67889 2.9184 6.22488 3.26173 6.55248L7.43994 10.5392C7.49875 10.5953 7.56358 10.6412 7.63225 10.6771C7.96997 10.9547 8.47143 10.9299 8.77962 10.6069L12.7663 6.42867C13.0832 6.09654 13.077 5.57217 12.7524 5.24756Z"
        fill={'currentColor'}
      />
    </svg>
  );
};

ChevronDown.displayName = 'ChevronDown';
ChevronDown.isGlyph = true;
ChevronDown.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ChevronDown;
