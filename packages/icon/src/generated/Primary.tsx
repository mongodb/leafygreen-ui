/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 6e0e215ca2adf130d9824fc7ed8766e8
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface PrimaryProps extends LGGlyph.ComponentProps {}
const Primary = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: PrimaryProps) => {
  const titleId = useIdAllocator({
    prefix: 'icon-title'
  });
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Primary', {
    title,
    titleId,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16">{title && <title id={titleId}>{title}</title>}<path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM11 6.69296C11 5.17183 9.91753 4 8.43299 4H6V12H7.49485V9.38592H8.43299C9.91753 9.38592 11 8.21408 11 6.69296ZM9.54639 6.69296C9.54639 7.34648 9.09278 7.85352 8.41237 7.85352H7.49485V5.53239H8.41237C9.09278 5.53239 9.54639 6.03944 9.54639 6.69296Z" fill={'currentColor'} /></svg>;
};
Primary.displayName = 'Primary';
Primary.isGlyph = true;
export default Primary;