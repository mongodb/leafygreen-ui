/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 4865a10feed3ea0d2e3f9391f4c39e54
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface WarningProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('Warning');

const Warning = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: WarningProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Warning', title);
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
        <title id={titleId}>{'Glyphs / Warning'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Warning"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M9.30723029,0.76487417 L15.7424591,12.2052809 C16.1486048,12.9273177 15.8925244,13.8418903 15.1704876,14.248036 C14.9459652,14.3743299 14.692701,14.4406727 14.4350958,14.4406727 L1.56463821,14.4406727 C0.736211087,14.4406727 0.0646382121,13.7690999 0.0646382121,12.9406727 C0.0646382121,12.6830675 0.130981021,12.4298033 0.257274906,12.2052809 L6.69250368,0.76487417 C7.09864939,0.0428373535 8.01322203,-0.213242986 8.73525884,0.192902723 C8.97469558,0.327585886 9.17254713,0.525437435 9.30723029,0.76487417 Z M6.74986699,4.36840711 L6.99986699,9.36840711 L8.99986699,9.36840711 L9.24986699,4.36840711 L6.74986699,4.36840711 Z M7.99986699,12.8684071 C8.69022292,12.8684071 9.24986699,12.308763 9.24986699,11.6184071 C9.24986699,10.9280512 8.69022292,10.3684071 7.99986699,10.3684071 C7.30951105,10.3684071 6.74986699,10.9280512 6.74986699,11.6184071 C6.74986699,12.308763 7.30951105,12.8684071 7.99986699,12.8684071 Z"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Warning.displayName = 'Warning';
Warning.isGlyph = true;
Warning.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Warning;
