import { Theme } from '@leafygreen-ui/lib';

import {
  BlobPosition,
  GraphicStyle,
} from '../MarketingModal/MarketingModal.types';

export interface GraphicProps {
  graphic: React.ReactElement;
  graphicStyle: GraphicStyle;
  showBlob: boolean;
  blobPosition: BlobPosition;
  theme: Theme;
}
