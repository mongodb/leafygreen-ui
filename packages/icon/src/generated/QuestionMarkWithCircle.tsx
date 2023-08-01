/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 280c4205c7e4533dd2b3b1b3a95160e8
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface QuestionMarkWithCircleProps extends LGGlyph.ComponentProps {}
const QuestionMarkWithCircle = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: QuestionMarkWithCircleProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'QuestionMarkWithCircle', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM6.93227 5.61177C7.0539 5.29832 7.42458 5 7.94143 5C8.61601 5 9 5.4776 9 5.875C9 6.03721 8.94264 6.20509 8.82756 6.35116C8.76453 6.43073 8.68409 6.50399 8.58601 6.56699L8.56965 6.57753C8.53867 6.59652 8.50602 6.61442 8.47169 6.63109C7.88242 6.91723 6.94143 7.59774 6.94143 8.75V9C6.94143 9.55228 7.38915 10 7.94143 10C8.49372 10 8.94143 9.55228 8.94143 9C8.94143 8.96493 8.95319 8.88081 9.0803 8.7302C9.21177 8.57445 9.41415 8.41209 9.66687 8.24976C9.94193 8.07309 10.1889 7.85162 10.3934 7.59438C10.7685 7.12328 11 6.5327 11 5.875C11 4.20133 9.54068 3 7.94143 3C6.66566 3 5.51129 3.74519 5.06773 4.88823C4.86793 5.40311 5.12335 5.98247 5.63823 6.18227C6.15311 6.38207 6.73247 6.12665 6.93227 5.61177ZM8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z" fill={'currentColor'} /></svg>;
};
QuestionMarkWithCircle.displayName = 'QuestionMarkWithCircle';
QuestionMarkWithCircle.isGlyph = true;
QuestionMarkWithCircle.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default QuestionMarkWithCircle;