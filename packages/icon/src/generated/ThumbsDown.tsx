/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum b6b01c1f22b5d6b3f95b000d74920803
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ThumbsDownProps extends LGGlyph.ComponentProps {}
const ThumbsDown = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ThumbsDownProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ThumbsDown', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8.01852 15C8.53023 15 8.99812 14.7199 9.22744 14.2764L11.728 9.43945C11.7542 9.38879 11.7773 9.33683 11.7972 9.28386C11.8277 9.28652 11.8584 9.28788 11.8896 9.28788L13.9843 9.28788C14.5453 9.28788 15 8.84694 15 8.30303L15 3.18182C15 2.6379 14.5453 2 13.9844 2L11.8896 2C11.6144 2 11 2 11 2C11 2 10.3639 2 9.85827 2L3.99311 2C3.02273 2 2.18787 2.66552 2.00017 3.5887L1.03904 8.31597C0.791531 9.53331 1.7524 10.6667 3.03198 10.6667L5.31958 10.6667L5.31958 12.3829C5.31958 13.8283 6.52794 15 8.01852 15ZM9.85827 8.66091L7.65371 12.9252C7.47137 12.8096 7.35088 12.6099 7.35088 12.3829L7.35088 10.0758C7.35088 9.31427 6.71427 8.69697 5.92897 8.69697L3.64387 8.69697C3.32769 8.69697 3.09089 8.40718 3.15389 8.09735L3.9117 4.37008C3.95907 4.1371 4.16394 3.9697 4.40168 3.9697L9.85827 3.9697L9.85827 8.66091Z" fill={'currentColor'} /></svg>;
};
ThumbsDown.displayName = 'ThumbsDown';
ThumbsDown.isGlyph = true;
ThumbsDown.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default ThumbsDown;