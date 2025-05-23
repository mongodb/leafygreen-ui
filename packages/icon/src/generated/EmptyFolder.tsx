/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum de29267ef4a484195e91d50b2b97ce05
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface EmptyFolderProps extends LGGlyph.ComponentProps {}
const EmptyFolder = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: EmptyFolderProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'EmptyFolder', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M14.19 10.19C13.78 10.19 13.44 9.85 13.44 9.44V8.49C13.44 8.08 13.78 7.74 14.19 7.74C14.6 7.74 14.94 8.08 14.94 8.49V9.44C14.94 9.85 14.6 10.19 14.19 10.19Z" fill={'currentColor'} /><path d="M14.19 7.08C13.78 7.08 13.44 6.74 13.44 6.33V5.47H11.32C10.91 5.47 10.57 5.13 10.57 4.72C10.57 4.31 10.91 3.97 11.32 3.97H14.19C14.6 3.97 14.94 4.31 14.94 4.72V6.33C14.94 6.74 14.6 7.08 14.19 7.08Z" fill={'currentColor'} /><path d="M14.19 13.89H12.55C12.14 13.89 11.8 13.55 11.8 13.14C11.8 12.73 12.14 12.39 12.55 12.39H13.44V11.5C13.44 11.09 13.78 10.75 14.19 10.75C14.6 10.75 14.94 11.09 14.94 11.5V13.14C14.94 13.55 14.6 13.89 14.19 13.89Z" fill={'currentColor'} /><path d="M8.94 5.47H8.42C7.72 5.47 7.23 5.06 7.02 4.72C7.02 4.72 6.46 3.84 6.25 3.51H5.84C5.43 3.51 5.09 3.17 5.09 2.76C5.09 2.35 5.43 2.01 5.84 2.01H6.41C6.58 2.02 7.15 2.09 7.51 2.67C7.68 2.95 8.31 3.92 8.31 3.92C8.32 3.93 8.37 3.97 8.44 3.97H8.96C9.37 3.97 9.71 4.31 9.71 4.72C9.71 5.13 9.36 5.47 8.94 5.47Z" fill={'currentColor'} /><path d="M1.75 5.29C1.34 5.29 1 4.95 1 4.54V2.75C1 2.34 1.34 2 1.75 2H3.74C4.15 2 4.49 2.34 4.49 2.75C4.49 3.16 4.15 3.5 3.73 3.5H2.5V4.53C2.5 4.95 2.16 5.29 1.75 5.29Z" fill={'currentColor'} /><path d="M1.75 10.08C1.34 10.08 1 9.74 1 9.33V6.58C1 6.17 1.34 5.83 1.75 5.83C2.16 5.83 2.5 6.17 2.5 6.58V9.33C2.5 9.74 2.16 10.08 1.75 10.08Z" fill={'currentColor'} /><path d="M3.39 13.89H1.75C1.34 13.89 1 13.55 1 13.14V11.5C1 11.09 1.34 10.75 1.75 10.75C2.16 10.75 2.5 11.09 2.5 11.5V12.39H3.39C3.8 12.39 4.14 12.73 4.14 13.14C4.14 13.55 3.8 13.89 3.39 13.89Z" fill={'currentColor'} /><path d="M6.96 13.89H5.7C5.29 13.89 4.95 13.55 4.95 13.14C4.95 12.73 5.29 12.39 5.7 12.39H6.96C7.37 12.39 7.71 12.73 7.71 13.14C7.71 13.55 7.37 13.89 6.96 13.89Z" fill={'currentColor'} /><path d="M10.33 13.89H9.06C8.65 13.89 8.31 13.55 8.31 13.14C8.31 12.73 8.65 12.39 9.06 12.39H10.33C10.74 12.39 11.08 12.73 11.08 13.14C11.08 13.55 10.74 13.89 10.33 13.89Z" fill={'currentColor'} /></svg>;
};
EmptyFolder.displayName = 'EmptyFolder';
EmptyFolder.isGlyph = true;
export default EmptyFolder;