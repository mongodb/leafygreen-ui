/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum ede3cbde3853c792512e610994170652
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface BulbProps extends LGGlyph.ComponentProps {}
const Bulb = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: BulbProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Bulb', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M12.3311 8.5C12.7565 7.76457 13 6.91072 13 6C13 3.23858 10.7614 1 8 1C5.23858 1 3 3.23858 3 6C3 6.94628 3.26287 7.83117 3.71958 8.58561L5.40749 11.501C5.58628 11.8099 5.91607 12 6.27291 12H6.5V6C6.5 5.17157 7.17157 4.5 8 4.5C8.82843 4.5 9.5 5.17157 9.5 6V12H9.72368C10.0793 12 10.4082 11.8111 10.5874 11.5039L12.34 8.5H12.3311Z" fill={'currentColor'} /><path d="M7.5 6V12H8.5V6C8.5 5.72386 8.27614 5.5 8 5.5C7.72386 5.5 7.5 5.72386 7.5 6Z" fill={'currentColor'} /><path d="M10 14V13H6V14C6 14.5523 6.44772 15 7 15H9C9.55228 15 10 14.5523 10 14Z" fill={'currentColor'} /></svg>;
};
Bulb.displayName = 'Bulb';
Bulb.isGlyph = true;
Bulb.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Bulb;