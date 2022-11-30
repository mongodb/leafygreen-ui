import { BlobPosition, GraphicStyle } from '../MarketingModal/types';

export interface GraphicProps {
  darkMode: boolean;
  graphic: React.ReactElement;
  graphicStyle: GraphicStyle;
  showBlob: boolean;
  blobPosition: BlobPosition;
}
