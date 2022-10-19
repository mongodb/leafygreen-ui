import { css, cx } from "@leafygreen-ui/emotion";
import { Theme } from "@leafygreen-ui/lib";
import { palette } from "@leafygreen-ui/palette";
import { fontFamilies } from "@leafygreen-ui/tokens";
import { transparentize } from "polished";
import { Size } from "./types";

/**
 * Styles
 */
 export const wrapperStyle = css`
 display: flex;
 gap: 8px;
 align-items: center;
 z-index: 0;
 font-family: ${fontFamilies.default};
`;

export const labelStyle: Record<Theme, string> = {
 [Theme.Light]: css`
   letter-spacing: 1.4px;
   color: ${palette.gray.dark1};
 `,
 [Theme.Dark]: css`
   color: ${palette.gray.light1};
 `,
};

export const optionsWrapperStyleSize: Record<Size, string> = {
 [Size.Small]: css`
   --segment-gap: 1px; // space between segments
   --wrapper-padding: 0px;
   --outer-radius: 6px;
   --indicator-radius: 6px;
   --indicator-height: 100%;
 `,
 [Size.Default]: css`
   --segment-gap: 5px; // space between segments
  //  --wrapper-padding: 3px;
  //  --outer-radius: 8px;
  //  --indicator-radius: 6px;
   --indicator-height: calc(100% - 2 * var(--wrapper-padding));
 `,
 [Size.Large]: css`
   --segment-gap: 5px; // space between segments
   --indicator-height: calc(100% - 2 * var(--wrapper-padding));

  //  --outer-radius: 9px;
  //   --wrapper-padding: 3px;
  //   --indicator-radius: 6px;
 `,
};

export const optionsWrapperStyleMode: Record<Theme, string> = {
 [Theme.Light]: css`
   
   --background-color: ${palette.gray.light3};
   --border-color: rgba(255, 255, 255, 0);
   --border-width: 0px;
   --inner-shadow: 0px 1px 2px ${transparentize(0.7, palette.black)} inset;
   --outer-shadow: 0px 1px 1px ${palette.gray.light2};
   // Hover indicator
   --hover-background-color: ${palette.white};
   // Selection indicator
   --indicator-background-color: ${palette.black};
   --indicator-border-color: ${palette.black};
 `,
 [Theme.Dark]: css`
   --background-color: ${palette.gray.dark4};
  //  --border-color: ${palette.gray.dark1};
   --border-color: rgba(255, 255, 255, 0);
   --border-width: 1px;
   --inner-shadow: 0px 0px 0px 1px ${palette.gray.dark1} inset;
   --outer-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0);
   --hover-background-color: ${palette.gray.dark3};
   --indicator-background-color: ${palette.gray.light2};
   --indicator-border-color: ${palette.gray.light2};
 `,
};

export const optionsWrapperStyleSizeDarkModeOverrides: Record<Size, string> = {
 [Size.Small]: css`
   --segment-gap: 1px;
   --wrapper-padding: 0px;
   --outer-radius: 4px;
   --indicator-radius: 4px;
   --indicator-height: 100%;
 `,
 [Size.Default]: css`
   --segment-gap: 5px;
   --wrapper-padding: 3px;
   --outer-radius: 6px;
   --indicator-radius: 6px;
   --indicator-height: calc(100% - 2 * var(--wrapper-padding));
 `,
 [Size.Large]: css`
   --segment-gap: 5px;
   --wrapper-padding: 1px;
   --outer-radius: 6px;
   --indicator-radius: 4px;
   --indicator-height: calc(100% - 2 * var(--wrapper-padding));
 `,
};

export const optionWrapperStyleModeSize: Record<Theme, Record<Size, string>> = {
  [Theme.Light]: {
    [Size.Default]: css`
    --wrapper-padding: 3px;
    --outer-radius: 8px;
   --indicator-radius: 6px;
    `,
    [Size.Small]: css``,
    [Size.Large]: css`
    --outer-radius: 9px;
    --wrapper-padding: 3px;
    --indicator-radius: 6px;
    `,
  },
  [Theme.Dark]: {
    [Size.Default]: css`
    --wrapper-padding: 2px;
    --outer-radius: 6px;
   --indicator-radius: 4px;
    `,
    [Size.Small]: css`
    --outer-radius: 4px;
    --indicator-radius: 6px;
    `,
    [Size.Large]: css`
    --wrapper-padding: 2px;
    --outer-radius: 6px;
    --indicator-radius: 4px;
    `,
  }
}

export const optionsWrapperStyle = ({
 theme,
 size = 'default',
}: {
 theme: Theme;
 size: Size;
}) =>
 cx(
   optionsWrapperStyleSize[size],
   optionsWrapperStyleMode[theme],
   optionWrapperStyleModeSize[theme][size],
   css`
     position: relative;
     display: grid;
     grid-auto-flow: column;
     grid-auto-columns: 1fr;
     gap: var(--segment-gap);
     align-items: center;
     padding: var(--wrapper-padding);
     border: var(--border-width) solid var(--border-color);
     border-radius: var(--outer-radius);
    //  --indicator-radius: 6px;
     background-color: var(--background-color);

     &:focus {
       outline: none;
     }

     // Frame shadow
     &:after {
       content: '';
       position: absolute;
       width: 100%;
       height: 100%;
       border-radius: inherit;
       box-shadow: var(--inner-shadow), var(--outer-shadow);
       z-index: 1;
       pointer-events: none;
     }
   `,
 );

export const selectionIndicatorStyle = css`
 position: absolute;
 width: 100%;
 height: var(--indicator-height);
 z-index: 2;
 border-radius: var(--indicator-radius);
 background-color: var(--indicator-background-color);
 transition: transform 150ms ease-in-out;
`;

export const hoverIndicatorStyle = css`
 position: absolute;
 height: var(--indicator-height);
 width: 100%;
 border-radius: var(--indicator-radius);
 background-color: var(--hover-background-color);
 z-index: 0;
 opacity: 0;
 transition: opacity 100ms ease-in-out;
`;