import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import { Link } from '@leafygreen-ui/typography';
import Modal from '@leafygreen-ui/modal';
import { uiColors } from '@leafygreen-ui/palette';

const titleStyle = css`
  color: ${uiColors.gray.dark2};
  font-size: 24px;
  font-weight: bold;
  line-height: 25px;

  margin-bottom: 10px;
`;

const baseModalStyle = css`
  width: 600px;
  padding: initial;
  overflow: scroll;
`;

const baseCoverStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    display: block;
  }
`;

const defaultCoverStyle = css`
  padding-top: 20px;
  padding-bottom: 8px;
`;

const coverCoverStyle = css`
  padding-bottom: 24px;

  & > * {
    width: 100%;
  }
`;

const contentStyle = css`
  color: ${uiColors.gray.dark1};
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 24px;
  text-align: center;

  padding: 0 92px;
  padding-bottom: 24px;
`;

const footerContentStyle = css`
  line-height: 24px;
  padding-bottom: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > * {
    padding: 4px;
  }
`;

interface MarketingModalProps {
  title: string;
  cover: JSX.IntrinsicElements['img'];
  coverStyle?: 'default' | 'cover';
  children: React.ReactNode;
  open?: boolean;
  onClose?: (confirmed: boolean) => void;
  className?: string;
  buttonText: string;
  linkText: string;
}

const MarketingModal = ({
  children,
  title,
  cover,
  coverStyle = 'default',
  onClose,
  buttonText,
  linkText,
  ...modalProps
}: MarketingModalProps) => {
  return (
    <Modal
      {...modalProps}
      contentClassName={baseModalStyle}
      setOpen={() => onClose?.(false)}
    >
      <div
        className={cx(baseCoverStyle, {
          [defaultCoverStyle]: coverStyle === 'default',
          [coverCoverStyle]: coverStyle === 'cover',
        })}
      >
        {cover}
      </div>
      <div className={contentStyle}>
        <div className={titleStyle}>{title}</div>
        {children}
      </div>
      <div className={footerContentStyle}>
        <Button variant="primary" onClick={() => onClose?.(true)}>
          {buttonText}
        </Button>
        <Link tabIndex={0} onClick={() => onClose?.(false)} hideExternalIcon>
          {linkText}
        </Link>
      </div>
    </Modal>
  );
};

MarketingModal.displayName = 'MarketingModal';

MarketingModal.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.element.isRequired,
  coverStyle: PropTypes.oneOf(['default', 'cover']),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default MarketingModal;
