
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { BaseFontSize, spacing, typeScales } from '@leafygreen-ui/tokens';

// TODO - Darkmode style(s)?

// const fontStyles: Record<BaseFontSize, string> = {
//   [BaseFontSize.Body1]: css`
//     font-size: ${typeScales.body1.fontSize}px;
//     line-height: ${typeScales.body1.lineHeight}px;
//   `,
//   [BaseFontSize.Body2]: css`
//     font-size: ${typeScales.body2.fontSize}px;
//     line-height: ${typeScales.body2.lineHeight}px;
//   `,
// };

// export const getTextStyles = (baseFontSize: BaseFontSize) => fontStyles[baseFontSize];

export const containerStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const iconStyles = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  padding: 4px 10px;
  width: ${spacing[900]}px;
  height: ${spacing[600]}px; 

  margin-right: ${spacing[200]}px;
  
  border-radius: ${spacing[600]}px;
  border: 1px solid ${palette.green.light2};
  background-color: ${palette.green.light3};

  & svg {
    color: ${palette.green.dark2};
  }
`
