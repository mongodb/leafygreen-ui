import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  Variant,
} from '@leafygreen-ui/tokens';

const TOOLTIP_WIDTH = 261;

export const getRootStylesText = (theme: Theme) => `
  width: ${TOOLTIP_WIDTH}px;
  overflow-y: auto;
  background: ${
    color[theme].background[Variant.InversePrimary][InteractionState.Default]
  };
  color: ${color[theme].text[Variant.InversePrimary][InteractionState.Default]};
  border-radius: ${borderRadius[150]}px;
  font-family: ${fontFamilies.default};
  font-size: 12px;
  line-height: 20px;
  font-weight: ${fontWeights.regular};
`;
