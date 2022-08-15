import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import { palette } from '@leafygreen-ui/palette';
import { Theme } from '@leafygreen-ui/lib';
import { BaseFontSize, fontFamilies } from '@leafygreen-ui/tokens';
import { css } from '@leafygreen-ui/emotion';
import { Variant } from './';

export const defaultBorderSpacing = 12;

export const baseBannerStyles = css`
  position: relative;
  display: flex;
  padding: 10px 12px 10px 20px;
  border-width: 1px 1px 1px 0px;
  border-style: solid;
  border-radius: 12px;
  font-family: ${fontFamilies.default};

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

export const iconStyles = css`
  position: relative;
  flex-shrink: 0;
`;

export const dismissibleIconStyles = css`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 8px; // Icon is 24px(it's 24px to include hover background), in figma its 16px(does not include the hover background) (24px - 16px)/2 = 4. The space between the icon and the banner is 12px from the right, 12px - 4px = 8px
  top: 8px;
  flex-shrink: 0;
  cursor: pointer;
`;

export const renderedImageStyles = css`
  // this margin is set to control text alignment with the base of the renderedImage
  margin-top: 3px;
  margin-bottom: 3px;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
`;

export type StyledElements = 'body' | 'dismissButton';

export const bannerVariantStyles: Record<
  Theme,
  Record<Variant, Record<StyledElements, string>>
> = {
  [Theme.Dark]: {
    [Variant.Info]: {
      body: css`
        color: ${palette.blue.light2};
        border-color: ${palette.blue.dark2};
        border-left-color: ${palette.blue.light1};
        background-color: ${palette.blue.dark3};

        a {
          color: ${palette.blue.light3};

          &:hover {
            color: ${palette.blue.light2};
          }

          &:focus-visible {
            box-shadow: 0 0 0 5px ${palette.blue.dark3},
              0 0 0 7px ${palette.blue.light1};
          }
        }

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
        &:hover,
        &:focus-visible {
          color: ${palette.blue.light2};

          &:before {
            background-color: ${palette.blue.dark2};
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

        a {
          color: ${palette.yellow.light3};

          &:hover {
            color: ${palette.yellow.light2};
          }

          &:focus-visible {
            box-shadow: 0 0 0 5px ${palette.yellow.dark3},
              0 0 0 7px ${palette.blue.light1};
          }
        }

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
        &:hover,
        &:focus-visible {
          color: ${palette.yellow.light2};

          &:before {
            background-color: ${palette.yellow.dark2};
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

        a {
          color: ${palette.red.light3};

          &:hover {
            color: ${palette.red.light2};
          }

          &:focus-visible {
            box-shadow: 0 0 0 5px ${palette.red.dark3},
              0 0 0 7px ${palette.blue.light1};
          }
        }

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
        &:hover,
        &:focus-visible {
          color: ${palette.red.light2};

          &:before {
            background-color: ${palette.red.dark2};
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

        a {
          color: ${palette.green.light3};

          &:hover {
            color: ${palette.green.light2};
          }

          &:focus-visible {
            box-shadow: 0 0 0 5px ${palette.green.dark3},
              0 0 0 7px ${palette.blue.light1};
          }
        }

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
        &:hover,
        &:focus-visible {
          color: ${palette.green.light2};

          &:before {
            background-color: ${palette.green.dark2};
          }
        }
      `,
    },
  },
  [Theme.Light]: {
    [Variant.Info]: {
      body: css`
        color: ${palette.blue.dark2};
        border-color: ${palette.blue.light2};
        border-left-color: ${palette.blue.base};
        background-color: ${palette.blue.light3};

        a {
          color: ${palette.blue.dark3};

          &:hover {
            color: ${palette.blue.dark2};
          }

          &:focus-visible {
            box-shadow: 0 0 0 3px ${palette.blue.light3},
              0 0 0 5px ${palette.white}, 0 0 0 7px ${palette.blue.light1};
          }
        }

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
        &:hover,
        &:focus-visible {
          color: ${palette.blue.dark2};

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

        a {
          color: ${palette.yellow.dark3};

          &:hover {
            color: ${palette.yellow.dark2};
          }

          &:focus-visible {
            box-shadow: 0 0 0 3px ${palette.yellow.light3},
              0 0 0 5px ${palette.white}, 0 0 0 7px ${palette.blue.light1};
          }
        }

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
        &:hover,
        &:focus-visible {
          color: ${palette.yellow.dark2};

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

        a {
          color: ${palette.red.dark3};

          &:hover {
            color: ${palette.red.dark2};
          }

          &:focus-visible {
            box-shadow: 0 0 0 3px ${palette.red.light3},
              0 0 0 5px ${palette.white}, 0 0 0 7px ${palette.blue.light1};
          }
        }

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
        &:hover,
        &:focus-visible {
          color: ${palette.red.dark2};

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

        a {
          color: ${palette.green.dark3};

          &:hover {
            color: ${palette.green.dark2};
          }

          &:focus-visible {
            box-shadow: 0 0 0 3px ${palette.green.light3},
              0 0 0 5px ${palette.white}, 0 0 0 7px ${palette.blue.light1};
          }
        }

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
        &:hover,
        &:focus-visible {
          color: ${palette.green.dark2};

          &:before {
            background-color: ${palette.green.light2};
          }
        }
      `,
    },
  },
} as const;

export const map: Record<
  Theme,
  Record<Variant, { color: string; icon: React.ComponentType<any> }>
> = {
  [Theme.Dark]: {
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
  [Theme.Light]: {
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

export const getTextStyle = (image: boolean, dismissible: boolean) => {
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

    a {
      font-size: inherit;
      line-height: inherit;
      font-weight: 700;
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-thickness: 2px;
      border-radius: 2px;

      &:hover,
      &:focus,
      &:focus-visible {
        outline: none;
        span {
          &::after {
            display: none;
          }
        }
      }

      &:focus-visible {
        position: relative;
      }
    }
  `;
};

export const bannerIconPositionStyles: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    top: 2px; // 18px(figma height) - 16px(icon-height)
  `,
  [BaseFontSize.Body2]: css`
    top: 5.5px; // 21.5px(figma height) - 16px(icon height)
  `,
};
