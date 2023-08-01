/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 827184ea39540db5d4bae92d3e499c79
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface MultiDirectionArrowProps extends LGGlyph.ComponentProps {}
const MultiDirectionArrow = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: MultiDirectionArrowProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'MultiDirectionArrow', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M5 8.57279V13.4272C5 13.9565 4.39241 14.2015 4.0721 13.8014L2.12898 11.3742C1.95701 11.1594 1.95701 10.8406 2.12898 10.6258L4.0721 8.19856C4.39241 7.79846 5 8.04351 5 8.57279Z" fill={'currentColor'} /><path d="M5 10H12.5C12.7761 10 13 10.2239 13 10.5V11.5C13 11.7761 12.7761 12 12.5 12H5V10Z" fill={'currentColor'} /><path d="M11 7.42721V2.57279C11 2.04351 11.6076 1.79846 11.9279 2.19856L13.871 4.62577C14.043 4.84058 14.043 5.15942 13.871 5.37423L11.9279 7.80144C11.6076 8.20154 11 7.95649 11 7.42721Z" fill={'currentColor'} /><path d="M3 4.5C3 4.22386 3.22386 4 3.5 4H11V6H3.5C3.22386 6 3 5.77614 3 5.5V4.5Z" fill={'currentColor'} /></svg>;
};
MultiDirectionArrow.displayName = 'MultiDirectionArrow';
MultiDirectionArrow.isGlyph = true;
MultiDirectionArrow.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default MultiDirectionArrow;