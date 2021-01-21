/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 54acc638c722bc00da3d26dc40abe5f1
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.86359 15.9997C2.64814 15.9997 2.46992 15.8237 2.46992 15.6065V8.43942C2.46992 8.29584 2.38702 8.26128 2.28476 8.36251L1.56571 9.07429C1.41169 9.22675 1.15984 9.22852 1.00561 9.07585L0.115746 8.19498C-0.0400289 8.04078 -0.0377045 7.79399 0.117494 7.64036L7.71913 0.115538C7.87517 -0.0389322 8.12595 -0.0380924 8.28115 0.115538L15.8828 7.64036C16.0388 7.79483 16.0388 8.0423 15.8845 8.19498L14.9947 9.07585C14.8389 9.23005 14.5898 9.22791 14.4348 9.07447L13.7162 8.36317C13.6163 8.2643 13.5311 8.29648 13.5311 8.44018V15.6068C13.5311 15.8257 13.3549 16 13.1375 16L10 15.9999V10.239H6V15.9998L2.86359 15.9997Z"
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
