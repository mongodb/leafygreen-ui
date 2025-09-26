import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { LGMarkdown } from '.';

const MARKDOWN_TEXT = `
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5 (not supported)

###### Heading 6 (not supported)

---

This is a paragraph.

Each paragraph can span multiple lines. And have multiple sentences!

A paragraph can also contain formatted text, like *italics* or **bold** words.

You can link to a URL using markdown link notation, e.g. [LeafyGreen UI](mongodb.design)

Long links will wrap to the next line: [https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs](https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs)

---

If you want to talk about code in a paragraph, you can use \`inline code\`. Wow!

Or you can use a markdown code block like this:

\`\`\`typescript
type HelloWorld = "Hello, world!"

function helloWorld() {
  return "Hello, world!" satisfies HelloWorld;
}
\`\`\`

---

> This is a blockquote element.

Here's an ordered list:

1. Ordered list item 1
2. Ordered list item 2
   1. Nested ordered list item 2.1
   2. Nested ordered list item 2.2
3. Ordered list item 3

Here's an unordered list:

- Unordered list item 1
- Unordered list item 2
  - Nested unordered list item 2.1
  - Nested unordered list item 2.2
- Unordered list item 3
`;

const meta = {
  title: 'Composition/Chat/LGMarkdown',
  component: LGMarkdown,
  args: {
    children: MARKDOWN_TEXT,
  },
  argTypes: {
    baseFontSize: storybookArgTypes.baseFontSize,
    darkMode: storybookArgTypes.darkMode,
  },
};
export default meta;

const Template: StoryFn<typeof LGMarkdown> = args => <LGMarkdown {...args} />;

export const Basic = Template.bind({});

export const WhitespaceContent = Template.bind({});
WhitespaceContent.args = {
  children: `
This is a paragraph.

&nbsp;&nbsp;&nbsp;Each paragraph can span multiple lines. And have multiple sentences!

        A paragraph can also contain formatted text, like *italics* or **bold** words.

You can link to a URL using markdown link notation, e.g. [LeafyGreen UI](mongodb.design)

If you want to talk about code in a paragraph, you can use \`inline code\`. Wow!
`,
};
