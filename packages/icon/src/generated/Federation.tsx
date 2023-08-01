/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 7c21ce09ecf7f4fa2278f4b4e2ce1e52
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface FederationProps extends LGGlyph.ComponentProps {}
const Federation = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: FederationProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Federation', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M8 0C9.6 0 10.8 1.3 10.8 3C10.8 4.5 9.8 5.7 8.5 6V8.1L11.6 10.5C12 10.2 12.6 10 13.1 10C14.7 10 15.9 11.3 15.9 13C15.9 14.7 14.6 16 13.1 16C11.5 16 10.3 14.7 10.3 13C10.3 12.3 10.5 11.7 10.9 11.2L8 9L5.1 11.2C5.5 11.7 5.7 12.3 5.7 13C5.7 14.7 4.4 16 2.9 16C1.4 16 0 14.7 0 13C0 11.3 1.3 10 2.8 10C3.4 10 3.9 10.2 4.3 10.5L7.4 8.1V5.9C6.2 5.7 5.2 4.5 5.2 3C5.2 1.3 6.4 0 8 0ZM8 5C8.8 5 9.9 4.2 9.9 3C9.9 1.9 9 1 8 1C7 1 6.1 1.9 6.1 3C6.1 4.2 7.1 5 8 5ZM2.8 11C1.8 11 0.9 11.9 0.9 13C0.9 14.1 1.7 15 2.8 15C3.9 15 4.7 14.1 4.7 13C4.7 11.9 3.9 11 2.8 11ZM13.2 11C12.2 11 11.3 11.9 11.3 13C11.3 14.1 12.1 15 13.2 15C14.3 15 15.1 14.1 15.1 13C15.1 11.9 14.2 11 13.2 11Z" fill={'currentColor'} /></svg>;
};
Federation.displayName = 'Federation';
Federation.isGlyph = true;
Federation.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Federation;