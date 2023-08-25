/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 2c448b8df06d61f48e18c86ecb905153
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface VisibilityProps extends LGGlyph.ComponentProps {}
const Visibility = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: VisibilityProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Visibility', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8 2.00781C11.9337 2.00781 14.4728 5.13665 15.4548 6.59114L15.4984 6.65528C15.7132 6.97033 16 7.39096 16 8C16 8.60904 15.7132 9.02967 15.4984 9.34472L15.4548 9.40886C14.4728 10.8633 11.9337 13.9922 8 13.9922C4.06626 13.9922 1.52716 10.8633 0.545173 9.40886L0.501583 9.34472C0.286783 9.02967 0 8.60904 0 8C0 7.39096 0.286785 6.97033 0.501583 6.65529L0.545173 6.59114C1.52716 5.13665 4.06626 2.00781 8 2.00781ZM9.13023 4.13098C8.76962 4.05004 8.39264 4.00521 8.00001 4.00521C5.75051 4.00521 3.92692 5.79374 3.92692 8C3.92692 10.2063 5.75051 11.9948 8.00001 11.9948C7.62198 11.9948 7.24379 11.9497 6.86975 11.869C7.23037 11.95 7.60736 11.9948 8.00001 11.9948C10.2495 11.9948 12.0731 10.2063 12.0731 8C12.0731 5.79374 10.2495 4.00521 8.00001 4.00521C8.37803 4.00521 8.75619 4.05033 9.13023 4.13098ZM8 10.9961C9.68713 10.9961 11.0548 9.6547 11.0548 8C11.0548 6.3453 9.68713 5.00391 8 5.00391C6.31287 5.00391 4.94519 6.3453 4.94519 8C4.94519 9.6547 6.31287 10.9961 8 10.9961Z" fill={'currentColor'} /></svg>;
};
Visibility.displayName = 'Visibility';
Visibility.isGlyph = true;
Visibility.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Visibility;