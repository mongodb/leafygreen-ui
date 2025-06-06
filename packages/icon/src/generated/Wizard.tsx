/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 5b33d6cf125f46f78cdf756bcb18ceb6
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface WizardProps extends LGGlyph.ComponentProps {}
const Wizard = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: WizardProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Wizard', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M13.3273 3.27672C13.5149 2.89768 13.0912 2.47755 12.709 2.66362L10.1963 3.88661C10.0254 3.96982 9.81429 3.93162 9.67346 3.79198L7.60363 1.73961C7.28873 1.42736 6.7744 1.67771 6.85304 2.10495L7.36999 4.91317C7.40516 5.10424 7.31323 5.28994 7.14227 5.37315L4.62965 6.59614C4.24739 6.78221 4.35321 7.35705 4.78408 7.43504L7.61618 7.94762C7.80888 7.9825 7.96315 8.13547 7.99832 8.32654L8.51527 11.1348C8.59391 11.562 9.17365 11.6669 9.3613 11.2879L10.5947 8.79645C10.6786 8.62694 10.8659 8.53579 11.0586 8.57066L13.8907 9.08324C14.3216 9.16123 14.574 8.65123 14.2591 8.33898L12.1893 6.28661C12.0485 6.14697 12.01 5.93766 12.0939 5.76815L13.3273 3.27672ZM7 10.5C7.35311 10.1498 7.31222 9.54163 6.90867 9.14149C6.50512 8.74134 5.89174 8.7008 5.53863 9.05092L1.84025 12.7127C1.48714 13.0628 1.52803 13.6711 1.93158 14.0712C2.33513 14.4713 2.94851 14.5119 3.30162 14.1618L7 10.5Z" fill={'currentColor'} /></svg>;
};
Wizard.displayName = 'Wizard';
Wizard.isGlyph = true;
export default Wizard;