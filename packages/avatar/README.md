# Avatar

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/avatar
```

### NPM

```shell
npm install @leafygreen-ui/avatar
```

## Usage

```tsx
// Text
return <Avatar format={Format.Text} text="AT" size={AvatarSize.Large} />;

// Icon
return <Avatar format={Format.Icon} glyph="PersonGroup" />;

// Logo
return <Avatar format={Format.MongoDB} sizeOverride={56} />;
```

## Properties

| Prop           | Type                               | Description                                                                     | Default     |
| -------------- | ---------------------------------- | ------------------------------------------------------------------------------- | ----------- |
| `darkMode`     | `boolean`                          | Determines if the component will render in dark mode                            | `false`     |
| `size`         | `"default"`, `"large"`, `"xlarge"` | Determines the size of the avatar                                               | `"default"` |
| `sizeOverride` | `number`                           | If provided, overrides the size prop to a customizable number (in px)           |             |
| `format`       | `"mongo"`, `"user"`, `"default"`   | Determines the Avatar component's variant                                       | `"default"` |
| `text`         | `string`                           | The text to render in the Avatar when `format === 'text'`                       |             |
| `glyph`        | `GlyphName`                        | The LeafyGreen icon glyph name to render in the Avatar when `format === 'icon'` | `"Person"`  |
| `...`          | `HTMLElementProps<'div'>`          | Props spread on the root element                                                |             |

## `getInitials`

A utility function that returns the initials of the provided string(s).

```ts
getInitials(fullOrGivenName?: string, surname?: string): Initials
```

Accepts one or two strings.
If a a single argument is provided, this string will be assumed to be the full name. If two are provided then the 1st is assumed to be the given name, and the 2nd is the surname.

Returns an `Initials` object.

```ts
interface Initials {
  initials: string | null;
  givenInitial: string | null;
  surnameInitial: string | null;
}
```

### Notes & Known issues:

- Names including characters _other than_ the English alphabet and common Latin accented letters will be ignored, and will return `null` for each property in the returned object. (Includes Letters in Unicode Basic Latin, Latin-1 Supplement and Latin Extended-A. See [Wikipedia: List of Unicode characters](https://en.wikipedia.org/wiki/List_of_Unicode_characters))

- Names with suffixes (e.g. Jr., Sr., etc.) will include the first letter of the suffix in the surname initial (e.g. `getInitials("Robert Downey Jr.") // RDJ`)
