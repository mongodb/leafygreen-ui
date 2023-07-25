/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 3c720779454a897a29f841e4b98cbb47
*/
import * as React from "react";
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
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M13.823 2.4491C13.8201 2.30008 13.6999 2.17994 13.5509 2.17704L9.5062 2.09836C9.25654 2.09351 9.12821 2.39519 9.30482 2.5718L10.3856 3.65257L7.93433 6.10383C7.87964 6.15852 7.83047 6.21665 7.78683 6.27752L5.99909 8.06525C5.46457 8.59977 5.46457 9.4664 5.99909 10.0009C6.53361 10.5354 7.40023 10.5354 7.93475 10.0009L9.72249 8.21317C9.78336 8.16953 9.84148 8.12037 9.89618 8.06567L12.3474 5.61441L13.4282 6.69518C13.6048 6.87179 13.9065 6.74347 13.9016 6.4938L13.823 2.4491Z" fill={'currentColor'} /><path d="M7.25 3.12893C7.66421 3.12893 8 3.46472 8 3.87893C8 4.29315 7.66421 4.62893 7.25 4.62893H4C3.72386 4.62893 3.5 4.85279 3.5 5.12893V11.9929C3.5 12.2691 3.72386 12.4929 4 12.4929H10.864C11.1401 12.4929 11.364 12.2691 11.364 11.9929V8.75C11.364 8.33579 11.6998 8 12.114 8C12.5282 8 12.864 8.33579 12.864 8.75V11.9929C12.864 13.0975 11.9686 13.9929 10.864 13.9929H4C2.89543 13.9929 2 13.0975 2 11.9929V5.12893C2 4.02436 2.89543 3.12893 4 3.12893H7.25Z" fill={'currentColor'} /></svg>;
};
OpenNewTab.displayName = 'OpenNewTab';
OpenNewTab.isGlyph = true;
OpenNewTab.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default OpenNewTab;