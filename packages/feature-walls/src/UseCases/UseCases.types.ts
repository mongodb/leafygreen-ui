import { IconInfoBlockProps } from '../InfoBlock';
import { SectionProps } from '../Section';

export type UseCase = Omit<IconInfoBlockProps, 'variant'>;

export type UseCasesProps = Omit<SectionProps, 'renderInCard'> & {
  /**
   * Determines the maximum number of columns the grid should allow
   * @default 3
   */
  maxColumns?: 2 | 3 | 4;

  /**
   * Required array of use case objects
   */
  cases: Array<UseCase>;
};
