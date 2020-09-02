/**
 * This is a generated file. Do not modify it manually. To regenerate the file, run:
 *   ts-node ./build.ts
 *
 * @checksum 97541f145b3fa59c6698f5f57ec60804
 *
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
export interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number | 'small' | 'default' | 'large' | 'xlarge';
  titleId?: string;
  title?: string | null | boolean;
}
const sizeMap = {
  small: 14,
  default: 16,
  large: 20,
  xlarge: 24,
};

function getGlyphTitle(name: string, title?: string | boolean | null) {
  if (title === false) {
    return null;
  }

  if (title == null || title === true) {
    return `${name.replace(/([a-z])([A-Z])/g, '$1 $2')} Icon`;
  }

  return title;
}

function generateGlyphTitle(): string {
  return 'Folder' + '-' + Math.floor(Math.random() * 1000000);
}

const Folder = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: Props) => {
  const titleId = React.useMemo(() => customTitleId || generateGlyphTitle(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Folder', title);
  return (
    <svg
      className={cx(
        {
          [fillStyle]: fill != null,
        },
        className,
      )}
      height={typeof size === 'number' ? size : sizeMap[size]}
      width={typeof size === 'number' ? size : sizeMap[size]}
      {...props}
      viewBox="0 0 16 16"
      role="img"
      aria-labelledby={titleId}
    >
      {title === undefined ? (
        <title id={titleId}>{'Glyphs / Folder'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
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
