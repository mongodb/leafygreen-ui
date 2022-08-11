import React from 'react';
import PropTypes from 'prop-types';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import XIcon from '@leafygreen-ui/icon/dist/X';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { HTMLElementProps, Theme } from '@leafygreen-ui/lib';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { fontFamilies, typeScales } from '@leafygreen-ui/tokens';

const Variant = {
  Info: 'info',
  Warning: 'warning',
  Danger: 'danger',
  Success: 'success',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

const defaultBorderSpacing = 12;

const baseBannerStyles = css`
  position: relative;
  display: flex;
  min-height: 40px;
  padding: 10px 12px 10px 20px;
  border-width: 1px 1px 1px 0px;
  border-style: solid;
  border-radius: 12px;
  font-family: ${fontFamilies.default};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;

  &:before {
    content: '';
    position: absolute;
    width: 13px;
    top: -1px;
    bottom: -1px;
    left: 0px;
    border-radius: 12px 0px 0px 12px;
  }
`;

const flexShrink = css`
  flex-shrink: 0;
`;

const cursorPointer = css`
  cursor: pointer;
`;

const renderedImageStyles = css`
  // this margin is set to control text alignment with the base of the renderedImage
  margin-top: 3px;
  margin-bottom: 3px;

  width: 32px;
  height: 32px;
  flex-shrink: 0;
`;

type StyledElements = 'body' | 'dismissButton';

const bannerVariantStyles: Record<Theme, Record<Variant, Record<StyledElements, string>>> = {
  [Theme.Dark] : {
    [Variant.Info]: {
      body: css`
        color: ${palette.blue.light2};
        border-color: ${palette.blue.dark2};
        border-left-color: ${palette.blue.light1};
        background-color: ${palette.blue.dark3};
  
        &:before {
          background: linear-gradient(
            to left,
            transparent 6px,
            ${palette.blue.light1} 6px
          );
        }
      `,
      dismissButton: css`
        color: ${palette.blue.light2};
  
        &:active,
        &:hover {
          color: ${palette.blue.dark2};
  
          &:before {
            background-color: ${palette.blue.light2};
          }
        }
  
        &:focus {
          &:before {
            background-color: ${palette.blue.light2};
          }
        }
      `,
    },
    [Variant.Warning]: {
      body: css`
        color: ${palette.yellow.light2};
        border-color: ${palette.yellow.dark2};
        border-left-color: ${palette.yellow.dark2};
        background-color: ${palette.yellow.dark3};
  
        &:before {
          background: linear-gradient(
            to left,
            transparent 6px,
            ${palette.yellow.dark2} 6px
          );
        }
      `,
      dismissButton: css`
        color: ${palette.yellow.light2};
  
        &:active,
        &:hover {
          color: ${palette.yellow.dark2};
  
          &:before {
            background-color: ${palette.yellow.light2};
          }
        }
  
        &:focus {
          &:before {
            background-color: ${palette.yellow.light2};
          }
        }
      `,
    },
    [Variant.Danger]: {
      body: css`
        color: ${palette.red.light2};
        border-color: ${palette.red.dark2};
        border-left-color: ${palette.red.base};
        background-color: ${palette.red.dark3};
  
        &:before {
          background: linear-gradient(
            to left,
            transparent 6px,
            ${palette.red.base} 6px
          );
        }
      `,
      dismissButton: css`
        color: ${palette.red.light2};
  
        &:active,
        &:hover {
          color: ${palette.red.dark2};
  
          &:before {
            background-color: ${palette.red.light2};
          }
        }
  
        &:focus {
          &:before {
            background-color: ${palette.red.light2};
          }
        }
      `,
    },
    [Variant.Success]: {
      body: css`
        color: ${palette.green.light2};
        border-color: ${palette.green.dark2};
        border-left-color: ${palette.green.base};
        background-color: ${palette.green.dark3};
  
        &:before {
          background: linear-gradient(
            to left,
            transparent 6px,
            ${palette.green.base} 6px
          );
        }
      `,
      dismissButton: css`
        color: ${palette.green.light2};
  
        &:active,
        &:hover {
          color: ${palette.green.dark2};
  
          &:before {
            background-color: ${palette.green.light2};
          }
        }
  
        &:focus {
          &:before {
            background-color: ${palette.green.light2};
          }
        }
      `,
    },
  },
  [Theme.Light] : {
    [Variant.Info]: {
      body: css`
        color: ${palette.blue.dark2};
        border-color: ${palette.blue.light2};
        border-left-color: ${palette.blue.base};
        background-color: ${palette.blue.light3};
  
        &:before {
          background: linear-gradient(
            to left,
            transparent 6px,
            ${palette.blue.base} 6px
          );
        }
      `,
      dismissButton: css`
        color: ${palette.blue.dark2};
  
        &:active,
        &:hover {
          color: ${palette.blue.dark2};
  
          &:before {
            background-color: ${palette.blue.light2};
          }
        }
  
        &:focus {
          &:before {
            background-color: ${palette.blue.light2};
          }
        }
      `,
    },
    [Variant.Warning]: {
      body: css`
        color: ${palette.yellow.dark2};
        border-color: ${palette.yellow.light2};
        border-left-color: ${palette.yellow.base};
        background-color: ${palette.yellow.light3};
  
        &:before {
          background: linear-gradient(
            to left,
            transparent 6px,
            ${palette.yellow.base} 6px
          );
        }
      `,
      dismissButton: css`
        color: ${palette.yellow.dark2};
  
        &:active,
        &:hover {
          color: ${palette.yellow.dark2};
  
          &:before {
            background-color: ${palette.yellow.light2};
          }
        }
  
        &:focus {
          &:before {
            background-color: ${palette.yellow.light2};
          }
        }
      `,
    },
    [Variant.Danger]: {
      body: css`
        color: ${palette.red.dark2};
        border-color: ${palette.red.light2};
        border-left-color: ${palette.red.base};
        background-color: ${palette.red.light3};
  
        &:before {
          background: linear-gradient(
            to left,
            transparent 6px,
            ${palette.red.base} 6px
          );
        }
      `,
      dismissButton: css`
        color: ${palette.red.dark2};
  
        &:active,
        &:hover {
          color: ${palette.red.dark2};
  
          &:before {
            background-color: ${palette.red.light2};
          }
        }
  
        &:focus {
          &:before {
            background-color: ${palette.red.light2};
          }
        }
      `,
    },
    [Variant.Success]: {
      body: css`
        color: ${palette.green.dark2};
        border-color: ${palette.green.light2};
        border-left-color: ${palette.green.base};
        background-color: ${palette.green.light3};
  
        &:before {
          background: linear-gradient(
            to left,
            transparent 6px,
            ${palette.green.dark1} 6px
          );
        }
      `,
      dismissButton: css`
        color: ${palette.green.dark2};
  
        &:active,
        &:hover {
          color: ${palette.green.dark2};
  
          &:before {
            background-color: ${palette.green.light2};
          }
        }
  
        &:focus {
          &:before {
            background-color: ${palette.green.light2};
          }
        }
      `,
    },
  }
} as const;

const map: Record<Theme, Record<Variant, {color: string, icon: React.ComponentType<any>}>> = {
  [Theme.Dark] : {
    [Variant.Info]: { color: palette.blue.light1, icon: InfoWithCircleIcon },
    [Variant.Warning]: {
      color: palette.yellow.base,
      icon: ImportantWithCircleIcon,
    },
    [Variant.Danger]: { color: palette.red.light1, icon: WarningIcon },
    [Variant.Success]: {
      color: palette.green.base,
      icon: CheckmarkWithCircleIcon,
    },
  },
  [Theme.Light] : {
    [Variant.Info]: { color: palette.blue.base, icon: InfoWithCircleIcon },
    [Variant.Warning]: {
      color: palette.yellow.dark2,
      icon: ImportantWithCircleIcon,
    },
    [Variant.Danger]: { color: palette.red.base, icon: WarningIcon },
    [Variant.Success]: {
      color: palette.green.dark1,
      icon: CheckmarkWithCircleIcon,
    },
  },
};

const getTextStyle = (image: boolean, dismissible: boolean) => {
  const defaultIconSize = 16;

  const styleObj: {
    marginLeft?: string;
    marginRight?: string;
  } = {
    marginLeft: undefined,
    marginRight: undefined,
  };

  if (image) {
    styleObj.marginLeft = '17px';
    styleObj.marginRight = '4px';
    if (dismissible) {
      styleObj.marginRight = `${defaultIconSize + defaultBorderSpacing}px`;
    }
  } else {
    styleObj.marginLeft = `13px`;
    styleObj.marginRight = '10px';
    if (dismissible) {
      styleObj.marginRight = `${defaultIconSize + 16}px`;
    }
  }

  return css`
    align-self: center;
    flex-grow: 1;
    margin-left: ${styleObj.marginLeft};
    margin-right: ${styleObj.marginRight};
  `;
};

interface BannerProps extends HTMLElementProps<'div', never> {
  /**
   * Sets the variant for the Banner
   *
   * Default: `'info'`
   */
  variant?: Variant;

  /**
   * Illustration that will replace default Icon when the prop is supplied
   */
  image?: React.ReactElement;

  /**
   * Determines whether or not the Banner is dismissible
   *
   * Default: `false`
   */
  dismissible?: boolean;

  /**
   * Callback fired when dismiss button is clicked
   *
   * Default: `() => {}`
   */
  onClose?: React.MouseEventHandler;

  /**
   * Determines whether or not the component will be rendered in dark mode.
   *
   * default: `false`
   */
   darkMode?: boolean;
}

/**
 *
 * Banners remain until dismissed by the user, or if the state, which caused the banner is resolved. They are usually contextual to the product or task. For guidelines on when to use Banners, refer to our [design guidelines](https://www.mongodb.design/component/banner/guidelines/).
 *
 * @param props.variant Sets the variant for the Banner.
 * @param props.image Illustration that will replace default Icon when the prop is supplied.
 * @param props.dismissible Determines whether or not the Banner is dismissible.
 * @param props.onClose Callback fired when dismiss button is clicked.
 * @param props.darkMode Determines whether or not the component will be rendered in dark mode.
 */
export default function Banner({
  variant = Variant.Info,
  dismissible = false,
  onClose = () => {},
  image,
  children,
  className,
  darkMode: darkModeProp,
  ...rest
}: BannerProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const { icon: Icon, color } = map[theme][variant];

  const renderIcon = image ? (
    React.cloneElement(image, {
      className: renderedImageStyles,
    })
  ) : (
    <Icon
      fill={color}
      className={cx(
        flexShrink,
        css`
          margin-top: 3px;
        `,
      )}
    />
  );

  return (
    <div
      role="alert"
      className={cx(
        baseBannerStyles,
        bannerVariantStyles[theme][variant].body,
        className,
      )}
      {...rest}
    >
      {renderIcon}
      <div className={getTextStyle(image != null, dismissible)}>{children}</div>
      {dismissible && (
        <IconButton
          className={cx(
            flexShrink,
            cursorPointer,
            css`
              margin-top: -3px;
              left: 8px;
            `,
            bannerVariantStyles[theme][variant].dismissButton,
          )}
          aria-label="Close Message"
          onClick={onClose}
          darkMode={darkMode}
        >
          <XIcon />
        </IconButton>
      )}
    </div>
  );
}

Banner.displayName = 'Banner';

Banner.propTypes = {
  darkMode: PropTypes.bool,
  variant: PropTypes.oneOf(Object.values(Variant)),
  onClose: PropTypes.func,
  dismissable: PropTypes.bool,
  image: PropTypes.element
};