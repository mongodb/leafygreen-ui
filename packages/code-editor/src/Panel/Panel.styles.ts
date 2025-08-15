import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  InteractionState,
  Variant,
} from '@leafygreen-ui/tokens';

export const getPanelStyles = (theme: Theme) => {
  return css`
    background-color: ${color[theme].background[Variant.Secondary][
      InteractionState.Default
    ]};
    height: 36px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px 0 10px;
    border: 1px solid
      ${color[theme].border[Variant.Secondary][InteractionState.Default]};
    border-bottom: none;
    border-top-left-radius: ${borderRadius[300]}px;
    border-top-right-radius: ${borderRadius[300]}px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'title children buttons';
  `;
};

export const getPanelTitleStyles = (theme: Theme, baseFontSize: number) => {
  return css`
    grid-area: title;
    font-size: ${baseFontSize}px;
    color: ${color[theme].text[Variant.Secondary][InteractionState.Default]};
  `;
};

export const getPanelInnerContentStyles = () => {
  return css`
    grid-area: children;
  `;
};

export const getPanelButtonsStyles = () => {
  return css`
    grid-area: buttons;
  `;
};
