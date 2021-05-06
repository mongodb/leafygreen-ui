import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import { Link } from '@leafygreen-ui/typography';
import Modal from '@leafygreen-ui/modal';
import { uiColors } from '@leafygreen-ui/palette';

const Mode = {
  Dark: 'dark',
  Light: 'light',
};

type Mode = typeof Mode[keyof typeof Mode];

export const GraphicStyle = {
  Center: 'center',
  Fill: 'fill',
} as const;

type GraphicStyle = typeof GraphicStyle[keyof typeof GraphicStyle];

const titleStyle = css`
  font-size: 24px;
  font-weight: bold;
  line-height: 25px;
  margin-bottom: 10px;
`;

const titleColors = {
  [Mode.Light]: css`
    color: ${uiColors.gray.dark2};
  `,
  [Mode.Dark]: css`
    color: ${uiColors.white};
  `,
};

const baseModalStyle = css`
  width: 600px;
  padding: initial;
  overflow: auto;
`;

const baseGraphicContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const baseGraphicStyle = css`
  display: block;
`;

const centeredGraphicContainerStyle = css`
  padding-top: 20px;
  padding-bottom: 8px;
`;

const filledGraphicContainerStyle = css`
  padding-bottom: 24px;
`;

const filledGraphicStyle = css`
  width: 100%;
`;

const contentStyle = css`
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 24px;
  text-align: center;
  padding: 0 92px;
  padding-bottom: 24px;
`;

const contentColors = {
  [Mode.Light]: css`
    color: ${uiColors.gray.dark1};
  `,
  [Mode.Dark]: css`
    color: ${uiColors.white};
  `,
};

const footerContentStyle = css`
  line-height: 24px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface MarketingModalProps {
  title: string;
  graphic: React.ReactElement;
  graphicStyle?: GraphicStyle;
  children: React.ReactNode;
  open?: boolean;
  onButtonClick?: () => void;
  onLinkClick?: () => void;
  onClose?: () => void;
  className?: string;
  buttonText: string;
  linkText: string;
  darkMode?: boolean;
}

const MarketingModal = ({
  children,
  title,
  graphic,
  graphicStyle = 'center',
  onButtonClick,
  onLinkClick,
  onClose,
  buttonText,
  linkText,
  darkMode,
  ...modalProps
}: MarketingModalProps) => {
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <Modal
      {...modalProps}
      contentClassName={baseModalStyle}
      setOpen={onClose}
      darkMode={darkMode}
    >
      <div
        className={cx(baseGraphicContainerStyle, {
          [centeredGraphicContainerStyle]: graphicStyle === GraphicStyle.Center,
          [filledGraphicContainerStyle]: graphicStyle === GraphicStyle.Fill,
        })}
      >
        {React.cloneElement(graphic, {
          className: `${graphic.props.className ?? ''} ${cx(baseGraphicStyle, {
            [filledGraphicStyle]: graphicStyle === GraphicStyle.Fill,
          })}`,
        })}
      </div>
      <div className={cx(contentStyle, contentColors[mode])}>
        <div className={cx(titleStyle, titleColors[mode])}>{title}</div>
        {children}
      </div>
      <div className={footerContentStyle}>
        <Button variant="primary" onClick={onButtonClick} darkMode={darkMode}>
          {buttonText}
        </Button>
        <Link
          tabIndex={0}
          onClick={onLinkClick}
          hideExternalIcon
          className={cx(
            css`
              margin-top: 24px;
            `,
            {
              [css`
                color: #41c6ff;
              `]: darkMode,
            },
          )}
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
};

export default MarketingModal;
