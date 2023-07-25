/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum efbeb926815fca9b2b3fe02f8f95e84c
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SettingsProps extends LGGlyph.ComponentProps {}
const Settings = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SettingsProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Settings', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M10.2068 1.06716C9.88875 0.935661 9.52203 1.03749 9.31733 1.31414L8.94293 1.82012C8.30664 1.72253 7.66857 1.72598 7.04948 1.8218L6.67408 1.31582C6.46902 1.03944 6.10217 0.938077 5.7843 1.06998L4.65819 1.53728C4.34032 1.66918 4.15301 2.0005 4.20388 2.34087L4.29701 2.96397C3.79197 3.33462 3.33892 3.78396 2.95865 4.30338L2.33602 4.21114C1.99558 4.1607 1.66451 4.34843 1.53301 4.66647L1.06716 5.79319C0.935661 6.11122 1.03749 6.47794 1.31414 6.68265L1.82012 7.05705C1.72253 7.69334 1.72598 8.33142 1.8218 8.9505L1.31583 9.32589C1.03945 9.53096 0.938089 9.89781 1.06999 10.2157L1.53729 11.3418C1.6692 11.6597 2.00051 11.847 2.34088 11.7961L2.96398 11.703C3.33462 12.208 3.78396 12.6611 4.30338 13.0413L4.21114 13.664C4.1607 14.0044 4.34843 14.3355 4.66647 14.467L5.79319 14.9328C6.11122 15.0643 6.47794 14.9625 6.68265 14.6858L7.05705 14.1799C7.69335 14.2774 8.33142 14.274 8.95051 14.1782L9.3259 14.6841C9.53096 14.9605 9.89781 15.0619 10.2157 14.93L11.3418 14.4627C11.6597 14.3308 11.847 13.9995 11.7961 13.6591L11.703 13.036C12.208 12.6654 12.6611 12.216 13.0413 11.6966L13.664 11.7888C14.0044 11.8393 14.3355 11.6515 14.467 11.3335L14.9328 10.2068C15.0643 9.88875 14.9625 9.52203 14.6858 9.31733L14.1799 8.94293C14.2774 8.30663 14.274 7.66856 14.1782 7.04947L14.6841 6.67408C14.9605 6.46902 15.0619 6.10217 14.93 5.7843L14.4627 4.65819C14.3308 4.34032 13.9995 4.15301 13.6591 4.20388L13.036 4.29701C12.6654 3.79197 12.216 3.33892 11.6966 2.95865L11.7888 2.33602C11.8393 1.99558 11.6515 1.66451 11.3335 1.53301L10.2068 1.06716ZM10.5413 9.05074C9.96102 10.4543 8.35278 11.1216 6.94924 10.5413C5.54569 9.96102 4.87833 8.35278 5.45865 6.94924C6.03896 5.54569 7.6472 4.87833 9.05074 5.45865C10.4543 6.03896 11.1216 7.6472 10.5413 9.05074Z" fill={'currentColor'} /></svg>;
};
Settings.displayName = 'Settings';
Settings.isGlyph = true;
Settings.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Settings;