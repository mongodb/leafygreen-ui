/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum afb98db59c8da867d630feffd60fe883
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ActivityFeedProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('ActivityFeed');

const ActivityFeed = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: ActivityFeedProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('ActivityFeed', title);
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
        <title id={titleId}>{'Glyphs / Activity Feed'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Activity-Feed"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M9.9699,8.0581 C10.3389,8.0551 10.7259,8.2681 10.8889,8.6701 L10.8889,8.6701 L10.8939,8.6821 L10.8969,8.6911 L10.9249,8.7781 L12.0359,12.7301 L12.1639,12.5411 C12.3259,12.3031 12.5809,12.1501 12.8619,12.1141 L12.8619,12.1141 L12.8709,12.1131 L12.8809,12.1131 L12.9739,12.1071 L15.9839,12.1071 L15.9839,14.0911 L13.5089,14.0901 L12.4789,15.6081 C12.2819,15.8981 11.9629,16.0441 11.6609,16.0411453 C11.2849,16.0431 10.9019,15.8251 10.7399,15.4271 L10.7399,15.4271 L10.7359,15.4171 L10.7349,15.4091 L10.7049,15.3231 L9.7999,12.1041 L9.2429,13.4721 C9.1069,13.8091 8.7989,14.0401 8.4439,14.0831 L8.4439,14.0831 L8.4349,14.0841 L8.4249,14.0851 L8.3349,14.0911 L5.9999,14.0911 L5.9999,12.1071 L7.6569,12.1071 L9.0529,8.6761 C9.2159,8.2691 9.6059,8.0531 9.9699,8.0581 Z M11.984,8.08242362e-14 L11.984,7.258 L10,7.258 L10,1.994 L1.984,1.994 L1.984,12.105 L4.65,12.105 L4.65,14.1 L1.30562228e-13,14.1 L1.30562228e-13,8.08242362e-14 L11.984,8.08242362e-14 Z M6.325,6.3836 L6.325,7.7166 L3.212,7.7166 L3.212,6.3836 L6.325,6.3836 Z M8.771,3.7176 L8.771,5.0506 L3.212,5.0506 L3.212,3.7176 L8.771,3.7176 Z"
          id="Fill"
          fill={'currentColor'}
        />
      </g>
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
