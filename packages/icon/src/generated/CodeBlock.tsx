/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 140cebefb85751df3735f2240e7bcd9f
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CodeBlockProps extends LGGlyph.ComponentProps {}
const CodeBlock = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CodeBlockProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'CodeBlock', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M13 4H3L3 12H13V4ZM3 2C1.89543 2 1 2.89543 1 4V12C1 13.1046 1.89543 14 3 14H13C14.1046 14 15 13.1046 15 12V4C15 2.89543 14.1046 2 13 2H3Z" fill={'currentColor'} /><path d="M4.22142 7.42141L6.256 5.7796C6.42099 5.64646 6.66621 5.66804 6.80371 5.82782L7.30163 6.4064C7.43913 6.56618 7.41683 6.80364 7.25184 6.93678L5.93426 8L7.25184 9.06322C7.41683 9.19636 7.43913 9.43382 7.30163 9.59359L6.80371 10.1722C6.66621 10.332 6.42099 10.3535 6.256 10.2204L4.22142 8.57859C4.04409 8.4355 3.94156 8.22352 3.94156 8C3.94156 7.77648 4.04409 7.5645 4.22142 7.42141Z" fill={'currentColor'} /><path d="M11.7786 7.42141L9.74399 5.7796C9.57899 5.64646 9.33377 5.66804 9.19628 5.82782L8.69836 6.4064C8.56086 6.56618 8.58315 6.80364 8.74815 6.93678L10.0657 8L8.74815 9.06322C8.58315 9.19636 8.56086 9.43382 8.69836 9.59359L9.19628 10.1722C9.33377 10.332 9.57899 10.3535 9.74399 10.2204L11.7786 8.57859C11.9559 8.4355 12.0584 8.22352 12.0584 8C12.0584 7.77648 11.9559 7.5645 11.7786 7.42141Z" fill={'currentColor'} /></svg>;
};
CodeBlock.displayName = 'CodeBlock';
CodeBlock.isGlyph = true;
CodeBlock.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default CodeBlock;