/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum b6cacc705237c981a3fe88a21803e47b
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ReplicaSetProps extends LGGlyph.ComponentProps {}
const ReplicaSet = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ReplicaSetProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ReplicaSet', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M9.39072 7.71281C8.96444 7.89758 8.49418 8 8 8C7.50582 8 7.03556 7.89758 6.60928 7.71281L5.26491 9.72938C5.719 10.182 6 10.8082 6 11.5C6 12.8807 4.88071 14 3.5 14C2.11929 14 1 12.8807 1 11.5C1 10.1193 2.11929 9 3.5 9C3.73768 9 3.96761 9.03317 4.18543 9.09513L5.56972 7.01868C4.91019 6.38216 4.5 5.48898 4.5 4.5C4.5 2.567 6.067 1 8 1C9.933 1 11.5 2.567 11.5 4.5C11.5 5.48898 11.0898 6.38216 10.4303 7.01868L11.8146 9.09513C12.0324 9.03317 12.2623 9 12.5 9C13.8807 9 15 10.1193 15 11.5C15 12.8807 13.8807 14 12.5 14C11.1193 14 10 12.8807 10 11.5C10 10.8082 10.281 10.182 10.7351 9.72938L9.39072 7.71281ZM9.75 4.5C9.75 5.4665 8.9665 6.25 8 6.25C7.0335 6.25 6.25 5.4665 6.25 4.5C6.25 3.5335 7.0335 2.75 8 2.75C8.9665 2.75 9.75 3.5335 9.75 4.5Z" fill={'currentColor'} /></svg>;
};
ReplicaSet.displayName = 'ReplicaSet';
ReplicaSet.isGlyph = true;
ReplicaSet.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default ReplicaSet;