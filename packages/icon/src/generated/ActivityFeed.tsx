/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 5e4dc1a710aea542f0e6966c1c38ad57
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ActivityFeedProps extends LGGlyph.ComponentProps {}

const ActivityFeed = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ActivityFeedProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'ActivityFeed', {
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
        d="M1 13V7H5.5C6.32843 7 7 6.32843 7 5.5V1H9C10.1046 1 11 1.89543 11 3V7.51491C10.9701 7.51164 10.9401 7.50889 10.9099 7.50668C9.80561 7.42578 8.77964 8.08094 8.38847 9.11682L7.32818 11.9246C6.27375 12.2181 5.5 13.1854 5.5 14.3333C5.5 14.5642 5.53129 14.7878 5.58987 15H3C1.89543 15 1 14.1046 1 13ZM4.91421 1H5.83333V4.83333C5.83333 5.38562 5.38562 5.83333 4.83333 5.83333H1V4.91421C1 4.649 1.10536 4.39464 1.29289 4.20711L2.5 3L4.20711 1.29289C4.39464 1.10536 4.649 1 4.91421 1Z"
        fill={'currentColor'}
      />
      <path
        d="M8 14.3333H9.09091L10.7273 10L11.8182 15L13.6364 12.4444H15"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

ActivityFeed.displayName = 'ActivityFeed';
ActivityFeed.isGlyph = true;
ActivityFeed.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ActivityFeed;
