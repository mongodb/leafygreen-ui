import React from 'react';
// import Icon from '@leafygreen-ui/icon';
import EditIcon from '@leafygreen-ui/icon/dist/Edit';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
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
  flex-grow: 1;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 12px;
  border-top: 1px;
  border-right: 1px;
  border-bottom: 1px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 16px;

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

const flexShrinkSettings = css`
  flex-shrink: 0;
`;

const cursorPointer = css`
  cursor: pointer;
`;

const textStyle = css`
  margin-left: 16px;
  margin-right: 10px;
  flex-grow: 1;
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
  [Variant.Info]: { color: uiColors.blue.base, icon: EditIcon },
  [Variant.Warning]: { color: uiColors.yellow.dark2, icon: InfoWithCircleIcon },
  [Variant.Danger]: { color: uiColors.red.base, icon: WarningIcon },
  [Variant.Success]: { color: uiColors.green.base, icon: CheckmarkIcon },
};

const getDefaultIcon = (variant: Variant) => {
  const Icon = map[variant].icon;

  return <Icon fill={map[variant].color} className={flexShrinkSettings} />;
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
  const renderIcon = image ?? getDefaultIcon(variant);

  return (
    <div
      role="alert"
      className={cx(baseBannerStyles, bannerVariantStyles[variant], className)}
      {...rest}
    >
      {renderIcon}
      <span className={textStyle}>{children}</span>
      {dismissible && (
        <XIcon
          fill={map[variant].color}
          onClick={onClose}
          className={cx(flexShrinkSettings, cursorPointer)}
        />
      )}
    </div>
  );
}
