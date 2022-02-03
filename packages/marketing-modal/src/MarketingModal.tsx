import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import { Link } from '@leafygreen-ui/typography';
import Modal from '@leafygreen-ui/modal';
import { uiColors, palette } from '@leafygreen-ui/palette';
import { CloseIconColor } from '@leafygreen-ui/modal';

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
`;

const titleColors: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};
    font-weight: 700;
    line-height: 32px;
    margin-bottom: 4px;
  `,
  [Mode.Dark]: css`
    color: ${uiColors.white};
    font-weight: bold;
    line-height: 25px;
    margin-bottom: 10px;
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
  position: relative;
`;

const filledGraphicStyle = css`
  width: 100%;
`;

const contentStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    font-family: Euclid Circular A, ‘Helvetica Neue’, Helvetica, Arial,
      sans-serif; // TODO: Refresh – remove when fonts are updated
    font-size: 13px;
    line-height: 20px;
    letter-spacing: 0;
    text-align: center;
    padding: 0 20px 32px;
    max-width: 476px;
    margin: 0 auto;
  `,
  [Mode.Dark]: css`
    font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;
    text-align: center;
    padding: 0 92px;
    padding-bottom: 24px;
  `,
};

const contentColors: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.gray.dark3};
  `,
  [Mode.Dark]: css`
    color: ${uiColors.gray.light2};
  `,
};

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
  closeIconColor?: CloseIconColor;
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
        {!darkMode && graphicStyle === GraphicStyle.Fill && renderCurvedSVG()}
      </div>
      <div className={cx(contentStyle[mode], contentColors[mode])}>
        <div className={cx(titleStyle, titleColors[mode])}>{title}</div>
        {children}
      </div>
      <div className={footerContentStyle}>
        {/* TODO: Refresh - switch to new green variant */}
        <Button variant="primary" onClick={onButtonClick} darkMode={darkMode}>
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
};

export default MarketingModal;
