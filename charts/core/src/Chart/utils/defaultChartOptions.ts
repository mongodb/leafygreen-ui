import { Theme } from '@leafygreen-ui/lib';
import {
  //   borderRadius,
  spacing,
  //   fontFamilies,
  //   fontWeights,
  color,
  Variant,
  InteractionState,
} from '@leafygreen-ui/tokens';
import { colors } from '../colors';

/**
 * Returns default chart options that are shared by all charts.
 */
export const getDefaultOptions = (theme: Theme) => ({
  animation: false, // Disabled to optimize performance
  title: {
    show: false, // Title is rendered in custom header instead
  },
  color: colors[theme],
  /**
   * Though there's a Grid component that will render the grid lines, this allows the box
   * that contains the chart to to show with proper dimensions by default.
   */
  grid: {
    /**
     * Spacing added here instead of in CSS because the grid is rendered in a canvas.
     * Adding the spacing in the canvas assures that the labels and borders are not cutoff.
     */
    left: spacing[300],
    right: spacing[400],
    top: spacing[300],
    bottom: spacing[400],
    borderColor:
      color[theme].border[Variant.Secondary][InteractionState.Default],
    borderWidth: 1,
    containLabel: true,
  },
});

// /**
//  * Toolbox needs to be set to allow zooming. By default it adds buttons to the chart
//  * that we don't want to show. We hide the buttons by positioning them off the chart
//  * because there's no way to hide them out of the box.
//  */
// toolbox: {
//   orient: 'vertical',
//   itemSize: 13,
//   top: 15,
//   right: -6,

//   /**
//    * Specifically allows zooming and removes the default zoom and restore buttons by
//    * setting their icons to empty strings.
//    */
//   feature: {
//     dataZoom: {
//       icon: {
//         zoom: 'path://', // hack to remove zoom button
//         back: 'path://', // hack to remove restore button
//       },
//     },
//   },
// },

// /**
//  * Adds tooltip and custom styling.
//  */
// tooltip: {
//   trigger: 'axis',
//   backgroundColor:
//     color[theme].background[Variant.InversePrimary][InteractionState.Default],
//   borderRadius: borderRadius[150],
// },

/**
 * Default options that are shared by all series.
 */
// export const defaultSeriesOption = {
//   showSymbol: false,
//   symbol: 'circle',
//   clip: false,
//   emphasis: {
//     disabled: true,
//   },
// };
