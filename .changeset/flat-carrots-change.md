---
'@leafygreen-ui/code': patch
---

Fixes bug that prevented the language select from rendering if the `displayName` and `language` differed. 

```tsx
// languageOptions passed to `<Panel`>
export const languageOptions = [
  {
    displayName: 'JavaScript',
    language: 'javascript',
  },
  {
    displayName: 'Python',
    language: 'python',
  },
  {
    displayName: 'macOS',
    language: 'shell',
  },
];

// This will render the language selector.
<Code
  language={languageOptions[2].language} // shell
  panel={<Panel languageOptions={languageOptions} />} 
/>
```