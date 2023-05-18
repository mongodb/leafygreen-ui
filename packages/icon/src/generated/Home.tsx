/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 899bafd33bb991c6f6588191e4048e7b
 */
import { css, cx } from '@leafygreen-ui/emotion';
import PropTypes from 'prop-types';
import * as React from 'react';

import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface HomeProps extends LGGlyph.ComponentProps {}
const Home = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: HomeProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Home', {
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
        d="M7.51983 2.40012C7.79797 2.16834 8.20197 2.16834 8.48011 2.40012L13.6105 6.67544C13.8247 6.85396 13.8515 7.17322 13.67 7.38494L13.4531 7.63803C13.2794 7.84067 12.9772 7.87116 12.7665 7.70731L8.30694 4.23876C8.12638 4.09833 7.87356 4.09833 7.693 4.23876L3.23344 7.70731C3.02277 7.87116 2.72054 7.84067 2.54684 7.63803L2.32992 7.38494C2.14844 7.17322 2.17523 6.85396 2.38945 6.67544L7.51983 2.40012Z"
        fill={'currentColor'}
      />
      <path
        d="M7.68467 5.42969L3.99997 8.31593V13.2378C3.99997 13.6587 4.33576 14 4.74997 14H6.49997C6.77611 14 6.99997 13.7762 6.99997 13.5V11.4593C6.99997 11.1786 7.22383 10.9511 7.49997 10.9511H8.49997C8.77611 10.9511 8.99997 11.1786 8.99997 11.4593V13.5C8.99997 13.7762 9.22383 14 9.49997 14H11.25C11.6642 14 12 13.6587 12 13.2378V8.31593L8.31527 5.42969C8.13157 5.27801 7.86838 5.27801 7.68467 5.42969Z"
        fill={'currentColor'}
      />
    </svg>
  );
};
Home.displayName = 'Home';
Home.isGlyph = true;
Home.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Home;
