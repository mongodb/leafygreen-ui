import { ReactNode } from 'react';

import { ModalProps } from '@leafygreen-ui/modal';

export const BlobPosition = {
  TopLeft: 'top left',
  TopRight: 'top right',
  BottomRight: 'bottom right',
} as const;

export type BlobPosition = (typeof BlobPosition)[keyof typeof BlobPosition];

export const GraphicStyle = {
  Center: 'center',
  Fill: 'fill',
} as const;

export type GraphicStyle = (typeof GraphicStyle)[keyof typeof GraphicStyle];

export interface MarketingModalProps
  extends Omit<ModalProps, 'size' | 'title'> {
  /**
   * Text of header element
   */
  title: ReactNode;

  /**
   * React Element to be rendered as the modal's hero image
   */
  graphic: React.ReactElement;

  /**
   * Determines the rendering style of the graphic.
   *
   * `fill` adds a curving effect to the bottom border of the graphic.
   */
  graphicStyle?: GraphicStyle;

  /**
   * 	Callback fired when the primary action button is clicked.
   */
  onButtonClick?: () => void;

  /**
   * 	Callback fired when the secondary link element is clicked.
   */
  onLinkClick?: () => void;

  /**
   * 	Callback fired when the modal is closed
   */
  onClose?: () => void;

  /**
   * 	Text of the primary CTA button
   */
  buttonText: string;

  /**
   * 	Text of the secondary link element
   */
  linkText: string;

  /**
   * 	Position of the blob visual effect. Defaults to top-left.
   *
   *  Note: The blob is only rendered if: `showBlob` prop is `true`, and the `graphicStyle` prop is `center`.
   *
   */
  blobPosition?: BlobPosition;

  /**
   * 	Determines whether the blob should be rendered.
   */
  showBlob?: boolean;

  /**
   * Disclaimer text to be rendered under the primary action button
   */
  disclaimer?: React.ReactElement;
}
