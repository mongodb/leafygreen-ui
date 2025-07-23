# v6 to v7

This major version brings many improvements to screen-reader and colorblindness accessiblity, and fixes a few bugs along the way. Here are the main changes you may need to account for:

- The rendered DOM has changed significantly – moving from a checkbox to a button, and applying the appropriate accessibility attributes. Any tests or CSS that is reliant on this DOM will likely need to be updated. We recommend selecting on `role="switch` where possible when selecting the button that's rendered to make your implementation last as long as possible.
- The `onChange` handler has been updated. If you were relying on getting the checked state using `event.target.checked`, that will no longer work. We've added checked state updates as the first parameter of the `onChange` callback to make using this as easy as possible. You can pass a callback like `checked => setChecked(checked)` to `onChange` to maintain state locally. Please note: the checked state returned is the internal state that the component manages.
- We now require `aria-label` OR `aria-labelledby` to be passed to the component, and we enforce this through TypeScript, and `console.error`. Please read the "Accessibility" section in the Toggle documentation for more information.
