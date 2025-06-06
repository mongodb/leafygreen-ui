/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 18812b652dec3c87cd0064139d828f55
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface GuideProps extends LGGlyph.ComponentProps {}
const Guide = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: GuideProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Guide', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M5.37041 4.32956C5.03839 4.32956 4.76923 4.61178 4.76923 4.95993C4.76923 5.30808 5.03839 5.5903 5.37041 5.5903H8.17592C8.50794 5.5903 8.7771 5.30808 8.7771 4.95993C8.7771 4.61178 8.50794 4.32956 8.17592 4.32956H5.37041Z" fill={'currentColor'} /><path d="M5.37041 6.4308C5.03839 6.4308 4.76923 6.71303 4.76923 7.06117C4.76923 7.40932 5.03839 7.69155 5.37041 7.69155H6.97356C7.30558 7.69155 7.57474 7.40932 7.57474 7.06117C7.57474 6.71303 7.30558 6.4308 6.97356 6.4308H5.37041Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M11.4956 2.86667V7.73074C12.952 8.2308 14 9.62499 14 11.2667C14 13.3285 12.3469 15 10.3077 15C8.97652 15 7.80987 14.2877 7.16021 13.2195H3.84615C2.82655 13.2195 2 12.3838 2 11.3529V2.86666C2 1.83573 2.82655 1 3.84615 1H9.64941C10.669 1 11.4956 1.83574 11.4956 2.86667ZM3.84615 2.86666L9.64941 2.86667L9.64941 7.59249C7.92428 7.9064 6.61538 9.43198 6.61538 11.2667C6.61538 11.2955 6.61571 11.3242 6.61635 11.3529H3.84615L3.84615 2.86666ZM10.8352 9.13333C10.8352 9.42789 10.599 9.66667 10.3077 9.66667C10.0164 9.66667 9.78022 9.42789 9.78022 9.13333C9.78022 8.83878 10.0164 8.6 10.3077 8.6C10.599 8.6 10.8352 8.83878 10.8352 9.13333ZM10.3077 10.2C10.599 10.2 10.8352 10.4388 10.8352 10.7333V12.8667H11.0989C11.2446 12.8667 11.3626 12.9861 11.3626 13.1333C11.3626 13.2806 11.2446 13.4 11.0989 13.4H9.51648C9.37083 13.4 9.25275 13.2806 9.25275 13.1333C9.25275 12.9861 9.37083 12.8667 9.51648 12.8667H9.78022V10.7333H9.51648C9.37083 10.7333 9.25275 10.6139 9.25275 10.4667C9.25275 10.3194 9.37083 10.2 9.51648 10.2H10.3077Z" fill={'currentColor'} /></svg>;
};
Guide.displayName = 'Guide';
Guide.isGlyph = true;
export default Guide;