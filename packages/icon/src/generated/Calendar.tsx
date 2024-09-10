/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 9d2337c4c60492aa85c4c4caede7fc3e
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CalendarProps extends LGGlyph.ComponentProps {}
const Calendar = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CalendarProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Calendar', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M4 2C4 1.44772 4.44772 1 5 1C5.55228 1 6 1.44772 6 2V3C6 3.55228 5.55228 4 5 4C4.44772 4 4 3.55228 4 3V2Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M9 3H7C7 4.10457 6.10457 5 5 5C3.89543 5 3 4.10457 3 3C1.89543 3 1 3.89543 1 5V12C1 13.1046 1.89543 14 3 14H13C14.1046 14 15 13.1046 15 12V5C15 3.89543 14.1046 3 13 3C13 4.10457 12.1046 5 11 5C9.89543 5 9 4.10457 9 3ZM12 7H9V10H12V7Z" fill={'currentColor'} /><path d="M10 3C10 3.55228 10.4477 4 11 4C11.5523 4 12 3.55228 12 3V2C12 1.44772 11.5523 1 11 1C10.4477 1 10 1.44772 10 2V3Z" fill={'currentColor'} /></svg>;
};
Calendar.displayName = 'Calendar';
Calendar.isGlyph = true;
Calendar.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Calendar;