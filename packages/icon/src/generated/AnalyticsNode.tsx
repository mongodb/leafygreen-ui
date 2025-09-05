/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 9805552df6dff2c768c44ca81aa213c4
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface AnalyticsNodeProps extends LGGlyph.ComponentProps {}
const AnalyticsNode = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: AnalyticsNodeProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'AnalyticsNode', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M4.23999 11.1535L7.27999 4.05352H8.71999L11.76 11.1535H10.1L9.46999 9.65352H6.52999L5.89999 11.1535H4.23999ZM7.10999 8.27352H8.88999L7.99999 6.13352L7.10999 8.27352Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5ZM8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" fill={'currentColor'} /></svg>;
};
AnalyticsNode.displayName = 'AnalyticsNode';
AnalyticsNode.isGlyph = true;
export default AnalyticsNode;