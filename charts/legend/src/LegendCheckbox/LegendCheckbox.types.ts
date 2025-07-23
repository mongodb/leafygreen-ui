import { SeriesName } from '@lg-charts/series-provider';

import { CheckboxProps } from '@leafygreen-ui/checkbox';
import { Either } from '@leafygreen-ui/lib';

type OmittedCheckboxProps = Omit<
  CheckboxProps,
  'animate' | 'baseFontSize' | 'bold' | 'description' | 'disabled'
>;

/**
 * OmittedCheckboxProps no longer considers the `Either` type defined in `Checkbox.types.ts`, so
 * it's repeated here to ensure that the `LegendCheckboxProps` type is compatible with the
 * `Checkbox` component.
 */
type BaseLegendCheckboxProps = Either<
  OmittedCheckboxProps,
  'label' | 'aria-label' | 'aria-labelledby'
>;

export type LegendCheckboxProps = BaseLegendCheckboxProps & {
  /**
   * The name of the series that the checkbox controls.
   */
  name?: SeriesName;
};
