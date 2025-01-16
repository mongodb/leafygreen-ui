/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/prebuild.ts
* @checksum 6a146303e3de2ef65997d426cc96b2dc
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ExportProps extends LGGlyph.ComponentProps {}
const Export = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ExportProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Export', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M14.6225 5.18606C14.7258 5.07863 14.7258 4.90873 14.6225 4.80131L11.8181 1.88563C11.645 1.70566 11.3409 1.82825 11.3409 2.07801V3.50192C7.82458 3.58637 5 6.46333 5 10V10.1C5 10.9284 5.67157 11.6 6.5 11.6C7.32843 11.6 8 10.9284 8 10.1V10C8 8.12032 9.48177 6.58672 11.3409 6.50356V7.90935C11.3409 8.15911 11.645 8.2817 11.8181 8.10173L14.6225 5.18606Z" fill={'currentColor'} /><path d="M6.5 3.87895C6.5 3.46474 6.16421 3.12895 5.75 3.12895H4C2.89543 3.12895 2 4.02438 2 5.12895V11.9929C2 13.0975 2.89543 13.9929 4 13.9929H10.864C11.9686 13.9929 12.864 13.0975 12.864 11.9929V10.05C12.864 9.6358 12.5282 9.30002 12.114 9.30002C11.6998 9.30002 11.364 9.6358 11.364 10.05V11.9929C11.364 12.2691 11.1401 12.4929 10.864 12.4929H4C3.72386 12.4929 3.5 12.2691 3.5 11.9929V5.12895C3.5 4.85281 3.72386 4.62895 4 4.62895H5.75C6.16421 4.62895 6.5 4.29317 6.5 3.87895Z" fill={'currentColor'} /></svg>;
};
Export.displayName = 'Export';
Export.isGlyph = true;
export default Export;