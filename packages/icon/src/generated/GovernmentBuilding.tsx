/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum eb6477f519f017d7a76f31105d2c7a61
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface GovernmentBuildingProps extends LGGlyph.ComponentProps {}

const GovernmentBuilding = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: GovernmentBuildingProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'GovernmentBuilding', {
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
        id="ic_gov"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g id="Group">
          <rect id="Rectangle" x={0} y={0} width={16} height={16} />
          <path
            d="M12,12.9565217 L12,14 L3,14 L3,12.9565217 L12,12.9565217 Z M5,7.2173913 L5,12.4347826 L4,12.4347826 L4,7.2173913 L5,7.2173913 Z M9,7.2173913 L9,12.4347826 L8,12.4347826 L8,7.2173913 L9,7.2173913 Z M7,7.2173913 L7,12.4347826 L6,12.4347826 L6,7.2173913 L7,7.2173913 Z M11,7.2173913 L11,12.4347826 L10,12.4347826 L10,7.2173913 L11,7.2173913 Z M11.5,5.65217391 C11.776,5.65217391 12,5.8858087 12,6.17391304 C12,6.46201739 11.776,6.69565217 11.5,6.69565217 L3.5,6.69565217 C3.224,6.69565217 3,6.46201739 3,6.17391304 C3,5.8858087 3.224,5.65217391 3.5,5.65217391 L11.5,5.65217391 Z M7.5,2 C9.157,2 10.5,3.40149565 10.5,5.13043478 L10.5,5.13043478 L4.5,5.13043478 C4.5,3.40149565 5.843,2 7.5,2 Z"
            id="ic_gov"
            fill={'currentColor'}
            fillRule="nonzero"
          />
        </g>
      </g>
    </svg>
  );
};

GovernmentBuilding.displayName = 'GovernmentBuilding';
GovernmentBuilding.isGlyph = true;
GovernmentBuilding.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default GovernmentBuilding;
