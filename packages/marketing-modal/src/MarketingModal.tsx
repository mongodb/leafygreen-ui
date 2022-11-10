import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import { Link } from '@leafygreen-ui/typography';
import Modal, { ModalProps } from '@leafygreen-ui/modal';
import { CloseIconColor } from '@leafygreen-ui/modal';
import { svgBlobs } from '.';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { baseModalStyle, baseGraphicContainerStyle, buttonStyle, centeredGraphicContainerStyle, filledGraphicContainerStyle, baseGraphicStyle, filledGraphicStyle, contentStyle, contentThemeStyle, titleStyle, footerContentStyle, linkStyle } from './MarketingModal.styles';
import { palette } from '@leafygreen-ui/palette';

export const BlobPosition = {
  TopLeft: 'top left',
  TopRight: 'top right',
  BottomRight: 'bottom right',
} as const;

export type BlobPosition = typeof BlobPosition[keyof typeof BlobPosition];

export const GraphicStyle = {
  Center: 'center',
  Fill: 'fill',
} as const;

type GraphicStyle = typeof GraphicStyle[keyof typeof GraphicStyle];

export const renderCurvedSVG = (darkMode: boolean) => {
  const curvedSVGStyles = css`
    position: absolute;
    left: 0;
    bottom: 24px;
    color: ${darkMode ? palette.black : '#ffffff'}
  `;

  return (
    <svg
      className={cx(curvedSVGStyles)}
      viewBox="0 0 600 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M329.065 48C439.779 45.2633 537.038 27.0233 600 3.86855e-06V49H0V0C62.9624 27.0233 160.221 45.2633 270.935 48H329.065Z"
        fill='currentColor'
      />
    </svg>
  );
};

interface MarketingModalProps extends ModalProps {
  /**
   * Text of header element
   */
  title: string;
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
  children: React.ReactNode;
  /**
   * 	The component is shown when the value is set to `true`.
   */
  open?: boolean;
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

  darkMode?: boolean;
  /**
   * 	Color of the close icon button
   */
  closeIconColor?: CloseIconColor;
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
}

const MarketingModal = ({
  children,
  title,
  graphic,
  graphicStyle = GraphicStyle.Center,
  onButtonClick,
  onLinkClick,
  onClose,
  buttonText,
  linkText,
  darkMode: darkModeProp,
  closeIconColor = CloseIconColor.Default,
  blobPosition = BlobPosition.TopLeft,
  showBlob = false,
  ...modalProps
}: MarketingModalProps) => {
  const { theme, darkMode } = useDarkMode(darkModeProp);

  return (
    <Modal
      {...modalProps}
      contentClassName={baseModalStyle}
      setOpen={onClose}
      darkMode={darkMode}
      closeIconColor={closeIconColor}
    >
      {
        showBlob &&
        graphicStyle === GraphicStyle.Center &&
        svgBlobs(blobPosition, darkMode)}
      <div
        className={cx(baseGraphicContainerStyle, {
          [centeredGraphicContainerStyle[theme]]:
            graphicStyle === GraphicStyle.Center,
          [filledGraphicContainerStyle]: graphicStyle === GraphicStyle.Fill,
        })}
      >
        {React.cloneElement(graphic, {
          className: `${graphic.props.className ?? ''} ${cx(baseGraphicStyle, {
            [filledGraphicStyle]: graphicStyle === GraphicStyle.Fill,
          })}`,
        })}
        {graphicStyle === GraphicStyle.Fill && renderCurvedSVG(darkMode)}
      </div>
      <div
        className={cx(contentStyle, contentThemeStyle[theme])}
      >
        <div
          className={titleStyle}
        >
          {title}
        </div>
        {children}
      </div>
      <div className={footerContentStyle}>
        <Button
          variant="baseGreen"
          onClick={onButtonClick}
          className={buttonStyle}
        >
          {buttonText}
        </Button>
        <Link
          tabIndex={0}
          onClick={onLinkClick}
          hideExternalIcon
          className={linkStyle}
        >
          {linkText}
        </Link>
      </div>
    </Modal>
  );
};

MarketingModal.displayName = 'MarketingModal';

MarketingModal.propTypes = {
  title: PropTypes.string.isRequired,
  graphic: PropTypes.element.isRequired,
  graphicStyle: PropTypes.oneOf(Object.values(GraphicStyle)),
  open: PropTypes.bool,
  onButtonClick: PropTypes.func,
  onLinkClick: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  blobPosition: PropTypes.oneOf(Object.values(BlobPosition)),
  showBlob: PropTypes.bool,
  darkMode: PropTypes.bool,
};

export default MarketingModal;
