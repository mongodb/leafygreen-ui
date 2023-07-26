/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 0b39c82e3a34ed4c7ff0c2d0db3c709e
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface DatabaseProps extends LGGlyph.ComponentProps {}
const Database = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: DatabaseProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Database', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M14 4.11112C14 4.20874 13.9993 4.30407 13.9979 4.39715C13.9993 4.43127 14 4.46556 14 4.50001V4.75C14 5.07753 13.8516 5.39205 13.5278 5.70048C13.1982 6.01445 12.7096 6.29754 12.1036 6.53428C10.8929 7.00726 9.33171 7.25 8 7.25C6.66829 7.25 5.10707 7.00726 3.89641 6.53428C3.29044 6.29754 2.80176 6.01445 2.47218 5.70048C2.14842 5.39205 2 5.07753 2 4.75V4.50001C2 4.4614 2.00087 4.42301 2.00261 4.38483C2.00087 4.29579 2 4.20457 2 4.11112C2 2 5.04133 1.00001 8 1.00001C10.9587 1.00001 14 2 14 4.11112Z" fill={'currentColor'} /><path d="M2 6.61533V8.75C2 9.07753 2.14842 9.39205 2.47218 9.70048C2.80176 10.0145 3.29044 10.2975 3.89641 10.5343C5.10707 11.0073 6.66829 11.25 8 11.25C9.33171 11.25 10.8929 11.0073 12.1036 10.5343C12.7096 10.2975 13.1982 10.0145 13.5278 9.70048C13.8516 9.39205 14 9.07753 14 8.75V6.61533C13.5721 6.96184 13.0398 7.24214 12.4675 7.46572C11.1185 7.99274 9.42971 8.25 8 8.25C6.57029 8.25 4.88151 7.99274 3.53252 7.46572C2.96024 7.24214 2.42785 6.96184 2 6.61533Z" fill={'currentColor'} /><path d="M12.4675 11.4657C13.0398 11.2421 13.5721 10.9618 14 10.6153V11.5C14 11.5383 13.9991 11.5764 13.9974 11.6142C13.9991 11.7047 14 11.7962 14 11.8889C14 14 10.9587 15 8 15C5.04133 15 2 14 2 11.8889C2 11.792 2.00069 11.6964 2.00205 11.6021C2.00069 11.5682 2 11.5342 2 11.5V10.6153C2.42785 10.9618 2.96024 11.2421 3.53252 11.4657C4.88151 11.9927 6.57029 12.25 8 12.25C9.42971 12.25 11.1185 11.9927 12.4675 11.4657Z" fill={'currentColor'} /></svg>;
};
Database.displayName = 'Database';
Database.isGlyph = true;
Database.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Database;