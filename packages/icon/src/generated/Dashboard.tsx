/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 815504b5936468163ee07eba2b72393a
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface DashboardProps extends LGGlyph.ComponentProps {}
const Dashboard = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: DashboardProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Dashboard', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M2 2.5C2 2.22386 2.22386 2 2.5 2H5.5C5.77614 2 6 2.22386 6 2.5V8.5C6 8.77614 5.77614 9 5.5 9H2.5C2.22386 9 2 8.77614 2 8.5V2.5Z" fill={'currentColor'} /><path d="M7 7.5C7 7.22386 7.22386 7 7.5 7H13.5C13.7761 7 14 7.22386 14 7.5V13.5C14 13.7761 13.7761 14 13.5 14H7.5C7.22386 14 7 13.7761 7 13.5V7.5Z" fill={'currentColor'} /><path d="M7 2.5C7 2.22386 7.22386 2 7.5 2H13.5C13.7761 2 14 2.22386 14 2.5V5.5C14 5.77614 13.7761 6 13.5 6H7.5C7.22386 6 7 5.77614 7 5.5V2.5Z" fill={'currentColor'} /><path d="M2 10.5C2 10.2239 2.22386 10 2.5 10H5.5C5.77614 10 6 10.2239 6 10.5V13.5C6 13.7761 5.77614 14 5.5 14H2.5C2.22386 14 2 13.7761 2 13.5V10.5Z" fill={'currentColor'} /></svg>;
};
Dashboard.displayName = 'Dashboard';
Dashboard.isGlyph = true;
Dashboard.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Dashboard;