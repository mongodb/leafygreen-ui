import React from 'react';

import Button from '@leafygreen-ui/button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Modal from '@leafygreen-ui/modal';
import { CloseIconColor } from '@leafygreen-ui/modal';
import { Body, Disclaimer, H3, Link } from '@leafygreen-ui/typography';

import { Graphic } from '../Graphic/Graphic';

import {
  baseModalStyle,
  disclaimerStyles,
  footerContentStyle,
  getButtonStyles,
  getContentStyles,
  linkStyle,
  titleStyle,
  wrapperStyle,
} from './MarketingModal.styles';
import {
  BlobPosition,
  GraphicStyle,
  MarketingModalProps,
} from './MarketingModal.types';

/**
 * Modals can be used to display a simple task, to confirm actions, prompt users to input information, or display additional information.
 */
const MarketingModal = ({
  children,
  title,
  graphic,
  onButtonClick,
  onLinkClick,
  onClose,
  buttonText,
  buttonProps = {},
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

  // TODO: remove - onButtonClick is deprecated
  const _onButtonClick = buttonProps?.onClick || onButtonClick;
  // TODO: remove - buttonText is deprecated
  const _buttonText = buttonProps?.children || buttonText;

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
        <div className={getContentStyles(theme)}>{children}</div>
      </div>
      <div className={footerContentStyle}>
        <Button
          {...buttonProps}
          variant="baseGreen"
          className={getButtonStyles(buttonProps?.className)}
          onClick={_onButtonClick}
        >
          {/* TODO: remove - buttonText is deprecated */}
          {_buttonText}
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

export default MarketingModal;
