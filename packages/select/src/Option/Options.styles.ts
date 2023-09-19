import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { fontFamilies, transitionDuration } from '@leafygreen-ui/tokens';

export const OptionClassName = createUniqueClassName('option');

export const optionStyle = css`
  display: flex;
  width: 100%;
  outline: none;
  overflow-wrap: anywhere;
  transition: background-color ${transitionDuration.default}ms ease-in-out;
  position: relative;
  padding: 8px 12px;

  &:before {
    content: '';
    position: absolute;
    transform: scaleY(0.3);
    top: 7px;
    bottom: 7px;
    left: 0;
    right: 0;
    width: 4px;
    border-radius: 0px 4px 4px 0px;
    opacity: 0;
    transition: all ${transitionDuration.default}ms ease-in-out;
  }
`;

export const optionTextStyle = css`
  display: flex;
  align-items: center;
  font-family: ${fontFamilies.default};
`;

export const iconStyle = css`
  min-width: 16px;
  margin-right: 6px;
`;

export const glyphFocusStyle = css`
  .${OptionClassName} {
    &:focus-visible & {
      color: currentColor;
    }
  }
`;
