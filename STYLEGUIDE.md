# Design Systems Style Guide

## Table of Contents

- [To Contribute](#To-Contribute)
- [Typing](#Typing)
- [Functions](#Functions)
- [Variable naming](#Variable-naming)
- [Variable placement](#Variable-placement)
- [Whitespace and line breaks](#Whitespace-and-line-breaks)
- [JSX/React](#JSX-React)
- [CSS-in-JS](#CSS-in-JS)
- [File Structure](https://github.com/mongodb/leafygreen-ui/blob/main/stories/Folder-Structure.stories.mdx)
- [References](#References)

## <a id="To-Contribute">To Contribute</a>

To propose updates to this style guide, please make the relevant changes in a branch and submit a PR. We review these PRs synchronously in our weekly Team Code Review and collectively gavel on new standards there.

### Format Contributions

### Prefer [Rule]

#### Why

_Description_

#### Prefer

_Example_

#### Avoid

_Example_

---

## <a id="Typing">Typing</a>

### Prefer constants and types over enums.

#### Why

Ensures that TypeScript doesn't prevent people from using the values directly rather than consuming the enum.

#### Prefer

```typescript
export const someConstant = {
  optionOne = 'option 1',
  optionTwo = 'option 2',
} as const;
```

#### Avoid

```typescript
enum someConstant = {
 optionOne: 'option 1',
 optionTwo: 'option 2',
}
```

---

### When creating TS entities, place them at the top of the file, above JS

---

## <a id="Functions">Functions</a>

### Prefer ternaries over simple `if/else` blocks

#### Why

Keeps code cleaner and easier to read.

#### Prefer

```typescript
return isBlah ? a : b;
```

#### Avoid

```typescript
if (isBlah) {
  return a;
} else {
  return b;
}
```

---

### All new (exported) functions should have a JSDoc comment explaining functionality.

#### Why

Documenting functions with [JSDoc](https://jsdoc.app/about-getting-started.html) helps PR reviewers better understand the intent of the function and also documents its use for other engineers using the code base. Better yet, [VS Code will automatically show in-line descriptions of a function](https://code.visualstudio.com/docs/languages/javascript#_jsdoc-support) when a user invokes that function in their editor.

JSDocs should also clearly mention any major assumptions made about the function's input and output that may not be immediately obvious to an engineer unfamiliar with this part of the code base.

#### Prefer

```typescript
/**
 * Get the next applicable instance for upgrade. The function handles regions and cloud providers
 * but does NOT work for Serverless clusters
 * @param clusterDescription the backbone cluster description model
 * @param providerOptionsModel the backbone provider options model
 * @returns the next upgrade instance for this cluster
 */
export const getNextUpgradeInstance = (
  clusterDescription: ClusterDescription,
  providerOptionsModel: ProviderOptions,
) => {
  // ...
};
```

#### Avoid

```typescript
export const getNextUpgradeInstance = (
  clusterDescription: ClusterDescription,
  providerOptionsModel: ProviderOptions,
) => {
  // ...
};
```

---

### Prefer creating the function in the highest scope, and passing in all required data.

#### Why

Keeps functions pure.

---

## <a id="Variable-naming">Variable Naming</a>

### Acronyms are considered a single entity in camel-casing

#### Why

Some treat each letter in an acronym as its own entity when an acronyme is included in a var name. We'll instead consider the acronym as a single entity, and only capitalize the first letter of it (if that).

#### Prefer

```typescript
let myWipValue = 'pending';
```

#### Avoid

```typescript
let myWIPValue = 'pending';
```

---

### Use UPPERCASE for static constants, and refactor to a shared file if needed.

---

### Use camelCase for most javascript functions and variables

---

### Use “be” verbs for boolean types. (e.g. should`/`can`/`does`/`has`)

---

## <a id="Variable-placement">Variable placement</a>

### Avoid inline declaration of static variables when they can be moved to top of file or refactored into new file

---

### Prefer placing let/const variables at the beginning of their scope.

---

### Prefer const to let whenever possible.

---

## <a id="Whitespace-and-line-breaks">Whitespace and line breaks</a>

### Use a space before every prop defined in an interface

---

## <a id="JSX-React">JSX/React</a>

### Prefer factoring out any more-than-1-line event handlers into their own functions

#### Why

Minimizes inline javascript logic within

#### Prefer

```typescript
const handleClick = (e) => {
    e.preventDefault()
    setState(curr => !curr)
}

<button onClick={handleClick}>
```

#### Avoid

```typescript
<button onClick={(e) => {
    e.preventDefault()
    setState(curr => !curr)
}}>
```

---

### Prefer prefixing event handlers with `handle`

#### Why

Standardizes how we name and search for functions that handle events

#### Prefer

```typescript
const handleClick = () => {};
return <button onClick={handleClick} />;
```

#### Avoid

```typescript
const onClick = () => {};
return <button onClick={onClick} />;
```

---

### Prefer using fragments over divs whenever possible

#### Why

Consolidates the number of levels of DOM

#### Prefer

```typescript
return <></>;
```

#### Avoid

```typescript
return <div></div>;
```

---

### Prefer using spread operator to avoid mutation of arrays and objects

#### Why

Immutability

---

### Avoid nesting ternary operators

---

### Factor out of functional components any methods that do NOT require state

---

## <a id="CSS-in-JS">CSS in JS</a>

### Avoid writing Emotion styles directly in JSX

#### Why

Enforces a separation of concerns and helps with readability of both the styles and markup.

#### Prefer

```typescript
const myStyles = css`...`
<div className={myStyles} />
```

#### Avoid

```typescript
<div className={css`...`} />
```

---

### Postfix style variable names appropriately

#### Why

When using Emotion `css`, postfix your variable with the word `styles` (or `style`). When creating a selector with `createUniqueClassName`, postfix the variable with `className`.

#### Prefer

```typescript
const myComponentStyles = css``;
const myComponentClassName = createUniqueClassName();
```

---

### Avoid CSS Variables

#### Why

While custom properties (i.e. var(--my-color)) can be powerful, we try to avoid using them since it can be hard to trace the origin of these variables vs. JS variables. Within a single component, prefer using a JS constant to store a style token. If you want to leverage the inheritance afforded by custom properties, consider if using static selectors can solve the problem.

#### Prefer

```typescript
const childClassName = createUniqueClassName();

const parentStyles = css`
  .${childClassName} {
    color: blue;
  }

  &:hover .${childClassName} {
    color: green;
  }
`;
```

#### Avoid

```typescript
const parentStyles = css`
  --color: blue
  &:hover {
    --color: green;
  }
`;

const childStyles = css`
  color: var(--color);
`;
```

---

## <a id="References">References</a>

- [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript)
- [DHH On Writing Software Well](https://www.youtube.com/watch?v=H5i1gdwe1Ls)
- [Google Javascript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Atlas Growth Style Guide](https://github.com/10gen/atlas-growth-style-guide/blob/main/README.md#Functions)
