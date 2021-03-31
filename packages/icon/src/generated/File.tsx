/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 82d802df5ffa7ee2e61423608619f5da
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface FileProps extends LGGlyph.ComponentProps {}

const File = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: FileProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'File', {
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
        d="M0 29.5385V14.7692H11.0769C13.1161 14.7692 14.7692 13.1161 14.7692 11.0769V0H19.6923C22.4112 0 24.6154 2.20414 24.6154 4.92308V19.6526C24.6149 19.6528 24.6145 19.6531 24.6141 19.6533C24.6149 19.6918 24.6154 19.7305 24.6154 19.7692V29.4615C24.6154 32.223 22.3768 34.4615 19.6154 34.4615H19.614H17.3077H4.92308C2.20414 34.4615 0 32.2574 0 29.5385ZM9.63499 0H11.8974V9.43589C11.8974 10.7954 10.7954 11.8974 9.4359 11.8974H0V9.63499C0 8.98215 0.25934 8.35604 0.720968 7.89442L7.89442 0.720967C8.35605 0.259339 8.98215 0 9.63499 0Z"
        fill="#21313C"
      />
    </svg>
  );
};

File.displayName = 'File';
File.isGlyph = true;
File.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default File;
