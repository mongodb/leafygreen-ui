/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 84e67197975193e8d368cbee4b585be9
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface OpenNewTabProps extends LGGlyph.ComponentProps {}

const OpenNewTab = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: OpenNewTabProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'OpenNewTab', {
    title,
    ariaLabel,
    ariaLabelledby,
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
      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <path
          d="M9.29411765,3 L10.7727647,4.47864706 L6.42788235,8.82352941 L7.17647059,9.57211765 L11.5218824,5.22776471 L13,6.70588235 L13,3 L9.29411765,3 Z M4,4.58823529 L4,12 L11.4122941,12 L11.4122941,7.76470588 L10.3529412,7.76470588 L10.3529412,10.9411765 L5.05882353,10.9411765 L5.05882353,5.64705882 L8.23529412,5.64705882 L8.23529412,4.58823529 L4,4.58823529 Z"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

OpenNewTab.displayName = 'OpenNewTab';
OpenNewTab.isGlyph = true;
OpenNewTab.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default OpenNewTab;
