/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum d7947ec1e06764f19e24f099356a04f5
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface FolderProps extends LGGlyph.ComponentProps {}

const Folder = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: FolderProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Folder', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
  });
  return (
    <svg
      className={cx(
        {
          [fillStyle]: fill != null,
        },
        noFlexShrink,
        className,
      )}
      height={typeof size === 'number' ? size : sizeMap[size]}
      width={typeof size === 'number' ? size : sizeMap[size]}
      role={role}
      {...accessibleProps}
      {...props}
      viewBox="0 0 16 16"
    >
      <g
        id="Glyphs-/-Folder"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M8.8168828,3.47879822 L7.33518709,2 L3.18336484,2 C1.97540781,2 1,2.97388186 1,4.17062315 L1,10.8293769 C1,12.0261181 1.97540781,13 3.18336484,13 L12.8166352,13 C14.0245922,13 15,12.0261181 15,10.8293769 L15,5.65034619 L14.9940238,5.48860609 C14.9108461,4.36708234 13.9696851,3.47972305 12.8166352,3.47972305 L8.8168828,3.47879822 Z M3.04087194,4 L6.39559946,4 L7.92153761,5.53301127 L12.9591281,5.53301127 C12.9795363,5.53301127 13,5.55357057 13,5.58373591 L13,10.9492754 C13,10.9794407 12.9795363,11 12.9591281,11 L3.04087194,11 C3.02046374,11 3,10.9794407 3,10.9492754 L3,4.05072464 C3,4.0205593 3.02046374,4 3.04087194,4 Z"
          id="Path"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Folder.displayName = 'Folder';
Folder.isGlyph = true;
Folder.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Folder;
