/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum c0e98abfcc2d593dd3d15709eafed088
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface EraserProps extends LGGlyph.ComponentProps {}
const Eraser = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: EraserProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Eraser', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8.38107 1.93409C9.14619 1.16833 10.4326 1.1689 11.1977 1.93409L14.4259 5.16224C15.1917 5.92736 15.1911 7.21373 14.4259 7.97892L9.16814 13.2367H14.4569C14.7476 13.2367 14.9832 13.4723 14.9832 13.763V14.1138C14.9832 14.4045 14.7476 14.6401 14.4569 14.6401H4.9478C4.76172 14.6401 4.58325 14.5662 4.45166 14.4347L1.57442 11.558C0.808347 10.793 0.808811 9.50634 1.5741 8.74105L8.38107 1.93409ZM8.09997 12.3201C8.29523 12.1248 8.29523 11.8082 8.09997 11.613L4.74703 8.26001C4.55177 8.06475 4.23519 8.06475 4.03993 8.26001L2.56649 9.73345C2.34893 9.95101 2.34939 10.3485 2.56617 10.565L5.08428 13.0826C5.18298 13.1812 5.31682 13.2367 5.45638 13.2367H6.96536C7.10494 13.2367 7.2388 13.1812 7.3375 13.0825L8.09997 12.3201Z" fill={'currentColor'} /></svg>;
};
Eraser.displayName = 'Eraser';
Eraser.isGlyph = true;
export default Eraser;