import { Mode } from './types';
import { injectGlobal } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

interface Base16Palette {
  0: string; // Background
  1: string; // Borders / non-text graphical accents
  2: string; // Comments, Doctags, Formulas
  3: string; // Default Text
  4: string; // Highlights
  5: string; // Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
  6: string; // Classes, Markup Bold, Search Text Background
  7: string; // Strings, Inherited Class, Markup Code, Diff Inserted
  8: string; // Support, Regular Expressions, Escape Characters, Markup Quotes
  9: string; // Functions, Methods, Classes, Names, Sections, Literals
  10: string; // Keywords, Storage, Selector, Markup Italic, Diff Changed
}

export const variantColors: { readonly [K in Mode]: Base16Palette } = {
  [Mode.Light]: {
    0: uiColors.gray.light3,
    1: uiColors.gray.light2,
    2: uiColors.gray.dark1,
    3: uiColors.black,
    4: uiColors.white,
    5: '#D83713',
    6: '#956d00',
    7: '#12824D',
    8: '#007ab8',
    9: '#016ee9',
    10: '#CC3887',
  },

  [Mode.Dark]: {
    0: uiColors.black,
    1: uiColors.gray.dark3,
    2: '#919DA1',
    3: uiColors.gray.light3,
    4: uiColors.gray.dark2,
    5: '#FF6F44',
    6: '#EDB210',
    7: '#35DE7B',
    8: '#a5e3ff',
    9: '#2dc4ff',
    10: '#FF7DC3',
  },
};

const getStyles = (mode: Mode): string => `
  .lg-highlight-hljs-${mode} {
    
    .lg-highlight-keyword,
    .lg-highlight-class,
    .lg-highlight-function,
    .lg-highlight-selector-tag,
    .lg-highlight-selector-attr,
    .lg-highlight-selector-pseudo,
    .lg-highlight-selector-id,
    .lg-highlight-selector-class {
      color: ${variantColors[mode][10]};
    }
    
    .lg-highlight-title {
      color: ${variantColors[mode][9]};
    }

    .lg-highlight-quote,
    .lg-highlight-literal,
    .lg-highlight-section,
    .lg-highlight-name,
    .lg-highlight-number {
      color: ${variantColors[mode][8]};
    }

    .lg-highlight-string,
    .lg-highlight-addition {
      color: ${variantColors[mode][7]};
    }

    .lg-highlight-regexp,
    .lg-highlight-meta,
    .lg-highlight-meta-string {
      color: ${variantColors[mode][6]};
    }

    .lg-highlight-variable,
    .lg-highlight-deletion,
    .lg-highlight-symbol,
    .lg-highlight-bullet,
    .lg-highlight-subst,
    .lg-highlight-meta,
    .lg-highlight-link,
    .lg-highlight-attr,
    .lg-highlight-attribute,
    .lg-highlight-language,
    .lg-highlight-template-variable,
    .lg-highlight-type,
    .lg-highlight-params {
      color: ${variantColors[mode][5]}
    }

    .lg-highlight-doctag,
    .lg-highlight-formula {
      color: ${variantColors[mode][3]};
    }
  
    .lg-highlight-comment {
      color: ${variantColors[mode][2]};
      font-style: italic;
    }
  
    .lg-highlight-string {
      font-weight: 600;
    }
    
    .lg-highlight-emphasis {
      font-style: italic;
    }
  
    .lg-highlight-strong {
      font-weight: bold;
    }
  }
`;

export function injectGlobalStyles() {
  Object.values(Mode).forEach(mode => injectGlobal(getStyles(mode)));
}
