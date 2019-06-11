import { Variants } from './types';

interface Base16Palette {
  '00': string; // Default Background
  '01': string; // Lighter Background (Used for status bars)
  '02': string; // Selection Background
  '03': string; // Comments, Invisibles, Line Highlighting
  '04': string; // Dark Foreground (Used for status bars)
  '05': string; // Default Foreground, Caret, Delimiters, Operators
  '06': string; // Light Foreground (Not often used)
  '07': string; // Light Background (Not often used)
  '08': string; // Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
  '09': string; // Integers, Boolean, Constants, XML Attributes, Markup Link Url
  '0A': string; // Classes, Markup Bold, Search Text Background
  '0B': string; // Strings, Inherited Class, Markup Code, Diff Inserted
  '0C': string; // Support, Regular Expressions, Escape Characters, Markup Quotes
  '0D': string; // Functions, Methods, Attribute IDs, Headings
  '0E': string; // Keywords, Storage, Selector, Markup Italic, Diff Changed
  '0F': string; // Deprecated, Opening/Closing Embedded Language Tags, e.g. <?php ?>
}

const variantColors: { readonly [K in Variants]: Base16Palette } = {
  [Variants.Light]: {
    '00': '#21313C',
    '01': '#3D4F58',
    '02': '#B8C4C2', // Fail
    '03': '#5D6C74',
    '04': '#B8C4C2', // Fail
    '05': '#E7EEEC', // Fail
    '06': '#F9FBFA', // Fail
    '07': '#FFFFFF', // Fail
    '08': '#CA4821',
    '09': '#E78735', // Fail
    '0A': '#EDB20E', // Fail
    '0B': '#13AA52', // Fail #116149 ?
    '0C': '#63AEB9', // Fail
    '0D': '#007CAD',
    '0E': '#CC3887',
    '0F': '#DB9F5A', // Fail
  },

  [Variants.Dark]: {
    '00': '#21313C',
    '01': '#3D4F58',
    '02': '#5D6C74',
    '03': '#89989B',
    '04': '#B8C4C2',
    '05': '#E7EEEC',
    '06': '#F9FBFA',
    '07': '#FFFFFF',
    '08': '#FF6F44',
    '09': '#FFAC65',
    '0A': '#EDB20E',
    '0B': '#35DE7B',
    '0C': '#a5e3ff',
    '0D': '#2DC4FF',
    '0E': '#FF7DC3',
    '0F': '#DB9F5A',
  },
};

const getStyles = (variant: Variants) => `
  .lg-highlight-hljs-${variant} {
    &.lg-highlight-hljs {
      display: block;
      color: inherit;
      font-size: 13px;
      line-height: 24px;
    }
    
    .lg-highlight-quote,
    .lg-highlight-literal,
    .lg-highlight-class,
    .lg-highlight-section,
    .lg-highlight-name,
    .lg-highlight-class > .lg-highlight-keyword,
    .lg-highlight-function > .lg-highlight-keyword {
      color: ${variantColors[variant]['0D']};
    }
  
    .lg-highlight-regexp,
    .lg-highlight-params,
    .lg-highlight-meta,
    .lg-highlight-meta-string {
      color: ${variantColors[variant]['0C']};
    }
  
    .lg-highlight-comment,
    .lg-highlight-doctag {
      color: ${variantColors[variant]['03']};
    }
  
    .lg-highlight-keyword,
    .lg-highlight-selector-tag,
    .lg-highlight-selector-attr,
    .lg-highlight-selector-pseudo,
    .lg-highlight-selector-id,
    .lg-highlight-selector-class {
      color: ${variantColors[variant]['0E']};
    }
  
    .lg-highlight-addition {
      color: ${variantColors[variant]['05']};
    }
  
    .lg-highlight-variable,
    .lg-highlight-deletion,
    .lg-highlight-symbol,
    .lg-highlight-bullet,
    .lg-highlight-subst,
    .lg-highlight-meta,
    .lg-highlight-link {
      color: ${variantColors[variant]['08']}
    }
  
    .lg-highlight-number,
    .lg-highlight-attr,
    .lg-highlight-attribute,
    .lg-highlight-built_in,
    .lg-highlight-template-variable,
    .lg-highlight-type {
      color: ${variantColors[variant]['09']};
    }
  
    .lg-highlight-string,
    .lg-highlight-title {
      color: ${variantColors[variant]['0B']};
    }
  
    .lg-highlight-formula {
      background: ${variantColors[variant]['02']};
    }
  
    .lg-highlight-emphasis {
      font-style: italic;
    }
  
    .lg-highlight-strong {
      font-weight: bold;
    }
  }
`;

export default Object.values(Variants).map(getStyles)
