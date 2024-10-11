import { Theme } from '@leafygreen-ui/lib';
import { color, Variant, InteractionState } from '@leafygreen-ui/tokens';

export const getDefaultGridConfig = ({
  horizontal,
  vertical,
  theme,
}: {
  horizontal?: boolean;
  vertical?: boolean;
  theme: Theme;
}) => ({
  yAxis: {
    splitLine: {
      show: !!horizontal,
      lineStyle: {
        color: color[theme].border[Variant.Secondary][InteractionState.Default],
        width: 1,
      },
    },
  },
  xAxis: {
    splitLine: {
      show: !!vertical,
      lineStyle: {
        color: color[theme].border[Variant.Secondary][InteractionState.Default],
        width: 1,
      },
    },
  },
});
