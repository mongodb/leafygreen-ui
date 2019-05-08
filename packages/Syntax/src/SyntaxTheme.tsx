import React from 'react'

const styles = `
  .lg-highlight-hljs {
    display: block;
    overflow-x: auto;
    padding: .5em;
    background: #002b36;
    color: #839496;
  }

  .lg-highlight-comment,
  .lg-highlight-quote {
    color: #586e75;
  }

  .lg-highlight-keyword,
  .lg-highlight-selector-tag,
  .lg-highlight-addition {
    color: #859900;
  }

  .lg-highlight-number,
  .lg-highlight-string,
  .lg-highlight-meta 
  .lg-highlight-meta-string,
  .lg-highlight-literal,
  .lg-highlight-doctag,
  .lg-highlight-regexp {
    color: #2aa198;
  }

  .lg-highlight-title,
  .lg-highlight-section,
  .lg-highlight-name,
  .lg-highlight-selector-id,
  .lg-highlight-selector-class {
    color: #268bd2;
  }

  .lg-highlight-attribute,
  .lg-highlight-attr,
  .lg-highlight-variable,
  .lg-highlight-template-variable,
  .lg-highlight-class 
  .lg-highlight-title,
  .lg-highlight-type {
    color: #b58900;
  }

  .lg-highlight-symbol,
  .lg-highlight-bullet,
  .lg-highlight-subst,
  .lg-highlight-meta,
  .lg-highlight-meta 
  .lg-highlight-keyword,
  .lg-highlight-selector-attr,
  .lg-highlight-selector-pseudo,
  .lg-highlight-link {
    color: #cb4b16;
  }

  .lg-highlight-built_in,
  .lg-highlight-deletion {
    color: #dc322f;
  }

  .lg-highlight-formula {
    background: #073642;
  }

  .lg-highlight-emphasis {
    font-style: italic;
  }

  .lg-highlight-strong {
    font-weight: bold;
  }
`

export default function SyntaxTheme() {
  return (
    <style>
      {styles}
    </style>
  )
}