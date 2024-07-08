/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 3d5f44bdd05bac92049a002e87cefedf
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface EscalationProps extends LGGlyph.ComponentProps {}
const Escalation = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: EscalationProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Escalation', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M13.361 4.42325C13.719 4.11978 13.5628 3.53659 13.101 3.4528L5.14569 2.00923C4.74464 1.93645 4.40436 2.30596 4.50985 2.69966L6.29744 9.37104C6.40294 9.76474 6.88238 9.9146 7.19331 9.65105L13.361 4.42325ZM2.91191 2.10161C2.61554 2.18103 2.43965 2.48567 2.51907 2.78204L5.68249 14.5881C5.7619 14.8845 6.06654 15.0603 6.36292 14.9809C6.6593 14.9015 6.83518 14.5969 6.75576 14.3005L3.59234 2.49446C3.51293 2.19808 3.20829 2.0222 2.91191 2.10161Z" fill={'currentColor'} /></svg>;
};
Escalation.displayName = 'Escalation';
Escalation.isGlyph = true;
Escalation.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Escalation;