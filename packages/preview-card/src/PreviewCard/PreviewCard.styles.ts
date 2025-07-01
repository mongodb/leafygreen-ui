import { transparentize } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import {
  BaseFontSize,
  borderRadius,
  color,
  fontWeights,
  InteractionState,
  spacing,
  transitionDuration,
  Variant,
} from '@leafygreen-ui/tokens';

export const contentWrapperClassName = createUniqueClassName(
  'preview_card-content_wrapper',
);

const BUTTON_HEIGHT = 20;
const GRADIENT_HEIGHT = 38;
export const TRANSITION_DURATION = transitionDuration.slower;

export const getBaseCardStyles = (theme: Theme) => css`
  border: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
  background: ${color[theme].background[Variant.Primary][
    InteractionState.Default
  ]};
  border-radius: ${borderRadius[200]}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const getCardStyles = ({
  className,
  theme,
}: {
  className?: string;
  theme: Theme;
}) => cx(getBaseCardStyles(theme), className);

export const getContentWrapperStyles = ({
  collapsedHeight,
  isOpen,
  theme,
}: {
  collapsedHeight: string;
  isOpen: boolean;
  theme: Theme;
}) =>
  cx(
    css`
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: ${spacing[300]}px;
      width: 100%;

      transition: max-height ${TRANSITION_DURATION}ms ease-in-out;
      max-height: ${collapsedHeight};

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: ${GRADIENT_HEIGHT}px;
        background: linear-gradient(
          180deg,
          ${transparentize(
              0.9,
              color[theme].background[Variant.Primary][
                InteractionState.Default
              ],
            )}
            0%,
          ${color[theme].background[Variant.Primary][InteractionState.Default]}
            100%
        );
        transition: opacity ${TRANSITION_DURATION}ms ease-in-out;
        opacity: 1;
        pointer-events: none;
      }
    `,
    {
      [css`
        max-height: 1000px;

        &::after {
          opacity: 0;
        }
      `]: isOpen,
    },
    contentWrapperClassName,
  );

export const getButtonStyles = ({
  theme,
  isOpen,
}: {
  theme: Theme;
  isOpen: boolean;
}) =>
  cx(
    css`
      height: ${BUTTON_HEIGHT}px;
      background: transparent;
      margin: 0 auto ${spacing[300]}px;
      border: none;
      box-shadow: none;
      padding: 0;
      color: ${color[theme].text.primary.default};
      font-size: ${BaseFontSize.Body1}px;
      font-weight: ${fontWeights.regular};
      text-transform: initial;

      &:hover {
        background: transparent;
        border: none;
        box-shadow: none;
      }

      &:focus-visible {
        background: transparent;
      }

      & svg[role='presentation'] {
        color: ${color[theme].icon.secondary.default};
        transition: transform ${TRANSITION_DURATION}ms ease-in-out;
        transform: rotate(0deg);
      }
    `,
    {
      [css`
        & svg[role='presentation'] {
          transform: rotate(180deg);
        }
      `]: isOpen,
    },
  );
