/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 7a7d8167d762f92975cb21cf0e6f63dd
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface OpenNewTabProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('OpenNewTab');

const OpenNewTab = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: OpenNewTabProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('OpenNewTab', title);
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
        <title id={titleId}>{'Open in New Tab'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <path
          d="M9.29411765,3 L10.7727647,4.47864706 L6.42788235,8.82352941 L7.17647059,9.57211765 L11.5218824,5.22776471 L13,6.70588235 L13,3 L9.29411765,3 Z M4,4.58823529 L4,12 L11.4122941,12 L11.4122941,7.76470588 L10.3529412,7.76470588 L10.3529412,10.9411765 L5.05882353,10.9411765 L5.05882353,5.64705882 L8.23529412,5.64705882 L8.23529412,4.58823529 L4,4.58823529 Z"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

OpenNewTab.displayName = 'OpenNewTab';
OpenNewTab.isGlyph = true;
OpenNewTab.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default OpenNewTab;
