import { ImageInfoBlockProps } from '../InfoBlock';
import { SectionProps } from '../Section';

export type Template = Omit<ImageInfoBlockProps, 'variant'>;

export type TemplatesProps = Omit<SectionProps, 'renderInCard'> & {
  /**
   * Required title text
   */
  title: string;

  /**
   * Required array of template objects
   */
  templates: Array<Template>;
};
