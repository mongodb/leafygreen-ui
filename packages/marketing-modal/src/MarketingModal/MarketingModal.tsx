import React from 'react';
import PropTypes from 'prop-types';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Modal from '@leafygreen-ui/modal';
import { CloseIconColor } from '@leafygreen-ui/modal';
import { Body, Disclaimer, H3, Link } from '@leafygreen-ui/typography';

import { Graphic } from '../Graphic/Graphic';

import {
  baseModalStyle,
  buttonStyle,
  contentStyle,
  contentThemeStyle,
  disclaimerStyles,
  footerContentStyle,
  linkStyle,
  titleStyle,
  wrapperStyle,
} from './MarketingModal.styles';
import {
  BlobPosition,
  GraphicStyle,
  MarketingModalProps,
} from './MarketingModal.types';

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
  closeIconColor = CloseIconColor.Default,
  blobPosition = BlobPosition.TopLeft,
  showBlob = false,
  disclaimer,
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
      <Graphic
        theme={theme}
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
        <Body className={linkStyle}>
          <Link tabIndex={0} onClick={onLinkClick} hideExternalIcon>
            {linkText}
          </Link>
        </Body>
        {disclaimer && (
          <div className={disclaimerStyles}>
            <Disclaimer>{disclaimer}</Disclaimer>
          </div>
        )}
      </div>
    </Modal>
  );
};

MarketingModal.displayName = 'MarketingModal';

MarketingModal.propTypes = {
  title: PropTypes.element.isRequired,
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
