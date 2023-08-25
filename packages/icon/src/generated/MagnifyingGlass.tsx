/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 00f0d5ae6a6274afa6dc6dcc44922339
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface MagnifyingGlassProps extends LGGlyph.ComponentProps {}
const MagnifyingGlass = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: MagnifyingGlassProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'MagnifyingGlass', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M2.3234 9.81874C4.07618 11.5715 6.75062 11.8398 8.78588 10.6244L12.93 14.7685C13.4377 15.2762 14.2608 15.2762 14.7685 14.7685C15.2762 14.2608 15.2762 13.4377 14.7685 12.93L10.6244 8.78588C11.8398 6.75062 11.5715 4.07619 9.81873 2.32341C7.74896 0.253628 4.39318 0.253628 2.3234 2.32341C0.253624 4.39319 0.253624 7.74896 2.3234 9.81874ZM7.98026 4.16188C9.03467 5.2163 9.03467 6.92585 7.98026 7.98026C6.92584 9.03468 5.2163 9.03468 4.16188 7.98026C3.10746 6.92585 3.10746 5.2163 4.16188 4.16188C5.2163 3.10747 6.92584 3.10747 7.98026 4.16188Z" fill={'currentColor'} /></svg>;
};
MagnifyingGlass.displayName = 'MagnifyingGlass';
MagnifyingGlass.isGlyph = true;
MagnifyingGlass.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default MagnifyingGlass;