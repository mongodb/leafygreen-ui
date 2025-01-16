/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/prebuild.ts
* @checksum 4a2e43ccad52d45e114b26b459788724
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface DisconnectProps extends LGGlyph.ComponentProps {}
const Disconnect = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: DisconnectProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Disconnect', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M7.09293 3.67136C6.96902 3.54745 6.96902 3.34652 7.09293 3.22258L8.14018 2.17538C9.70733 0.608258 12.2573 0.608152 13.8246 2.17538C15.3918 3.74259 15.3918 6.29263 13.8246 7.85981L12.7773 8.90702C12.6534 9.03093 12.4525 9.03093 12.3286 8.90702L11.2814 7.85989C11.1575 7.73597 11.1575 7.53505 11.2814 7.41111L12.3287 6.36392C13.071 5.62155 13.071 4.41366 12.3287 3.6713C11.5864 2.92896 10.3785 2.92893 9.63606 3.6713L8.58882 4.71849C8.4649 4.84241 8.26398 4.84241 8.14004 4.71849L7.09293 3.67136Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M1.29322 1.29322C1.68419 0.902259 2.31807 0.902259 2.70903 1.29322L14.7068 13.291C15.0977 13.6819 15.0977 14.3158 14.7068 14.7068C14.3158 15.0977 13.6819 15.0977 13.291 14.7068L10.132 11.5478L7.85982 13.8245C6.29267 15.3917 3.74267 15.3918 2.17538 13.8245C0.608205 12.2573 0.608205 9.70733 2.17538 8.14015L4.44761 5.86342L1.29322 2.70903C0.902259 2.31807 0.902259 1.68419 1.29322 1.29322ZM5.94352 7.35933L3.6713 9.63604C2.92896 10.3784 2.92896 11.5863 3.6713 12.3287C4.41363 13.071 5.62155 13.071 6.36394 12.3287L8.63614 10.0519L5.94352 7.35933Z" fill={'currentColor'} /></svg>;
};
Disconnect.displayName = 'Disconnect';
Disconnect.isGlyph = true;
export default Disconnect;