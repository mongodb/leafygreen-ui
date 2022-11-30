import { BlobPosition } from '../MarketingModal/types';

export interface BlobSVGProps {
  darkMode: boolean;
  blobPosition: BlobPosition;
}

export type BlobSVGProperties = 'viewBox' | 'path' | 'styles';
