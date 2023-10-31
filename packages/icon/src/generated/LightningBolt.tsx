/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum ae062790b82d82a5c11a37a16da576b4
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface LightningBoltProps extends LGGlyph.ComponentProps {}
const LightningBolt = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: LightningBoltProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'LightningBolt', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M9.22274 1.99296C9.22274 1.49561 8.56293 1.31233 8.30107 1.73667L4.07384 8.58696C3.87133 8.91513 4.10921 9.33717 4.49748 9.33717H6.77682L6.77682 14.0066C6.77682 14.504 7.43627 14.6879 7.69813 14.2635L11.9262 7.4118C12.1288 7.08363 11.8903 6.66244 11.5021 6.66244H9.22274V1.99296Z" fill={'currentColor'} /></svg>;
};
LightningBolt.displayName = 'LightningBolt';
LightningBolt.isGlyph = true;
LightningBolt.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default LightningBolt;