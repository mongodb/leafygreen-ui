/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/prebuild.ts
* @checksum 27757e4dbac2958ca82429427b30aafc
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChartFilledProps extends LGGlyph.ComponentProps {}
const ChartFilled = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ChartFilledProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ChartFilled', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M3 2.5C1.89543 2.5 1 3.39543 1 4.5V11.5C1 12.6046 1.89543 13.5 3 13.5H13C14.1046 13.5 15 12.6046 15 11.5V4.5C15 3.39543 14.1046 2.5 13 2.5H3ZM11.25 4.5C10.8358 4.5 10.5 4.83579 10.5 5.25V11.5H12V5.25C12 4.83579 11.6642 4.5 11.25 4.5ZM7.5 7.25C7.5 6.83579 7.83579 6.5 8.25 6.5C8.66421 6.5 9 6.83579 9 7.25V11.5H7.5V7.25ZM5.25 9C4.83579 9 4.5 9.33579 4.5 9.75V11.5H6V9.75C6 9.33579 5.66421 9 5.25 9Z" fill={'currentColor'} /></svg>;
};
ChartFilled.displayName = 'ChartFilled';
ChartFilled.isGlyph = true;
export default ChartFilled;