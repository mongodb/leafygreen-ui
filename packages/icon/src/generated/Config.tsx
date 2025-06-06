/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 838cfafe7207c67965e9f4bcb9c88dda
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ConfigProps extends LGGlyph.ComponentProps {}
const Config = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ConfigProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Config', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M12.7 2.56989C12.41 2.56989 12.17 2.80989 12.17 3.09989V4.34989L11.32 3.49989C9.21 1.39989 5.75 1.51989 3.78 3.75989C2.65 5.03989 2.23 6.82989 2.68 8.48989C3.24 10.5299 4.98 12.0099 7.08 12.2299L8.1 12.3399C8.42 13.2799 9.3 13.9499 10.34 13.9499C11.65 13.9499 12.71 12.8899 12.71 11.5799C12.71 10.2699 11.65 9.20989 10.34 9.20989C9.14 9.20989 8.16 10.0999 8 11.2599L7.19 11.1799C5.53 11.0099 4.14 9.82989 3.7 8.21989C3.34 6.90989 3.67 5.48989 4.58 4.46989C6.15 2.68989 8.9 2.59989 10.57 4.26989L11.42 5.11989H10.17C9.88 5.11989 9.64 5.35989 9.64 5.64989C9.64 5.93989 9.88 6.17989 10.17 6.17989H12.71C13 6.17989 13.24 5.93989 13.24 5.64989V3.09989C13.24 2.80989 13 2.56989 12.71 2.56989H12.7ZM10.34 10.3099C11.04 10.3099 11.6 10.8799 11.6 11.5699C11.6 12.2599 11.03 12.8299 10.34 12.8299C9.65 12.8299 9.08 12.2599 9.08 11.5699C9.08 10.8799 9.65 10.3099 10.34 10.3099Z" fill={'currentColor'} /></svg>;
};
Config.displayName = 'Config';
Config.isGlyph = true;
export default Config;