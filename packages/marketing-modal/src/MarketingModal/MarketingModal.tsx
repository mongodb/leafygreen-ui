import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import { H3, Link } from '@leafygreen-ui/typography';
import Modal from '@leafygreen-ui/modal';
import { CloseIconColor } from '@leafygreen-ui/modal';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  baseModalStyle,
  buttonStyle,
  contentStyle,
  contentThemeStyle,
  titleStyle,
  footerContentStyle,
  linkStyle,
  wrapperStyle,
} from './styles';
import { BlobPosition, GraphicStyle, MarketingModalProps } from './types';
import Graphics from '../Graphics/graphics';

const MarketingModal = ({
  children,
  title,
  graphic,
  onButtonClick,
  onLinkClick,
  onClose,
  buttonText,
  linkText,
  darkMode: darkModeProp,
  graphicStyle = GraphicStyle.Center,
  closeIconColor = CloseIconColor.Dark,
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
      <Graphics
        darkMode={darkMode}
        graphic={graphic}
        graphicStyle={graphicStyle}
        showBlob={showBlob}
        blobPosition={blobPosition}
      />

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
