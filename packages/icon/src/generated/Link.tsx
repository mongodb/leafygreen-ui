/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 73d407f0cdea13c6bd67f6b2fafae9c6
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface LinkProps extends LGGlyph.ComponentProps {}
const Link = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: LinkProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Link', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M6.03867 9.95309C5.91948 9.8323 5.81065 9.70512 5.71217 9.57265L7.16282 8.12843C7.2355 8.27756 7.33323 8.41753 7.45605 8.54199C8.06167 9.15571 9.04795 9.1601 9.65896 8.55179L12.5432 5.68033C13.1542 5.07203 13.1586 4.08138 12.553 3.46767C11.9473 2.85395 10.9611 2.84956 10.3501 3.45786L9.97109 3.83515C9.5797 4.22481 8.94791 4.222 8.55996 3.82887C8.17202 3.43574 8.17482 2.80115 8.56622 2.41149L8.94518 2.03421C10.339 0.646579 12.5888 0.656589 13.9703 2.05657C15.3519 3.45655 15.3419 5.71635 13.9481 7.10399L11.0638 9.97545C9.67003 11.3631 7.42018 11.3531 6.03867 9.95309Z" fill={'currentColor'} /><path d="M9.96133 6.04691C10.0805 6.1677 10.1894 6.29488 10.2878 6.42735L8.83718 7.87157C8.7645 7.72244 8.66677 7.58247 8.54395 7.45801C7.93833 6.84429 6.95205 6.83991 6.34104 7.44821L3.45679 10.3197C2.84578 10.928 2.84141 11.9186 3.44703 12.5323C4.05265 13.1461 5.03893 13.1504 5.64994 12.5421L6.02891 12.1649C6.4203 11.7752 7.05209 11.778 7.44004 12.1711C7.82798 12.5643 7.82518 13.1988 7.43378 13.5885L7.05482 13.9658C5.66101 15.3534 3.41117 15.3434 2.02965 13.9434C0.648136 12.5435 0.658103 10.2836 2.05191 8.89601L4.93616 6.02455C6.32997 4.63692 8.57982 4.64693 9.96133 6.04691Z" fill={'currentColor'} /></svg>;
};
Link.displayName = 'Link';
Link.isGlyph = true;
Link.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Link;