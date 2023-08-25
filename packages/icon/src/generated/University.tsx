/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 7896dd1491deadd0ae7b2dfe4fb5a67c
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface UniversityProps extends LGGlyph.ComponentProps {}
const University = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: UniversityProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'University', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M8.5 4.61279C8.5 4.22996 8.69133 3.87245 9.00987 3.66009C9.66508 3.22328 10.3905 2.90238 11.1545 2.71139L13.5611 2.10972C13.7841 2.05399 14 2.22259 14 2.45237V10.3323C14 10.5698 14 10.6886 13.9571 10.7854C13.9193 10.8707 13.8583 10.9437 13.7811 10.9962C13.6936 11.0557 13.5768 11.077 13.3431 11.1194L9.44311 11.8285C9.11918 11.8874 8.95721 11.9169 8.83074 11.8714C8.71979 11.8315 8.62651 11.7536 8.56739 11.6516C8.5 11.5353 8.5 11.3707 8.5 11.0414V4.61279Z" fill={'currentColor'} /><path d="M2 2.45237C2 2.22259 2.21594 2.05399 2.43887 2.10972L4.84555 2.71139C5.6095 2.90238 6.33492 3.22328 6.99013 3.66009C7.30867 3.87245 7.5 4.22996 7.5 4.61279V11.0414C7.5 11.3707 7.5 11.5353 7.43262 11.6516C7.37349 11.7536 7.28022 11.8315 7.16926 11.8714C7.04279 11.9169 6.88083 11.8874 6.55689 11.8285L2.6569 11.1194C2.42324 11.077 2.30641 11.0557 2.21886 10.9962C2.14168 10.9437 2.08073 10.8707 2.04291 10.7854C2 10.6886 2 10.5698 2 10.3323V2.45237Z" fill={'currentColor'} /><path d="M2.00807 12.4106C2.05747 12.1389 2.31776 11.9587 2.58945 12.0081L7.73167 12.943C7.90911 12.9753 8.0909 12.9753 8.26833 12.943L13.4106 12.0081C13.6822 11.9587 13.9425 12.1389 13.9919 12.4106C14.0413 12.6822 13.8611 12.9425 13.5894 12.9919L9.45517 13.7436C9.29201 14.1782 8.70238 14.5 8 14.5C7.29762 14.5 6.70799 14.1782 6.54483 13.7436L2.41056 12.9919C2.13887 12.9425 1.95867 12.6822 2.00807 12.4106Z" fill={'currentColor'} /></svg>;
};
University.displayName = 'University';
University.isGlyph = true;
University.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default University;