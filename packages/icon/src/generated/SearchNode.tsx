/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 944a0b27355b0b2cc6ec9d8e75a02efa
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SearchNodeProps extends LGGlyph.ComponentProps {}
const SearchNode = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SearchNodeProps) => {
  const titleId = useIdAllocator({
    prefix: 'icon-title'
  });
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'SearchNode', {
    title,
    titleId,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16">{title && <title id={titleId}>{title}</title>}<path fillRule="evenodd" clipRule="evenodd" d="M8.3883 9.2529C7.4312 9.8245 6.1735 9.6983 5.3492 8.8741C4.3758 7.9007 4.3758 6.3225 5.3492 5.3492C6.3225 4.3758 7.9007 4.3758 8.8741 5.3492C9.6983 6.1735 9.8245 7.4312 9.2529 8.3883L11.2018 10.3372C11.4405 10.5759 11.4405 10.9631 11.2018 11.2018C10.9631 11.4405 10.5759 11.4405 10.3372 11.2018L8.3883 9.2529ZM8.0095 8.0095C8.5053 7.5136 8.5053 6.7096 8.0095 6.2138C7.5136 5.7179 6.7096 5.7179 6.2138 6.2138C5.7179 6.7096 5.7179 7.5136 6.2138 8.0095C6.7096 8.5053 7.5136 8.5053 8.0095 8.0095Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 11.866 11.866 15 8 15C4.134 15 1 11.866 1 8C1 4.134 4.134 1 8 1C11.866 1 15 4.134 15 8ZM13.5 8C13.5 11.0375 11.0375 13.5 8 13.5C4.9624 13.5 2.5 11.0375 2.5 8C2.5 4.9624 4.9624 2.5 8 2.5C11.0375 2.5 13.5 4.9624 13.5 8Z" fill={'currentColor'} /></svg>;
};
SearchNode.displayName = 'SearchNode';
SearchNode.isGlyph = true;
export default SearchNode;