/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 84f2c48e04fac3b3e9d033223d34fd5a
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface AddFileProps extends LGGlyph.ComponentProps {}
const AddFile = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: AddFileProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'AddFile', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M1 7V13C1 14.1046 1.89543 15 3 15H8.9682C8.24461 14.6259 7.75 13.8707 7.75 13C7.75 11.8376 8.63145 10.8811 9.7624 10.7624C9.84441 9.98094 10.3264 9.31861 11 8.98388V3C11 1.89543 10.1046 1 9 1H7V5.5C7 6.32843 6.32843 7 5.5 7H1ZM9 13C9 13.5523 9.44772 14 10 14H10.7324H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V14H14C14.5523 14 15 13.5523 15 13C15 12.4477 14.5523 12 14 12H13V11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V12H10C9.44772 12 9 12.4477 9 13ZM5.83333 1H4.91421C4.649 1 4.39464 1.10536 4.20711 1.29289L2.5 3L1.29289 4.20711C1.10536 4.39464 1 4.649 1 4.91421V5.83333H4.83333C5.38562 5.83333 5.83333 5.38562 5.83333 4.83333V1Z" fill={'currentColor'} /></svg>;
};
AddFile.displayName = 'AddFile';
AddFile.isGlyph = true;
AddFile.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default AddFile;