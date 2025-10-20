import { SectionProps } from '../Section';

export interface Feature {
  /**
   * Required title text that renders in an AccordionButton
   */
  title: string;

  /**
   * Required description that renders in an AccordionPanel when feature index is selected
   */
  description: React.ReactNode;

  /**
   * Required element, typically an image or illustration that renders in a separate container adjacent to the Accordion content
   */
  media: React.ReactElement;

  /**
   * Optional callback that is fired when the feature is expanded
   */
  onExpand?: () => void;
}

export type FeatureOverviewProps = Omit<SectionProps, 'renderInCard'> & {
  /**
   * Required array of feature objects
   */
  features: Array<Feature>;
};
