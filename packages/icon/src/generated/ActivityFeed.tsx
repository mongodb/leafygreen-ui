/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum a8c64262fe3d9e416b659896d37ac3db
*/
import * as React from "react";
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
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M1 13V7H5.5C6.32843 7 7 6.32843 7 5.5V1H9C10.1046 1 11 1.89543 11 3V7.51491C10.9701 7.51164 10.9401 7.50889 10.9099 7.50668C9.80561 7.42578 8.77964 8.08094 8.38847 9.11682L7.32818 11.9246C6.27375 12.2181 5.5 13.1854 5.5 14.3333C5.5 14.5642 5.53129 14.7878 5.58987 15H3C1.89543 15 1 14.1046 1 13ZM4.91421 1H5.83333V4.83333C5.83333 5.38562 5.38562 5.83333 4.83333 5.83333H1V4.91421C1 4.649 1.10536 4.39464 1.29289 4.20711L2.5 3L4.20711 1.29289C4.39464 1.10536 4.649 1 4.91421 1Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M10.8003 9.00268C11.2421 9.03504 11.6099 9.35411 11.7043 9.78684L12.3135 12.5789L12.8215 11.8647C13.0091 11.601 13.3128 11.4444 13.6364 11.4444H15C15.5523 11.4444 16 11.8922 16 12.4444C16 12.9967 15.5523 13.4444 15 13.4444H14.1522L12.633 15.5797C12.4036 15.9022 12.0055 16.059 11.6178 15.9797C11.23 15.9004 10.9255 15.5999 10.8412 15.2132L10.47 13.512L10.0264 14.6866C9.87947 15.0758 9.50691 15.3333 9.09091 15.3333H8C7.44772 15.3333 7 14.8856 7 14.3333C7 13.7811 7.44772 13.3333 8 13.3333H8.39961L9.79175 9.64673C9.94822 9.23238 10.3586 8.97032 10.8003 9.00268Z" fill={'currentColor'} /></svg>;
};
ActivityFeed.displayName = 'ActivityFeed';
ActivityFeed.isGlyph = true;
ActivityFeed.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default ActivityFeed;