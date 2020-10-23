/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 5712f6c7ee39dbd29f8a6e1c8046bbcc
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface InviteUserProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('InviteUser');

const InviteUser = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: InviteUserProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('InviteUser', title);
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
        <title id={titleId}>{'Glyphs / Invite User'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Invite-User"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M13.4736,9.55 L13.4736,12 L15.9986,12.001 L15.9986,13.635 L13.4736,13.635 L13.4736,16.086 L11.7896,16.086 L11.7896,13.635 L9.2646,13.635 L9.2646,12.001 L11.7896,12.001 L11.7896,9.55 L13.4736,9.55 Z M7.999,0.9997 C10.209,0.9997 11.997,2.7517 11.997,5.5247 C11.997,5.8117 11.976,6.0927 11.938,6.3667 C11.935,6.3917 11.931,6.4167 11.927,6.4427 C11.893,6.6767 11.842,6.9027 11.782,7.1237 C11.767,7.1847 11.75,7.2447 11.731,7.3077 C11.696,7.4237 11.65,7.5317 11.608,7.6437 L11.608,7.6437 L11.626,7.6277 C11.626,7.6277 11.465,8.1007 11.115,8.6427 C11.101,8.6657 11.087,8.6887 11.071,8.7117 C10.804,9.1117 10.437,9.5387 9.944,9.8427 C9.943,9.8417 9.944,9.8407 9.943,9.8397 C9.485,10.1507 8.917,10.3917 8.231,10.5387 C8.151,10.5377 8.082,10.5357 8,10.5357 C7.845,10.5357 7.702,10.5377 7.554,10.5387 C7.433,10.5507 7.331,10.5557 7.257,10.5577 C7.216,10.5587 7.175,10.5597 7.135,10.5607 C7.123,10.5597 7.11,10.5597 7.11,10.5597 L7.11,10.5597 C3.304,10.6357 2.001,11.2717 2.001,14.0717 L2.001,14.0717 L0.002,14.0717 L0.002,14.0717 L0.003,14.0357 C2.2169766e-15,10.1307 2.326,9.0057 4.888,8.6687 C4.335,7.8137 4,6.7167 4,5.5247 C4,2.7517 5.789,0.9997 7.999,0.9997 Z M7.999,3.0107 C6.788,3.0107 6,4.0007 6,5.5247 C6,7.1357 6.937,8.5407 7.999,8.5407 C9.061,8.5407 9.998,7.1357 9.998,5.5247 C9.998,4.0007 9.217,3.0107 7.999,3.0107 Z"
          id="Invite-User"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

InviteUser.displayName = 'InviteUser';
InviteUser.isGlyph = true;
InviteUser.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default InviteUser;
