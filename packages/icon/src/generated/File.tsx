/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 342b4c339aed30cb0a982c1e6c3144df
*/
import * as React from "react";
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
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M3 13V7H7.5C8.32843 7 9 6.32843 9 5.5V1H11C12.1046 1 13 1.89543 13 3V8.98388C13 8.98924 13 9 13 9V13C13 14.1046 12.1046 15 11 15H5C3.89543 15 3 14.1046 3 13Z" fill={'currentColor'} /><path d="M7.83333 1H6.91421C6.649 1 6.39464 1.10536 6.20711 1.29289L3.29289 4.20711C3.10536 4.39464 3 4.649 3 4.91421V5.83333H6.83333C7.38562 5.83333 7.83333 5.38562 7.83333 4.83333V1Z" fill={'currentColor'} /></svg>;
};
File.displayName = 'File';
File.isGlyph = true;
File.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default File;