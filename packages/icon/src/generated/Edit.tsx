/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum c5b914d85eb2e86f105f7e1c82745c05
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface EditProps extends LGGlyph.ComponentProps {}
const Edit = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: EditProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Edit', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M10.9219 0.681233C11.2981 0.304986 11.9082 0.304986 12.2844 0.681233L13.6469 2.04375C14.0232 2.41999 14.0232 3.03001 13.6469 3.40626L12.2844 4.76877L9.55939 2.04375L8.5375 3.06563L11.2625 5.79066L4.10934 12.9438L0.362427 13.9657L1.38431 10.2188L10.9219 0.681233Z" fill={'currentColor'} /></svg>;
};
Edit.displayName = 'Edit';
Edit.isGlyph = true;
Edit.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Edit;