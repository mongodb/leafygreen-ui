/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum a0947f6a8bc4f0aa42a0db795f6439f6
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface OutlineFavoriteProps extends LGGlyph.ComponentProps {}
const OutlineFavorite = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: OutlineFavoriteProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'OutlineFavorite', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M7.76906 1.84601C7.76912 1.84614 7.76901 1.84587 7.76906 1.84601ZM7.99989 2.40099L9.30609 5.54144C9.30607 5.54139 9.30611 5.5415 9.30609 5.54144C9.48607 5.97429 9.89318 6.27011 10.3604 6.30757C10.3604 6.30757 10.3604 6.30757 10.3604 6.30757L13.751 6.57939L11.1677 8.79219C10.8115 9.09731 10.6564 9.57588 10.7651 10.0315L11.5542 13.3401L8.65146 11.5672C8.25149 11.3229 7.74839 11.3229 7.34841 11.5671L4.44554 13.3402L5.23476 10.0316C5.3435 9.57566 5.18809 9.09717 4.83207 8.79221C4.83208 8.79222 4.83206 8.7922 4.83207 8.79221L2.24883 6.57938L5.63936 6.30757C5.63936 6.30757 5.63937 6.30757 5.63936 6.30757C6.10663 6.27011 6.51363 5.97437 6.69363 5.54162L7.99989 2.40099ZM14.3501 6.62742C14.3501 6.62742 14.35 6.62741 14.3501 6.62742ZM9.15404 1.26996C8.72705 0.243319 7.27273 0.243376 6.84574 1.26996L5.3673 4.82456L1.52981 5.13221C0.421481 5.22106 -0.0279132 6.60421 0.816504 7.32754C0.816502 7.32754 0.816505 7.32754 0.816504 7.32754L3.74027 9.83206L2.84701 13.5768C2.58901 14.6584 3.76565 15.513 4.71443 14.9336L7.9999 12.9269L11.2854 14.9336C11.2854 14.9336 11.2854 14.9336 11.2854 14.9336C12.2342 15.5131 13.4107 14.6583 13.1527 13.5768C13.1527 13.5768 13.1527 13.5768 13.1527 13.5768L12.2596 9.83201L15.1833 7.32754C16.0275 6.60426 15.5784 5.22107 14.4699 5.13221C14.4699 5.13221 14.4699 5.13221 14.4699 5.13221L10.6325 4.82457L9.15404 1.26996C9.15404 1.26996 9.15404 1.26996 9.15404 1.26996ZM3.85623 9.9314C3.85627 9.93143 3.85619 9.93136 3.85623 9.9314Z" fill={'currentColor'} /></svg>;
};
OutlineFavorite.displayName = 'OutlineFavorite';
OutlineFavorite.isGlyph = true;
export default OutlineFavorite;