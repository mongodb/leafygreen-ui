/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 28181e476135f27a919e10ac176afd9f
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface BiometricProps extends LGGlyph.ComponentProps {}
const Biometric = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: BiometricProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Biometric', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M7.5 1C4.46243 1 2 3.46243 2 6.5V9.5C2 12.5376 4.46243 15 7.5 15H8.5C11.5376 15 14 12.5376 14 9.5V6.5C14 3.46243 11.5376 1 8.5 1H7.5ZM8.57432 7.75001C8.57432 7.43282 8.31719 7.17569 8 7.17569C7.68281 7.17569 7.42567 7.43282 7.42567 7.75001V10.2069C7.42567 10.5241 7.68281 10.7812 8 10.7812C8.31719 10.7812 8.57432 10.5241 8.57432 10.2069V7.75001ZM8.00001 5.33783C6.66781 5.33783 5.58785 6.41779 5.58785 7.74999V10.3164C5.58785 10.5802 5.48308 10.8331 5.2966 11.0196C5.07232 11.2438 5.07232 11.6075 5.2966 11.8318C5.52089 12.0561 5.88453 12.0561 6.10882 11.8318C6.51071 11.4299 6.7365 10.8848 6.7365 10.3164V7.74999C6.7365 7.05217 7.30219 6.48648 8.00001 6.48648C8.69783 6.48648 9.26352 7.05217 9.26352 7.74999V10.3983C9.26352 10.8104 9.03068 11.1871 8.66208 11.3714C8.37838 11.5133 8.26338 11.8583 8.40524 12.142C8.54709 12.4257 8.89207 12.5407 9.17577 12.3988C9.93352 12.0199 10.4122 11.2455 10.4122 10.3983V7.74999C10.4122 6.41779 9.33221 5.33783 8.00001 5.33783ZM4.89865 7.75C4.89865 6.03717 6.28717 4.64865 8 4.64865C8.6033 4.64865 9.16475 4.82034 9.64017 5.11727C9.9092 5.28529 10.2635 5.20341 10.4315 4.93438C10.5996 4.66535 10.5177 4.31104 10.2486 4.14302C9.59605 3.73544 8.82464 3.5 8 3.5C5.65279 3.5 3.75 5.40279 3.75 7.75V10.0473C3.75 10.3645 4.00713 10.6216 4.32432 10.6216C4.64151 10.6216 4.89865 10.3645 4.89865 10.0473V7.75ZM11.7861 5.81757C11.6417 5.53515 11.2957 5.42326 11.0133 5.56765C10.7309 5.71205 10.619 6.05805 10.7634 6.34047C10.9793 6.76274 11.1014 7.24128 11.1014 7.75V9.12838C11.1014 9.44557 11.3585 9.7027 11.6757 9.7027C11.9929 9.7027 12.25 9.44557 12.25 9.12838V7.75C12.25 7.0553 12.0829 6.39796 11.7861 5.81757Z" fill={'currentColor'} /></svg>;
};
Biometric.displayName = 'Biometric';
Biometric.isGlyph = true;
export default Biometric;