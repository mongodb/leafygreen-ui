import { injectGlobal } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontWeights } from '@leafygreen-ui/tokens';

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

export const variantColors: { readonly [K in Theme]: Base16Palette } = {
  [Theme.Light]: {
    0: palette.gray.light3,
    1: palette.gray.light2,
    2: palette.gray.dark2,
    3: palette.black,
    4: palette.white,
    5: '#D83713',
    6: '#956d00',
    7: '#12824D',
    8: '#007ab8',
    9: '#016ee9',
    10: '#CC3887',
  },

  [Theme.Dark]: {
    0: palette.black,
    1: palette.gray.dark2,
    2: palette.gray.light1,
    3: palette.gray.light3,
    4: palette.gray.dark2,
    5: '#FF6F44',
    6: '#EDB210',
    7: '#35DE7B',
    8: '#a5e3ff',
    9: '#2dc4ff',
    10: '#FF7DC3',
  },
};

const getStyles = (theme: Theme): string => `
  .lg-highlight-hljs-${theme} {
    
    .lg-highlight-keyword,
    .lg-highlight-keyword.lg-highlight-function,
    .lg-highlight-keyword.lg-highlight-class,
    .lg-highlight-selector-tag,
    .lg-highlight-selector-attr,
    .lg-highlight-selector-pseudo,
    .lg-highlight-selector-id,
    .lg-highlight-selector-class {
      color: ${variantColors[theme][10]};
    }

    .lg-highlight-regexp,
    .lg-highlight-number,
    .lg-highlight-literal,
    .lg-highlight-function.lg-highlight-title {
      color: ${variantColors[theme][9]};
    }

    .lg-highlight-quote,
    .lg-highlight-section,
    .lg-highlight-name {
      color: ${variantColors[theme][8]};
    }

    .lg-highlight-string,
    .lg-highlight-addition {
      color: ${variantColors[theme][7]};
    }

    .lg-highlight-meta,
    .lg-highlight-meta-string {
      color: ${variantColors[theme][6]};
    }

    .lg-highlight-variable,
    .lg-highlight-deletion,
    .lg-highlight-symbol,
    .lg-highlight-bullet,
    .lg-highlight-meta,
    .lg-highlight-link,
    .lg-highlight-attr,
    .lg-highlight-attribute,
    .lg-highlight-language,
    .lg-highlight-template-variable,
    .lg-highlight-built_in,
    .lg-highlight-type,
    .lg-highlight-params {
      color: ${variantColors[theme][5]}
    }

    .lg-highlight-title,
    .lg-highlight-class.lg-highlight-title {
      color: ${variantColors[theme][3]};
    }

    .lg-highlight-doctag,
    .lg-highlight-formula {
      color: ${variantColors[theme][3]};
    }
  
    .lg-highlight-comment {
      color: ${variantColors[theme][2]};
      font-style: italic;
    }
  
    .lg-highlight-string {
      font-weight: 600;
    }
    
    .lg-highlight-emphasis {
      font-style: italic;
    }
  
    .lg-highlight-strong {
      font-weight: ${fontWeights.bold};
    }
  }
`;

export function injectGlobalStyles() {
  Object.values(Theme).forEach(theme => injectGlobal(getStyles(theme)));
}
