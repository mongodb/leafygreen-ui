/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 96f8d738efcd554395d103dfa10f8b82
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ExportProps extends LGGlyph.ComponentProps {}

const Export = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ExportProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Export', {
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
        d="M15.0493 2.89511C15.2148 3.06719 15.2148 3.33936 15.0493 3.51144L12.5357 6.12358C12.2583 6.41187 11.771 6.2155 11.771 5.81541V4.382C9.86068 4.81548 8.43458 6.52391 8.43458 8.56542V10.7827C8.43458 11.335 7.98686 11.7827 7.43458 11.7827H7.28972C6.73743 11.7827 6.28972 11.335 6.28972 10.7827V8.56542C6.28972 5.33561 8.66936 2.66159 11.771 2.20097V0.591136C11.771 0.191043 12.2583 -0.00532836 12.5357 0.282969L15.0493 2.89511ZM4 2H8.72918C6.51668 3.34894 5.03972 5.78412 5.03972 8.56542V10.7827C5.03972 12.0253 6.04708 13.0327 7.28972 13.0327H7.43458C8.67722 13.0327 9.68458 12.0254 9.68458 10.7827V8.56542C9.68458 7.70753 10.0404 6.93169 10.6128 6.37858C10.9995 7.50679 12.519 7.94373 13.4364 6.9903L14 6.40463V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4C2 2.89543 2.89543 2 4 2Z"
        fill="#000000"
      />
    </svg>
  );
};

Export.displayName = 'Export';
Export.isGlyph = true;
Export.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Export;
