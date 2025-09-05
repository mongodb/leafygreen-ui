/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum e3557fcbfdcc2f05665dab6cb7c73753
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface DownloadProps extends LGGlyph.ComponentProps {}
const Download = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: DownloadProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Download', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M8.86193 2.74973L8.86193 7.95618L10.0128 6.80534C10.3056 6.51255 10.7803 6.51255 11.0731 6.80534L11.2522 6.98446C11.545 7.27725 11.545 7.75195 11.2522 8.04474L8.71611 10.5808C8.70969 10.5877 8.70311 10.5946 8.69638 10.6013L8.51726 10.7804C8.22447 11.0732 7.74976 11.0732 7.45698 10.7804L4.71959 8.04302C4.4268 7.75024 4.4268 7.27553 4.71959 6.98274L4.89871 6.80362C5.1915 6.51083 5.66621 6.51083 5.95899 6.80362L7.10914 7.95377V2.74973C7.10914 2.33567 7.44481 2 7.85888 2L8.1122 2C8.52626 2 8.86193 2.33567 8.86193 2.74973Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M3 10.25C3.41421 10.25 3.75 10.5858 3.75 11V12C3.75 12.1381 3.86193 12.25 4 12.25H12C12.1381 12.25 12.25 12.1381 12.25 12V11C12.25 10.5858 12.5858 10.25 13 10.25C13.4142 10.25 13.75 10.5858 13.75 11V12C13.75 12.9665 12.9665 13.75 12 13.75H4C3.0335 13.75 2.25 12.9665 2.25 12V11C2.25 10.5858 2.58579 10.25 3 10.25Z" fill={'currentColor'} /></svg>;
};
Download.displayName = 'Download';
Download.isGlyph = true;
export default Download;