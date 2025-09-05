/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 1b3d40728665f27a2c0b6039f0387bf8
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface AIModelProps extends LGGlyph.ComponentProps {}
const AIModel = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: AIModelProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'AIModel', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M13.5625 5.30957V10.6895L8 13.4414L2.4375 10.6895V5.30957L8 2.55762L13.5625 5.30957Z" stroke={'currentColor'} /><path d="M8 2L8 14" stroke={'currentColor'} strokeWidth={0.5} /><path d="M3.09998 10.8594L12.5324 5.19998" stroke={'currentColor'} strokeWidth={0.5} strokeLinecap="round" /><path d="M3.19995 5.20001L12.6324 10.8595" stroke={'currentColor'} strokeWidth={0.5} strokeLinecap="round" /><circle cx={8} cy={2.75} r={1.75} fill={'currentColor'} /><circle cx={8} cy={2.75} r={1.75} stroke={'currentColor'} /><circle cx={8} cy={13.25} r={1.75} fill={'currentColor'} /><circle cx={8} cy={13.25} r={1.75} stroke={'currentColor'} /><circle cx={8} cy={8} r={1.75} fill={'currentColor'} /><circle cx={8} cy={8} r={1.75} stroke={'currentColor'} /><circle cx={13.25} cy={5} r={1.75} fill={'currentColor'} /><circle cx={13.25} cy={5} r={1.75} stroke={'currentColor'} /><circle cx={13.25} cy={10.75} r={1.75} fill={'currentColor'} /><circle cx={13.25} cy={10.75} r={1.75} stroke={'currentColor'} /><circle cx={2.75} cy={10.75} r={1.75} fill={'currentColor'} /><circle cx={2.75} cy={10.75} r={1.75} stroke={'currentColor'} /><circle cx={2.75} cy={5} r={1.75} fill={'currentColor'} /><circle cx={2.75} cy={5} r={1.75} stroke={'currentColor'} /></svg>;
};
AIModel.displayName = 'AIModel';
AIModel.isGlyph = true;
export default AIModel;