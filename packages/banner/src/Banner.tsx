import React from 'react';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import XIcon from '@leafygreen-ui/icon/dist/X';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

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
  padding: 9px 12px 9px 20px;
  border-width: 1px 1px 1px 0px;
  border-style: solid;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;

  &:before {
    content: '';
    position: absolute;
    width: 6px;
    top: -1px;
    bottom: -1px;
    left: 0px;
    border-radius: 6px 0px 0px 6px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 4px;
    top: -1px;
    bottom: -1px;
    width: 2px;
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-radius: 0.5px 0px 0px 0.5px;
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

const bannerVariantStyles: Record<Variant, string> = {
  [Variant.Info]: css`
    color: ${uiColors.blue.dark2};
    border-color: ${uiColors.blue.light2};
    border-left-color: ${uiColors.blue.base};
    background-color: ${uiColors.blue.light3};

    &:before {
      background-color: ${uiColors.blue.base};
    }

    &:after {
      border-color: ${uiColors.blue.light2};
      background-color: ${uiColors.blue.light3};
    }
  `,

  [Variant.Warning]: css`
    color: ${uiColors.yellow.dark2};
    border-color: ${uiColors.yellow.light2};
    border-left-color: ${uiColors.yellow.base};
    background-color: ${uiColors.yellow.light3};

    &:before {
      background-color: ${uiColors.yellow.base};
    }

    &:after {
      border-color: ${uiColors.yellow.light2};
      background-color: ${uiColors.yellow.light3};
    }
  `,

  [Variant.Danger]: css`
    color: ${uiColors.red.dark2};
    border-color: ${uiColors.red.light2};
    border-left-color: ${uiColors.red.base};
    background-color: ${uiColors.red.light3};

    &:before {
      background-color: ${uiColors.red.base};
    }

    &:after {
      border-color: ${uiColors.red.light2};
      background-color: ${uiColors.red.light3};
    }
  `,

  [Variant.Success]: css`
    color: ${uiColors.green.dark2};
    border-color: ${uiColors.green.light2};
    border-left-color: ${uiColors.green.base};
    background-color: ${uiColors.green.light3};

    &:before {
      background-color: ${uiColors.green.base};
    }

    &:after {
      border-color: ${uiColors.green.light2};
      background-color: ${uiColors.green.light3};
    }
  `,
} as const;

const map = {
  [Variant.Info]: { color: uiColors.blue.base, icon: InfoWithCircleIcon },
  [Variant.Warning]: {
    color: uiColors.yellow.dark2,
    icon: ImportantWithCircleIcon,
  },
  [Variant.Danger]: { color: uiColors.red.base, icon: WarningIcon },
  [Variant.Success]: {
    color: uiColors.green.base,
    icon: CheckmarkWithCircleIcon,
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
    styleObj.marginLeft = '15px';
    styleObj.marginRight = '4px';
    if (dismissible) {
      styleObj.marginRight = `${defaultIconSize + defaultBorderSpacing}px`;
    }
  } else {
    styleObj.marginLeft = `${15}px`;
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

export interface BannerProps extends React.ComponentPropsWithoutRef<'div'> {
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
}

/**
 * # Banner
 *
 * Banner component
 *
 * ```
<Banner>Banner content goes here.</Banner>
```
 * @param props.variant Sets the variant for the Banner.
 * @param props.image Illustration that will replace default Icon when the prop is supplied.
 * @param props.dismissible Determines whether or not the Banner is dismissible.
 * @param props.onClose Callback fired when dismiss button is clicked.
 */
export default function Banner({
  variant = Variant.Info,
  dismissible = false,
  onClose = () => {},
  image,
  children,
  className,
  ...rest
}: BannerProps) {
  const { icon: Icon, color } = map[variant];

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
          margin-top: 1px;
        `,
      )}
    />
  );

  return (
    <div
      role="alert"
      className={cx(baseBannerStyles, bannerVariantStyles[variant], className)}
      {...rest}
    >
      {renderIcon}
      <div className={getTextStyle(image != null, dismissible)}>{children}</div>
      {dismissible && (
        <XIcon
          fill={color}
          onClick={onClose}
          className={cx(flexShrink, cursorPointer)}
        />
      )}
    </div>
  );
}
