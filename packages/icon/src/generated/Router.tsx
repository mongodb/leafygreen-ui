/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum e548ec039fe8c6f35e57f3ce88729a7c
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface RouterProps extends LGGlyph.ComponentProps {}
const Router = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: RouterProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Router', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M13.89 4.89001C13.61 4.77001 13.29 4.89001 13.16 5.17001L12.6 6.41001C12.56 6.31001 12.53 6.21001 12.49 6.12001C12.33 5.70001 12.17 5.27001 12.04 4.93001C11.91 4.59001 11.82 4.35001 11.78 4.25001C11.54 3.70001 11.2 3.38001 11.12 3.31001C11.12 3.31001 11.11 3.30001 11.1 3.30001C11.01 3.21001 10.41 2.66001 9.34003 2.53001C9.22003 2.52001 9.11003 2.51001 8.99003 2.51001C7.95003 2.51001 7.27003 3.03001 7.14003 3.12001C7.14003 3.12001 7.12003 3.13001 7.12003 3.14001C7.05003 3.19001 6.81003 3.38001 6.55003 3.71001C6.26003 4.08001 5.94003 4.64001 5.88003 5.37001V5.60001C5.88003 6.72001 6.47003 7.42001 6.61003 7.58001C6.61003 7.58001 7.80003 9.08001 8.48003 9.91001C8.70003 10.18 8.77003 10.51 8.77003 10.81C8.77003 10.97 8.75003 11.11 8.73003 11.21L8.70003 11.32V11.34V11.36V11.37C8.70003 11.39 8.62003 11.62 8.43003 11.85C8.23003 12.07 7.94003 12.3 7.37003 12.38C7.28003 12.39 7.19003 12.4 7.11003 12.4C6.64003 12.4 6.36003 12.23 6.17003 12.05C6.08003 11.96 6.01003 11.87 5.97003 11.81L5.93003 11.74V11.72L5.34003 10.61C5.76003 10.22 6.02003 9.67001 6.02003 9.06001C6.02003 7.89001 5.07003 6.94001 3.90003 6.94001C2.73003 6.94001 1.78003 7.89001 1.78003 9.06001C1.78003 10.23 2.73003 11.18 3.90003 11.18C4.06003 11.18 4.22003 11.16 4.37003 11.12L4.95003 12.21C4.99003 12.29 5.13003 12.56 5.44003 12.85C5.78003 13.17 6.35003 13.49 7.13003 13.49C7.26003 13.49 7.39003 13.49 7.52003 13.46C8.41003 13.35 9.01003 12.9 9.34003 12.47C9.64003 12.09 9.74003 11.76 9.77003 11.66C9.77003 11.66 9.89003 11.28 9.89003 10.79C9.89003 10.33 9.79003 9.73001 9.36003 9.19001C8.69003 8.37001 7.50003 6.87001 7.50003 6.87001V6.85001L7.47003 6.84001C7.44003 6.81001 6.99003 6.28001 7.00003 5.58001V5.44001C7.04003 5.00001 7.24003 4.63001 7.45003 4.37001C7.55003 4.24001 7.65003 4.14001 7.72003 4.08001L7.80003 4.01001H7.82003L7.83003 3.99001H7.84003C7.84003 3.99001 8.38003 3.59001 9.03003 3.59001H9.25003C9.63003 3.65001 9.92003 3.78001 10.12 3.89001C10.22 3.95001 10.29 4.00001 10.34 4.04001L10.39 4.08001V4.09001C10.39 4.09001 10.65 4.35001 10.79 4.68001C10.8 4.71001 10.91 4.97001 11.03 5.31001C11.19 5.72001 11.39 6.27001 11.58 6.77001L10.26 6.17001C9.98003 6.04001 9.66003 6.17001 9.53003 6.44001C9.40003 6.72001 9.53003 7.04001 9.80003 7.17001L12.35 8.33001C12.48 8.39001 12.63 8.40001 12.77 8.34001C12.91 8.29001 13.02 8.18001 13.08 8.05001L14.18 5.60001C14.3 5.32001 14.18 5.00001 13.9 4.87001L13.89 4.89001ZM2.85003 9.07001C2.85003 8.51001 3.31003 8.05001 3.87003 8.05001C4.43003 8.05001 4.89003 8.51001 4.89003 9.07001C4.89003 9.64001 4.43003 10.09 3.87003 10.09C3.30003 10.09 2.85003 9.63001 2.85003 9.07001Z" fill={'currentColor'} /></svg>;
};
Router.displayName = 'Router';
Router.isGlyph = true;
export default Router;