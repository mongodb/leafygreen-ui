/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 54866582b4ce0e776960df3186a39b95
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ShortcutProps extends LGGlyph.ComponentProps {}
const Shortcut = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ShortcutProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Shortcut', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M14.1332 8.64356L13.0543 7.99961L14.1332 7.35623C14.6761 7.03257 15 6.47109 15 5.85406C15 5.23704 14.6755 4.67555 14.1332 4.3519L8.95605 1.26399C8.36504 0.911724 7.63381 0.912285 7.04395 1.26399L1.86682 4.3519C1.3239 4.67555 1 5.23704 1 5.85406C1 6.47109 1.32448 7.03257 1.86682 7.35623L2.9457 7.99961L1.86682 8.64356C1.3239 8.96722 1 9.5287 1 10.1457C1 10.7627 1.32448 11.3242 1.86682 11.6479L7.04395 14.7358C7.33946 14.9119 7.66973 15 8 15C8.33027 15 8.66112 14.9119 8.95547 14.7364L14.1332 11.6485C14.6761 11.3248 15 10.7633 15 10.1463C15 9.52927 14.6755 8.96722 14.1332 8.64356ZM2.15884 5.85406C2.15884 5.62577 2.27415 5.42664 2.47463 5.30716L7.65235 2.21869C7.75954 2.15474 7.87948 2.12277 8 2.12277C8.12052 2.12277 8.24046 2.1553 8.34823 2.21925L13.526 5.30716C13.7264 5.42664 13.8417 5.62577 13.8417 5.85406C13.8417 6.08236 13.7264 6.28149 13.526 6.40097L11.9499 7.34108L8.95605 5.55509C8.3662 5.20339 7.63439 5.20339 7.04453 5.55509L5.76185 6.32023C5.48796 6.48361 5.40311 6.84093 5.57431 7.11C5.73868 7.36832 6.0787 7.44906 6.34165 7.29221L7.65235 6.51035C7.86731 6.3819 8.13327 6.3819 8.34823 6.51035L10.845 7.99961L8.34765 9.48888C8.13443 9.61677 7.86789 9.61733 7.65235 9.48888L2.47463 6.40041C2.27415 6.28093 2.15884 6.08236 2.15884 5.85406ZM13.5254 10.6921L8.34708 13.7805C8.13385 13.9084 7.86731 13.909 7.65177 13.7805L2.47405 10.6926C2.27357 10.5732 2.15827 10.374 2.15827 10.1457C2.15827 9.91743 2.27357 9.7183 2.47405 9.59882L4.05008 8.65871L7.04338 10.4441C7.33888 10.6203 7.66915 10.7083 7.99942 10.7083C8.32969 10.7083 8.66054 10.6203 8.95489 10.4447L11.9488 8.65927L13.5248 9.59938C13.7253 9.71886 13.8406 9.91799 13.8406 10.1463C13.8406 10.3746 13.7253 10.5737 13.5248 10.6932L13.5254 10.6921Z" fill={'currentColor'} /></svg>;
};
Shortcut.displayName = 'Shortcut';
Shortcut.isGlyph = true;
export default Shortcut;