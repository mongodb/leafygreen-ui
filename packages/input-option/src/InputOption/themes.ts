import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

const State = {
  Default: 'default',
  Hover: 'hover',
  Focus: 'focus',
  Disabled: 'disabled',
  Checked: 'checked',
  Destructive: 'destructive',
} as const;

type State = (typeof State)[keyof typeof State];

export { State };

export type FormState = Exclude<State, 'destructive' | 'overrides'>;

type FormShape = Record<Theme, { [k in FormState]: Record<string, string> }>;

type MenuShape = Record<Theme, { [k in State]: Record<string, string> }>;

export const formThemeStyles: FormShape = {
  [Theme.Light]: {
    default: {
      title: palette.black,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      backgroundColor: palette.white,
    },
    hover: {
      leftGlyph: palette.gray.dark3,
      backgroundColor: palette.gray.light2,
    },
    focus: {
      title: palette.blue.dark2,
      description: palette.gray.dark1,
      leftGlyph: palette.blue.dark1,
      backgroundColor: palette.blue.light3,
      wedge: palette.blue.base,
    },
    disabled: {
      title: palette.gray.light1,
      description: palette.gray.light1,
      leftGlyph: palette.gray.light1,
      backgroundColor: palette.white,
    },
    checked: {
      title: palette.black,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      backgroundColor: palette.white,
    },
  },
  [Theme.Dark]: {
    default: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.gray.base,
      backgroundColor: palette.gray.dark3,
    },

    hover: {
      leftGlyph: palette.gray.base,
      backgroundColor: palette.gray.dark4,
    },

    focus: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.blue.light3,
      backgroundColor: palette.blue.dark3,
      wedge: palette.blue.light1,
    },

    disabled: {
      title: palette.gray.dark1,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      backgroundColor: palette.gray.dark3,
    },

    checked: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.gray.base,
      backgroundColor: palette.gray.dark3,
    },
  },
};

export const menuThemeStyles: MenuShape = {
  [Theme.Light]: {
    default: {
      title: palette.white,
      description: palette.gray.light1,
      leftGlyph: palette.gray.dark1,
      backgroundColor: palette.black,
    },
    hover: {
      leftGlyph: palette.gray.base,
      backgroundColor: palette.gray.dark3,
    },
    focus: {
      title: palette.blue.light3,
      description: palette.gray.light3,
      leftGlyph: palette.blue.light3,
      backgroundColor: palette.blue.dark3,
      wedge: palette.blue.light1,
    },
    disabled: {
      title: palette.gray.dark2,
      description: palette.gray.dark2,
      leftGlyph: palette.gray.dark2,
      backgroundColor: palette.black,
    },
    checked: {
      title: palette.green.base,
      description: palette.gray.light1,
      leftGlyph: palette.green.base,
      backgroundColor: palette.black,
      wedge: palette.green.base,
    },
    destructive: {
      title: palette.red.light1,
      description: palette.gray.light1,
      leftGlyph: palette.red.light1,
      backgroundColor: palette.black,
    },
  },
  [Theme.Dark]: {
    default: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.gray.light1,
      backgroundColor: palette.gray.dark3,
    },
    hover: {
      leftGlyph: palette.gray.light1,
      backgroundColor: palette.gray.dark2,
    },
    focus: {
      title: palette.blue.light3,
      description: palette.blue.light3,
      leftGlyph: palette.blue.light3,
      backgroundColor: palette.blue.dark3,
      wedge: palette.blue.light1,
    },
    disabled: {
      title: palette.gray.dark1,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      backgroundColor: palette.gray.dark3,
    },
    checked: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.green.base,
      backgroundColor: palette.gray.dark3,
      wedge: palette.green.base,
    },
    destructive: {
      title: palette.red.light1,
      description: palette.gray.light1,
      leftGlyph: palette.red.light1,
      backgroundColor: palette.gray.dark3,
    },
  },
};

// posterity
// Default
// titleColor: palette.black,
// descriptionColor: palette.gray.dark1,
// leftGlyph: palette.gray.dark1,
// backgroundColor: palette.white,

// // Hover
// hoverBackgroundColor: palette.gray.light2,
// hoverLeftGlyph: palette.gray.dark3,

// // Focus State - Nothing changes on hover on focus state
// focusTitleColor: palette.blue.dark2,
// focusDescription: palette.gray.dark1,
// focusLeftGlyph: palette.blue.dark1,
// focusBackgroundColor: palette.blue.light3,
// focusWedge: palette.blue.base,

// // Disabled
// disabledTitleColor: palette.gray.light1,
// disabledDescriptionColor: palette.gray.light1,
// disabledLeftGlyph: palette.gray.light1,
// disabledBackgroundColor: palette.white,

