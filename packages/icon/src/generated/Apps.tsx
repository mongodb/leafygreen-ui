/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum b70274694dfe4476fe81133905da27e0
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface AppsProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('Apps');

const Apps = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: AppsProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  title = getGlyphTitle('Apps', title);
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
      {...props}
      viewBox="0 0 16 16"
      role="img"
      aria-labelledby={titleId}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <rect x={3} y={3} width={4} height={4} fill={'currentColor'} />
      <rect x={3} y={9} width={4} height={4} fill={'currentColor'} />
      <rect x={9} y={3} width={4} height={4} fill={'currentColor'} />
      <rect x={9} y={9} width={4} height={4} fill={'currentColor'} />
    </svg>
  );
};

Apps.displayName = 'Apps';
Apps.isGlyph = true;
Apps.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Apps;
