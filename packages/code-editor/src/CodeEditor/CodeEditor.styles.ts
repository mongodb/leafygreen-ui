import { css, cx } from '@leafygreen-ui/emotion';
import {
  createUniqueClassName,
  getMobileMediaQuery,
  Theme,
} from '@leafygreen-ui/lib';
import {
  addOverflowShadow,
  borderRadius,
  breakpoints,
  color,
  InteractionState,
  Side,
  spacing,
  transitionDuration,
  Variant,
} from '@leafygreen-ui/tokens';

import {
  LINE_HEIGHT,
  PADDING_BOTTOM,
  PADDING_TOP,
} from './hooks/extensions/useThemeExtension';
import {
  CodeEditorProps,
  CodeEditorSelectors,
  CopyButtonAppearance,
} from './CodeEditor.types';

export const copyButtonClassName = createUniqueClassName(
  'lg-code_editor-code_editor_copy_button',
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
  theme,
  hasTopShadow = false,
  hasBottomShadow = false,
}: {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  className?: string;
  copyButtonAppearance?: CopyButtonAppearance;
  theme: Theme;
  hasTopShadow?: boolean;
  hasBottomShadow?: boolean;
}) => {
  return cx(
    {
      // Dimensions
      [css`
        height: ${height};
        ${CodeEditorSelectors.Editor}, ${CodeEditorSelectors.Content}, ${CodeEditorSelectors.Gutters} {
          height: ${height};
        }
      `]: !!height,
      [css`
        max-height: ${maxHeight};
        ${CodeEditorSelectors.Editor} {
          max-height: ${maxHeight};
        }
      `]: !!maxHeight,
      [css`
        min-height: ${minHeight};
        ${CodeEditorSelectors.Editor} {
          min-height: ${minHeight};
        }
      `]: !!minHeight,
      [css`
        width: ${width};
        ${CodeEditorSelectors.Editor} {
          width: ${width};
        }
      `]: !!width,
      [css`
        max-width: ${maxWidth};
        ${CodeEditorSelectors.Editor} {
          max-width: ${maxWidth};
        }
      `]: !!maxWidth,

      [css`
        min-width: ${minWidth};
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

      // Overflow Shadows
      [css`
        ${CodeEditorSelectors.Editor} {
          ${addOverflowShadow({
            side: Side.Top,
            theme,
            isInside: true,
          })}
        }
      `]: hasTopShadow,
      [css`
        ${CodeEditorSelectors.Editor} {
          ${addOverflowShadow({
            side: Side.Bottom,
            theme,
            isInside: true,
          })}
        }
      `]: hasBottomShadow,
    },
    className,
  );
};

function getHeight(
  numOfLines: number,
  baseFontSize: CodeEditorProps['baseFontSize'],
) {
  const borders = 2;
  const fontSize = baseFontSize ? baseFontSize : 13;
  const numOfLinesForCalculation = numOfLines === 0 ? 1 : numOfLines;

  return (
    numOfLinesForCalculation * (fontSize * LINE_HEIGHT) +
    PADDING_TOP +
    PADDING_BOTTOM +
    borders
  );
}

export const getLoaderStyles = ({
  theme,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  baseFontSize,
  numOfLines,
  isLoading,
}: {
  theme: Theme;
  baseFontSize: CodeEditorProps['baseFontSize'];
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  numOfLines: number;
  isLoading: boolean;
}) => {
  const fontSize = baseFontSize ? baseFontSize : 13;
  const defaultHeight = getHeight(numOfLines, fontSize);

  let heightValue = height;

  if (!heightValue) {
    if (isLoading) {
      heightValue = `${defaultHeight}px`;
    } else {
      heightValue = '100%';
    }
  }

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
    height: ${heightValue};
    max-height: ${maxHeight || 'none'};
    min-height: ${minHeight || 'none'};
    z-index: 1;
  `;
};

export const getLoadingTextStyles = (theme: Theme) => {
  return css`
    color: ${color[theme].text[Variant.Secondary][InteractionState.Default]};
    display: flex;
    align-items: center;
    gap: ${spacing[50]}px;
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
