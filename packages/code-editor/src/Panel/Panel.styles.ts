import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

const PANEL_HEIGHT = 36;

export const getPanelStyles = (theme: Theme) => {
  return css`
    background-color: ${color[theme].background[Variant.Secondary][
      InteractionState.Default
    ]};
    height: ${PANEL_HEIGHT}px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 ${spacing[400]}px 0 ${spacing[300]}px;
    border: 1px solid
      ${color[theme].border[Variant.Secondary][InteractionState.Default]};
    border-bottom: none;
    border-top-left-radius: ${borderRadius[300]}px;
    border-top-right-radius: ${borderRadius[300]}px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'title inner-content buttons';
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
    grid-area: inner-content;
  `;
};

export const getPanelButtonsStyles = () => {
  return css`
    grid-area: buttons;
  `;
};
