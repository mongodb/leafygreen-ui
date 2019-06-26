import { Variant } from './types';
import { injectGlobal } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

interface Base16Palette {
  '00': string; // Background
  '01': string; // Borders / non-text graphical accents
  '02': string; // Comments, Doctags, Formulas
  '03': string; // Default Text
  '04': string; // Highlights
  '05': string; // Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
  '06': string; // Classes, Markup Bold, Search Text Background
  '07': string; // Strings, Inherited Class, Markup Code, Diff Inserted
  '08': string; // Support, Regular Expressions, Escape Characters, Markup Quotes
  '09': string; // Functions, Methods, Classes, Names, Sections, Literals
  '10': string; // Keywords, Storage, Selector, Markup Italic, Diff Changed
}

export const variantColors: { readonly [K in Variant]: Base16Palette } = {
  [Variant.Light]: {
    '00': uiColors.gray.light3,
    '01': uiColors.gray.light2,
    '02': uiColors.gray.dark2,
    '04': uiColors.white,
    '03': uiColors.gray.dark3,
    '05': '#CA4821',
    '06': '#EDB210',
    '07': '#12824D',
    '08': uiColors.blue.dark2,
    '09': uiColors.blue.base,
    '10': '#CC3887',
  },

  [Variant.Dark]: {
    '00': uiColors.gray.dark3,
    '01': uiColors.black,
    '02': uiColors.gray.light1,
    '03': uiColors.gray.light3,
    '04': uiColors.gray.dark2,
    '05': '#FF6F44',
    '06': '#EDB210',
    '07': '#35DE7B',
    '08': '#a5e3ff',
    '09': '#2DC4FF',
    '10': '#FF7DC3',
  },
};

const getStyles = (variant: Variant): string => `
  .lg-highlight-hljs-${variant} {
    .lg-highlight-quote,
    .lg-highlight-literal,
    .lg-highlight-class,
    .lg-highlight-section,
    .lg-highlight-name,
    .lg-highlight-class > .lg-highlight-keyword,
    .lg-highlight-function > .lg-highlight-keyword {
      color: ${variantColors[variant]['09']};
    }
  
    .lg-highlight-regexp,
    .lg-highlight-params,
    .lg-highlight-meta,
    .lg-highlight-meta-string {
      color: ${variantColors[variant]['08']};
    }
  
    .lg-highlight-comment {
      color: ${variantColors[variant]['02']};
    }

    .lg-highlight-doctag,
    .lg-highlight-formula {
      color: ${variantColors[variant]['03']};
    }
  
    .lg-highlight-keyword,
    .lg-highlight-selector-tag,
    .lg-highlight-selector-attr,
    .lg-highlight-selector-pseudo,
    .lg-highlight-selector-id,
    .lg-highlight-selector-class {
      color: ${variantColors[variant]['10']};
    }
  
    .lg-highlight-addition {
      color: ${variantColors[variant]['04']};
    }
  
    .lg-highlight-variable,
    .lg-highlight-deletion,
    .lg-highlight-symbol,
    .lg-highlight-bullet,
    .lg-highlight-subst,
    .lg-highlight-meta,
    .lg-highlight-link,
    .lg-highlight-number,
    .lg-highlight-attr,
    .lg-highlight-attribute,
    .lg-highlight-built_in,
    .lg-highlight-template-variable,
    .lg-highlight-type {
      color: ${variantColors[variant]['05']}
    }
  
    .lg-highlight-string,
    .lg-highlight-title {
      color: ${variantColors[variant]['07']};
    }
  
    .lg-highlight-emphasis {
      font-style: italic;
    }
  
    .lg-highlight-strong {
      font-weight: bold;
    }
  }
`;

Object.values(Variant).forEach(variant => injectGlobal(getStyles(variant)));
