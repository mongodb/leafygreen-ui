/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum e4c0ebc68c4da3e4c22daf5e81659bbe
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
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M5 2C5 1.44772 5.44772 1 6 1C6.55228 1 7 1.44772 7 2V3C7 3.55228 6.55228 4 6 4C5.44772 4 5 3.55228 5 3V2ZM10 3H8C8 4.10457 7.10457 5 6 5C4.89543 5 4 4.10457 4 3C2.89543 3 2 3.89543 2 5V12C2 13.1046 2.89543 14 4 14H14C15.1046 14 16 13.1046 16 12V5C16 3.89543 15.1046 3 14 3C14 4.10457 13.1046 5 12 5C10.8954 5 10 4.10457 10 3ZM11 3C11 3.55228 11.4477 4 12 4C12.5523 4 13 3.55228 13 3V2C13 1.44772 12.5523 1 12 1C11.4477 1 11 1.44772 11 2V3ZM13 7H10V10H13V7Z" fill={'currentColor'} /></svg>;
};
Calendar.displayName = 'Calendar';
Calendar.isGlyph = true;
Calendar.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Calendar;