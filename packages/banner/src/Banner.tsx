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

const baseBannerStyles = css`
  position: relative;
  display: flex;
  min-height: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 12px;
  border-width: 1px 1px 1px 0px;
  border-style: solid;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;

  &:before {
    content: '';
    position: absolute;
    width: 4px;
    top: 0;
    bottom: 0;
    left: 0px;
    border-radius: 6px 0px 0px 6px;
  }
`;

const alignItemsCenter = css`
  align-items: center;
`;

const leftIconStyles = css`
  flex-shrink: 0;
  position: absolute;
  top: 12px;
  left: 20px;
`;

const rightIconStyles = css`
  position: absolute;
  top: 12px;
  right: 12px;
  flex-shrink: 0;
  cursor: pointer;
`;

const renderedImageStyles = css`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
`;

const bannerVariantStyles: Record<Variant, string> = {
  [Variant.Info]: css`
    color: ${uiColors.blue.dark2};
    border-color: ${uiColors.blue.light2};
    background-color: ${uiColors.blue.light3};

    &:before {
      background-color: ${uiColors.blue.base};
    }
  `,

  [Variant.Warning]: css`
    color: ${uiColors.yellow.dark2};
    border-color: ${uiColors.yellow.light2};
    background-color: ${uiColors.yellow.light3};

    &:before {
      background-color: ${uiColors.yellow.base};
    }
  `,
  [Variant.Danger]: css`
    color: ${uiColors.red.dark2};
    border-color: ${uiColors.red.light2};
    background-color: ${uiColors.red.light3};

    &:before {
      background-color: ${uiColors.red.base};
    }
  `,

  [Variant.Success]: css`
    color: ${uiColors.green.dark2};
    border-color: ${uiColors.green.light2};
    background-color: ${uiColors.green.light3};

    &:before {
      background-color: ${uiColors.green.base};
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

const getDefaultIcon = (variant: Variant) => {
  const Icon = map[variant].icon;

  return <Icon fill={map[variant].color} className={leftIconStyles} />;
};

const getTextStyle = (image: boolean, dismissible: boolean) => {
  const styleObj: {
    marginLeft: string | undefined;
    marginRight: string | undefined;
  } = {
    marginLeft: undefined,
    marginRight: undefined,
  };

  if (image) {
    styleObj.marginLeft = '10px';

    if (dismissible) {
      styleObj.marginRight = '10px';
    }
  } else {
    styleObj.marginLeft = '28px';

    if (dismissible) {
      styleObj.marginRight = '20px';
    } else {
      styleObj.marginRight = '10px';
    }
  }

  return css`
    flex-grow: 1;
    margin-left: ${styleObj.marginLeft};
    margin-right: ${styleObj.marginRight};
  `;
};

interface BannerProps extends React.ComponentPropsWithoutRef<'div'> {
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
  const withImage = image ? true : false;
  const renderedImage =
    image &&
    React.cloneElement(image, {
      className: renderedImageStyles,
    });

  const renderIcon = withImage ? renderedImage : getDefaultIcon(variant);

  return (
    <div
      role="alert"
      className={cx(
        baseBannerStyles,
        bannerVariantStyles[variant],
        { [alignItemsCenter]: withImage },
        className,
      )}
      {...rest}
    >
      {renderIcon}
      <span className={getTextStyle(withImage, dismissible)}>{children}</span>
      {dismissible && (
        <XIcon
          fill={map[variant].color}
          onClick={onClose}
          className={rightIconStyles}
        />
      )}
    </div>
  );
}
