import { css, cx } from '@leafygreen-ui/emotion';
import {
  createUniqueClassName,
  getMobileMediaQuery,
  Theme,
} from '@leafygreen-ui/lib';
import {
  borderRadius,
  breakpoints,
  color,
  InteractionState,
  spacing,
  transitionDuration,
  Variant,
} from '@leafygreen-ui/tokens';

import { CodeEditorSelectors, CopyButtonAppearance } from './CodeEditor.types';

export const copyButtonClassName = createUniqueClassName(
  'code_editor_copy_button',
);

export const getEditorStyles = ({
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  className,
  copyButtonAppearance,
}: {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  className?: string;
  copyButtonAppearance?: CopyButtonAppearance;
}) =>
  cx(
    {
      [css`
        ${CodeEditorSelectors.Editor} {
          height: ${height};
        }
      `]: !!height,
      [css`
        ${CodeEditorSelectors.Editor} {
          max-height: ${maxHeight};
        }
      `]: !!maxHeight,
      [css`
        ${CodeEditorSelectors.Editor} {
          min-height: ${minHeight};
        }
      `]: !!minHeight,
      [css`
        ${CodeEditorSelectors.Editor} {
          width: ${width};
        }
      `]: !!width,
      [css`
        ${CodeEditorSelectors.Editor} {
          max-width: ${maxWidth};
        }
      `]: !!maxWidth,

      [css`
        ${CodeEditorSelectors.Editor} {
          min-width: ${minWidth};
        }
      `]: !!minWidth,
      [css`
        @media (hover: hover) {
          &:hover .${copyButtonClassName} {
            opacity: 1;
          }
        }
      `]: copyButtonAppearance === CopyButtonAppearance.Hover,
    },
    css`
      position: relative;
    `,
    className,
  );

export const getLoaderStyles = ({
  theme,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
}: {
  theme: Theme;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}) => {
  return css`
    background-color: ${color[theme].background[Variant.Primary][
      InteractionState.Default
    ]};
    border: 1px solid
      ${color[theme].border[Variant.Secondary][InteractionState.Default]};
    border-radius: ${borderRadius[300]}px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: ${width || '100%'};
    max-width: ${maxWidth || 'none'};
    min-width: ${minWidth || 'none'};
    height: ${height || '100%'};
    max-height: ${maxHeight || 'none'};
    /**
     * The editor being rendered depends on a lazy loaded module, so it has no 
     * height until it loads. By default, its height expands to fit its 
     * content, therefore we won't know its actual height until it loads.
     * To ensure the loader is visible, we need to set an arbitrary min height.
     */
    min-height: ${minHeight || '234px'};
    z-index: 1;
  `;
};

export const getLoadingTextStyles = (theme: Theme) => {
  return css`
    color: ${color[theme].text[Variant.Secondary][InteractionState.Default]};
  `;
};

export const getCopyButtonStyles = (
  copyButtonAppearance: CopyButtonAppearance,
) =>
  cx(
    copyButtonClassName,
    css`
      position: absolute;
      opacity: 1;
      top: ${spacing[200]}px;
      right: ${spacing[200]}px;
      transition: opacity ${transitionDuration.default}ms ease-in-out;
      z-index: 1;

      // On hover or focus, the copy button should always be visible
      &:hover,
      &:focus-within {
        opacity: 1;
      }
    `,
    {
      [css`
        opacity: 0;

        // On a mobile device, the copy button should always be visible
        ${getMobileMediaQuery(breakpoints.Desktop)} {
          opacity: 1;
        }
      `]: copyButtonAppearance === CopyButtonAppearance.Hover,
    },
  );