// // Checked
// checkedTitleColor: palette.black,
// checkedDescriptionColor: palette.gray.dark1,
// checkedLeftGlyph: palette.gray.dark1,
// // checkedRightGlyph: palette.blue.base,
// checkedBackgroundColor: palette.white,
// Default
// titleColor: palette.gray.light2,
// descriptionColor: palette.gray.light1,
// leftGlyph: palette.gray.base,
// backgroundColor: palette.gray.dark3,

// // Hover
// hoverBackgroundColor: palette.gray.dark4,
// hoverLeftGlyph: palette.gray.base,

// // Focus State - Nothing changes on hover on focus state
// focusTitleColor: palette.gray.light2,
// focusDescription: palette.gray.light1,
// focusLeftGlyph: palette.blue.light3,
// focusBackgroundColor: palette.blue.dark3,
// focusWedge: palette.blue.light1,

// // Disabled
// disabledTitleColor: palette.gray.dark1,
// disabledDescriptionColor: palette.gray.dark1,
// disabledLeftGlyph: palette.gray.dark1,
// disabledBackgroundColor: palette.gray.dark3,

// // Checked
// checkedTitleColor: palette.gray.light2,
// checkedDescriptionColor: palette.gray.light1,
// checkedLeftGlyph: palette.gray.base,
// // checkedRightGlyph: palette.blue.light1,
// checkedBackgroundColor: palette.gray.dark3,

// const XXX = {
//   [Theme.Light]: {
//     // Default
//     titleColor: palette.white,
//     descriptionColor: palette.gray.light1,
//     leftGlyph: palette.gray.dark1,
//     backgroundColor: palette.black,

//     // Hover
//     hoverBackgroundColor: palette.gray.dark3,
//     hoverLeftGlyph: palette.gray.base,

//     // Focus State - Nothing changes on hover on focus state
//     focusTitleColor: palette.blue.light3,
//     focusDescription: palette.gray.light3,
//     focusLeftGlyph: palette.blue.light3,
//     focusBackgroundColor: palette.blue.dark3,
//     focusWedge: palette.blue.light1,

//     // Disabled
//     disabledTitleColor: palette.gray.dark2,
//     disabledDescriptionColor: palette.gray.dark2,
//     disabledLeftGlyph: palette.gray.dark2,
//     disabledBackgroundColor: palette.black,

//     // Checked
//     checkedTitleColor: palette.green.base,
//     checkedDescriptionColor: palette.gray.light1,
//     checkedLeftGlyph: palette.green.base,
//     checkedBackgroundColor: palette.black,
//     checkedWedgeColor: palette.green.base,

//     // Checked & Hovered
//     checkedHoveredBackgroundColor: palette.gray.dark3,

//     // Destructive
//     destructiveTitleColor: palette.red.light1,
//     destructiveDescriptionColor: palette.gray.light1,
//     destructiveLeftGlyph: palette.red.light1,
//     destructiveBackgroundColor: palette.black,

//     // Destructive & Hovered
//     destructiveHoveredBackgroundColor: palette.gray.dark3,
//   },
//   [Theme.Dark]: {
//     // Default
//     titleColor: palette.gray.light2,
//     descriptionColor: palette.gray.light1,
//     leftGlyph: palette.gray.light1,
//     backgroundColor: palette.gray.dark3,

//     // Hover
//     hoverBackgroundColor: palette.gray.dark2,
//     hoverLeftGlyph: palette.gray.light1,

//     // Focus State - Nothing changes on hover on focus state
//     focusTitleColor: palette.blue.light3,
//     focusDescription: palette.blue.light3,
//     focusLeftGlyph: palette.blue.light3,
//     focusBackgroundColor: palette.blue.dark3,
//     focusWedge: palette.blue.light1,

//     // Disabled
//     disabledTitleColor: palette.gray.dark1,
//     disabledDescriptionColor: palette.gray.dark1,
//     disabledLeftGlyph: palette.gray.dark1,
//     disabledBackgroundColor: palette.gray.dark3,

//     // Checked
//     checkedTitleColor: palette.gray.light2,
//     checkedDescriptionColor: palette.gray.light1,
//     checkedLeftGlyph: palette.green.base,
//     checkedBackgroundColor: palette.gray.dark3,
//     checkedWedgeColor: palette.green.base,

//     // Checked & Hovered
//     checkedHoveredTitleColor: palette.white,
//     checkedHoveredBackgroundColor: palette.gray.dark2,

//     // Destructive
//     destructiveTitleColor: palette.red.light1,
//     destructiveDescriptionColor: palette.gray.light1,
//     destructiveLeftGlyph: palette.red.light1,
//     destructiveBackgroundColor: palette.gray.dark3,

//     // Destructive & Hovered
//     destructiveHoveredTitleColor: palette.red.light2,
//     destructiveHoveredBackgroundColor: palette.gray.dark2,
//   },
// };
