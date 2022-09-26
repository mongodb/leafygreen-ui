import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import { Link } from '@leafygreen-ui/typography';
import Modal, { ModalProps } from '@leafygreen-ui/modal';
import { uiColors, palette } from '@leafygreen-ui/palette';
import { CloseIconColor } from '@leafygreen-ui/modal';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { svgBlobs } from '.';

const Mode = {
  Dark: 'dark',
  Light: 'light',
};

type Mode = typeof Mode[keyof typeof Mode];

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

const titleStyle = css`
  font-size: 24px;
  color: ${palette.black};
  font-weight: 700;
  line-height: 32px;
  margin-bottom: 4px;
`;

const baseModalStyle = css`
  width: 600px;
  padding: initial;
  overflow: hidden;
`;

const baseGraphicContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const baseGraphicStyle = css`
  display: block;
`;

const centeredGraphicContainerStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    padding-top: 48px;
    padding-bottom: 24px;
  `,
  [Mode.Dark]: css`
    padding-top: 20px;
    padding-bottom: 8px;
  `,
};

const filledGraphicContainerStyle = css`
  padding-bottom: 24px;
  position: relative;
`;

const filledGraphicStyle = css`
  width: 100%;
`;

const contentStyle = css`
  font-family: ${fontFamilies.default};
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0;
  text-align: center;
  padding: 0 20px 32px;
  max-width: 476px;
  margin: 0 auto;
  color: ${palette.gray.dark3};
`;

const renderCurvedSVG = () => {
  const curvedSVGStyles = css`
    position: absolute;
    left: 0;
    bottom: 24px;
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
        fill="#ffffff"
      />
    </svg>
  );
};

const footerContentStyle = css`
  line-height: 24px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
  darkMode,
  closeIconColor = CloseIconColor.Dark,
  blobPosition = BlobPosition.TopLeft,
  showBlob = false,
  ...modalProps
}: MarketingModalProps) => {
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <Modal
      {...modalProps}
      contentClassName={baseModalStyle}
      setOpen={onClose}
      darkMode={darkMode}
      closeIconColor={closeIconColor}
    >
      {!darkMode &&
        showBlob &&
        graphicStyle === GraphicStyle.Center &&
        svgBlobs(blobPosition)}
      <div
        className={cx(baseGraphicContainerStyle, {
          [centeredGraphicContainerStyle[mode]]:
            graphicStyle === GraphicStyle.Center,
          [filledGraphicContainerStyle]: graphicStyle === GraphicStyle.Fill,
        })}
      >
        {React.cloneElement(graphic, {
          className: `${graphic.props.className ?? ''} ${cx(baseGraphicStyle, {
            [filledGraphicStyle]: graphicStyle === GraphicStyle.Fill,
          })}`,
        })}
        {!darkMode && graphicStyle === GraphicStyle.Fill && renderCurvedSVG()}
      </div>
      <div
        className={cx(contentStyle, {
          [css`
            // TODO: Refresh – remove when darkMode is updated
            font-family: ${fontFamilies.legacy};
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0;
            text-align: center;
            padding: 0 92px;
            padding-bottom: 24px;
            color: ${uiColors.gray.light2};
            max-width: inherit;
          `]: darkMode,
        })}
      >
        <div
          className={cx(titleStyle, {
            [css`
              // TODO: Refresh – remove when darkMode is updated
              color: ${uiColors.white};
              font-weight: bold;
              line-height: 25px;
              margin-bottom: 10px;
            `]: darkMode,
          })}
        >
          {title}
        </div>
        {children}
      </div>
      <div className={footerContentStyle}>
        <Button
          variant="baseGreen"
          onClick={onButtonClick}
          darkMode={darkMode}
          className={cx({
            [css`
              min-width: 200px;
            `]: !darkMode,
          })}
        >
          {buttonText}
        </Button>
        <Link
          tabIndex={0}
          onClick={onLinkClick}
          hideExternalIcon
          className={cx({
            [css`
              margin-top: 16px;
            `]: !darkMode,
            [css`
              color: #41c6ff;
              margin-top: 24px;
            `]: darkMode,
          })}
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
