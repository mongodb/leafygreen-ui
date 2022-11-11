import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import { H3, Link } from '@leafygreen-ui/typography';
import Modal from '@leafygreen-ui/modal';
import { CloseIconColor } from '@leafygreen-ui/modal';
import { svgBlobs } from '.';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  baseModalStyle,
  baseGraphicContainerStyle,
  buttonStyle,
  centeredGraphicContainerStyle,
  filledGraphicContainerStyle,
  baseGraphicStyle,
  filledGraphicStyle,
  contentStyle,
  contentThemeStyle,
  titleStyle,
  footerContentStyle,
  linkStyle,
  wrapperStyle,
} from './MarketingModal.styles';
import { palette } from '@leafygreen-ui/palette';
import {
  BlobPosition,
  GraphicStyle,
  MarketingModalProps,
} from './MarketingModal.types';

export const renderCurvedSVG = (darkMode: boolean) => {
  const curvedSVGStyles = css`
    position: absolute;
    left: 0;
    bottom: 24px;
    color: ${darkMode ? palette.black : '#ffffff'};
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
        fill="currentColor"
      />
    </svg>
  );
};

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
      {showBlob &&
        graphicStyle === GraphicStyle.Center &&
        svgBlobs(blobPosition, darkMode)}
      <div
        className={cx(baseGraphicContainerStyle, {
          [centeredGraphicContainerStyle]:
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
      <div className={wrapperStyle}>
        <H3 className={titleStyle} as="h1">
          {title}
        </H3>
        <div className={cx(contentStyle, contentThemeStyle[theme])}>
          {children}
        </div>
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
