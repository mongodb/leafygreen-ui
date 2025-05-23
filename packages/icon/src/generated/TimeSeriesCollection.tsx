/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 8a7c51cc91acd51132075ef631806881
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface TimeSeriesCollectionProps extends LGGlyph.ComponentProps {}
const TimeSeriesCollection = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: TimeSeriesCollectionProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'TimeSeriesCollection', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M13.6 10.3826H15C15.6 10.3826 16 10.8816 16 11.4805C16 12.0794 15.6 12.4787 15 12.4787H14.1L12.6 14.5748C12.4 14.8742 12 15.0738 11.6 14.974C11.2 14.8742 10.9 14.5748 10.8 14.1755L10.4 12.4787L10 13.6764C9.9 13.9759 9.5 14.2753 9.1 14.2753H8C7.4 14.2753 7 13.8761 7 13.2772C7 12.6783 7.4 12.279 8 12.279H8.4L9.8 8.58591C9.9 8.18665 10.4 7.98702 10.8 7.98702C11.2 7.98702 11.6 8.38628 11.7 8.68572L12.3 11.4805L12.8 10.7818C13 10.5822 13.3 10.3826 13.6 10.3826Z" fill={'currentColor'} /><path d="M1.92857 1C1.41574 1 1 1.40964 1 1.91497V11.0646C1 11.57 1.41574 11.9796 1.92857 11.9796H5.84028C5.94099 11.8068 6.06518 11.6437 6.21434 11.4948C6.53603 11.1737 6.92403 10.9685 7.33247 10.8644L8.37506 8.11411C8.58323 7.43691 9.08123 7.02881 9.48162 6.81567C9.90517 6.59019 10.376 6.4898 10.8 6.4898C11.4819 6.4898 12.0142 6.81318 12.3314 7.08112C12.6494 7.34973 12.9659 7.74184 13.123 8.21226L13.1493 8.29092L13.2818 8.90808C13.3842 8.8934 13.4904 8.88535 13.6 8.88535H14V3.7449C14 3.23958 13.5843 2.82993 13.0714 2.82993H7.5C6.98716 2.82993 6.57143 2.42029 6.57143 1.91497C6.57143 1.40964 6.15569 1 5.64286 1H1.92857Z" fill={'currentColor'} /><path d="M10.9494 8.00476C10.9275 7.99966 10.9055 7.9956 10.8835 7.99266L10.9494 8.00476Z" fill={'currentColor'} /></svg>;
};
TimeSeriesCollection.displayName = 'TimeSeriesCollection';
TimeSeriesCollection.isGlyph = true;
export default TimeSeriesCollection;