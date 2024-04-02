import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';

import {
  BaseLogoProps,
  SupportedColors,
  SupportedColorsMap,
} from '../Logo.types';
import { getAccessibleProps } from '../utils';

/**
 * # MongoDBLogoMark
 *
 * React Component that displays the MongoDB Logo Mark.
 *
 * ```
 * <MongoDBLogoMark />
 * ```
 * @param props.color Determines the color of the logo.
 * @param props.height Determines height of the <Logo /> component.
 */
export const MongoDBLogoMark = React.forwardRef(
  (
    {
      height = 40,
      className,
      color = SupportedColors.GreenDark2,
      role = 'img',
      'aria-label': ariaLabel = 'MongoDB Logo',
      ...rest
    }: BaseLogoProps,
    ref: React.LegacyRef<SVGSVGElement> | undefined,
  ): ReactElement => {
    const fill = SupportedColorsMap[color];

    return (
      <svg
        {...getAccessibleProps({ 'aria-label': ariaLabel, role })}
        className={cx(
          css`
            width: auto;
            height: ${height}px;
          `,
          className,
        )}
        height={height}
        viewBox="0 0 15 32"
        fill="none"
        ref={ref}
        {...rest}
      >
        <path
          d="M10.2779 3.56801C8.93285 1.97392 7.76219 0.354933 7.52557 0.0186807C7.50066 -0.00622689 7.4633 -0.00622689 7.43839 0.0186807C7.20177 0.354933 6.04357 1.97392 4.69856 3.56801C-6.8461 18.2759 6.51681 28.1891 6.51681 28.1891L6.6289 28.2639C6.72853 29.7957 6.9776 32 6.9776 32H7.47576H7.97391C7.97391 32 8.22298 29.8081 8.32261 28.2639L8.4347 28.1767C8.44715 28.1891 21.8225 18.2759 10.2779 3.56801ZM7.48821 27.9774C7.48821 27.9774 6.89043 27.4668 6.72853 27.2053V27.1804L7.45085 11.1648C7.45085 11.115 7.52557 11.115 7.52557 11.1648L8.24789 27.1804V27.2053C8.08599 27.4668 7.48821 27.9774 7.48821 27.9774Z"
          fill={fill}
        />
      </svg>
    );
  },
);

MongoDBLogoMark.displayName = 'MongoDBLogoMark';

MongoDBLogoMark.propTypes = {
  height: PropTypes.number,
  color: PropTypes.oneOf(Object.values(SupportedColors)),
};
