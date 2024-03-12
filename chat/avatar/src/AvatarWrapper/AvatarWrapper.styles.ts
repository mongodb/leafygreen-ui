import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

export const baseStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
  background-color: ${palette.gray.light1};
`;
