/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 28e42dbc28adbc681963ecba9ec4e887
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface WrenchProps extends LGGlyph.ComponentProps {}
const Wrench = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: WrenchProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Wrench', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M10.625 9.75C13.0422 9.75 15 7.79219 15 5.375C15 4.95664 14.9398 4.55195 14.8305 4.16641C14.7457 3.87109 14.382 3.80547 14.166 4.02148L12.066 6.12148C12.0144 6.17315 11.9508 6.21071 11.8821 6.23144C11.8043 6.25491 11.7248 6.21773 11.6673 6.1603L9.8397 4.33267C9.78227 4.27523 9.74509 4.19569 9.76856 4.11794C9.78929 4.04924 9.82685 3.98565 9.87852 3.93398L11.9785 1.83398C12.1945 1.61797 12.1262 1.2543 11.8336 1.16953C11.448 1.06016 11.0434 1 10.625 1C8.20781 1 6.25 2.95781 6.25 5.375C6.25 5.82904 6.32027 6.26861 6.44822 6.68115C6.48333 6.79434 6.4563 6.9187 6.3725 7.0025L1.54414 11.8309C1.19687 12.1781 1 12.6512 1 13.1434C1 14.1688 1.83125 15 2.85664 15C3.34883 15 3.82188 14.8031 4.16914 14.4559L8.99671 9.62829C9.08092 9.54408 9.20602 9.51727 9.31967 9.55285C9.73197 9.68189 10.1713 9.75 10.625 9.75ZM2.75 14.125C3.23325 14.125 3.625 13.7332 3.625 13.25C3.625 12.7668 3.23325 12.375 2.75 12.375C2.26675 12.375 1.875 12.7668 1.875 13.25C1.875 13.7332 2.26675 14.125 2.75 14.125Z" fill={'currentColor'} /></svg>;
};
Wrench.displayName = 'Wrench';
Wrench.isGlyph = true;
Wrench.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Wrench;