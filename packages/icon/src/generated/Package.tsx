/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 6e59261cf982bdfcdfdce185d5ad6a28
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface PackageProps extends LGGlyph.ComponentProps {}
const Package = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: PackageProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Package', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M8.78017 1.21077L13.4652 3.92807C13.947 4.20828 14.2433 4.72229 14.2433 5.27913V10.7209C14.2433 10.9945 14.1715 11.2633 14.0349 11.5005C13.8983 11.7376 13.7019 11.9346 13.4652 12.0719L8.78017 14.7892C8.54213 14.9273 8.27184 15 7.99666 15C7.72148 15 7.45119 14.9273 7.21315 14.7892L2.52816 12.0719C2.29145 11.9346 2.09498 11.7376 1.95841 11.5005C1.82184 11.2633 1.74997 10.9945 1.75 10.7209V5.27913C1.75 4.72229 2.04627 4.20738 2.52816 3.92807L7.21315 1.21077C7.45119 1.07271 7.72148 1 7.99666 1C8.27184 1 8.54213 1.07271 8.78017 1.21077ZM7.88511 2.36908L3.75339 4.76512L7.99666 7.22631L12.2399 4.76512L8.10821 2.36908C8.07435 2.34932 8.03586 2.33891 7.99666 2.33891C7.95746 2.33891 7.91897 2.34932 7.88511 2.36908ZM3.08857 5.927V10.7209C3.08857 10.8012 3.13051 10.8735 3.20012 10.9136L7.32737 13.3079V8.38551L3.08857 5.927ZM8.66594 13.3079L12.7932 10.9136C12.8271 10.8941 12.8552 10.866 12.8747 10.8322C12.8943 10.7983 12.9047 10.76 12.9047 10.7209V5.927L8.66594 8.38551V13.3079Z" fill={'currentColor'} /></svg>;
};
Package.displayName = 'Package';
Package.isGlyph = true;
export default Package;