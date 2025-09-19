import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const containerStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${spacing[200]}px 0 0 0;
`

export const iconStyles = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
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

export const learnMoreStyles = css`
  display: inline;
  color: inherit;
`;