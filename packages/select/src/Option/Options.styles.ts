import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import {
  fontFamilies,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

export const OptionClassName = createUniqueClassName('option');

export const optionStyle = css`
  display: flex;
  width: 100%;
  outline: none;
  overflow-wrap: anywhere;
  transition: background-color ${transitionDuration.default}ms ease-in-out;
  position: relative;
  padding: ${spacing[2]}px 12px;
  line-height: inherit;
`;

export const optionTextStyle = css`
  display: flex;
  align-items: center;
  font-family: ${fontFamilies.default};
`;

export const iconStyle = css`
  min-width: 16px;
`;
