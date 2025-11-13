import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  borderRadius,
  color,
  focusRing,
  fontFamilies,
  fontWeights,
  InteractionState,
  spacing,
  transitionDuration,
  typeScales,
  Variant,
} from '@leafygreen-ui/tokens';

/**
 * when `InputBar` is used in a drawer (or other context that restricts
 * the width of the container), we need to set a minimum width so that
 * `react-textarea-autosize` can properly calculate the initial height
 * of the textarea element.
 */
const TEXT_AREA_MIN_WIDTH = 150;

const baseFormStyles = css`
  width: 100%;
`;

export const getFormStyles = (className?: string) =>
  cx(baseFormStyles, className);

export const outerFocusContainerStyles = css`
  position: relative;
`;

const baseFocusContainerStyles = css`
  border-radius: ${borderRadius[200]}px;
`;

const focusStyles = css`
  box-shadow: ${focusRing.light.input};
  border-color: transparent;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border-color, box-shadow;
`;

export const getInnerFocusContainerStyles = ({
  disabled,
  isFocused,
}: {
  disabled: boolean;
  isFocused: boolean;
}) =>
  cx(baseFocusContainerStyles, {
    [focusStyles]: !disabled && isFocused,
  });

const getBaseContentWrapperStyles = ({ theme }: { theme: Theme }) => css`
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: ${borderRadius[200]}px;
  border: 1px solid ${palette.gray.base};
  background-color: ${color[theme].background[Variant.Primary][
    InteractionState.Default
  ]};
  color: ${color[theme].text[Variant.Primary][InteractionState.Default]};

  &:disabled {
    cursor: not-allowed;

    &:hover,
    &:active {
      box-shadow: none;
    }
  }
`;

const getDisabledThemeStyles = (theme: Theme) => css`
  background-color: ${color[theme].background[Variant.Disabled][
    InteractionState.Default
  ]};
  border-color: ${color[theme].border[Variant.Disabled][
    InteractionState.Default
  ]};
  color: ${color[theme].text[Variant.Disabled][InteractionState.Default]};
`;

const contentWrapperFocusStyles = css`
  border-color: transparent;
`;

export const getContentWrapperStyles = ({
  disabled,
  isFocused,
  theme,
}: {
  disabled: boolean;
  isFocused: boolean;
  theme: Theme;
}) =>
  cx(getBaseContentWrapperStyles({ theme }), {
    [getDisabledThemeStyles(theme)]: disabled,
    [contentWrapperFocusStyles]: isFocused,
  });

const getBaseTextAreaStyles = ({ theme }: { theme: Theme }) => css`
  min-width: ${TEXT_AREA_MIN_WIDTH}px;
  width: 100%;
  font-size: ${BaseFontSize.Body1}px;
  font-family: ${fontFamilies.default};
  font-weight: ${fontWeights.regular};
  padding: ${spacing[200]}px;
  outline: none;
  border: none;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border-color, box-shadow;
  overflow-y: scroll;
  resize: none; // to remove bottom right diagonal lines
  box-sizing: content-box;
  line-height: ${typeScales.body1.lineHeight}px;
  background-color: inherit;
  color: inherit;
  margin: 0; // firefox creates margins on textareas - remove it for consistent sizing
  background-color: ${color[theme].background[Variant.Primary][
    InteractionState.Default
  ]};
  color: ${color[theme].text[Variant.Primary][InteractionState.Default]};

  &:disabled {
    ${getDisabledThemeStyles(theme)};

    &::placeholder {
      color: inherit;
    }

    &:disabled:-webkit-autofill {
      &,
      &:hover,
      &:focus {
        appearance: none;
        -webkit-text-fill-color: ${palette.gray.base};
      }
    }
  }
`;

export const getTextAreaStyles = ({
  className,
  theme,
}: {
  className?: string;
  theme: Theme;
}) => cx(getBaseTextAreaStyles({ theme }), className);

export const actionContainerStyles = css`
  display: flex;
  align-items: flex-end;
  align-self: flex-end;
  gap: ${spacing[200]}px;
  padding: ${spacing[100]}px;
`;

export const disclaimerTextStyles = css`
  margin-top: ${spacing[50]}px;
  text-align: center;
`;
