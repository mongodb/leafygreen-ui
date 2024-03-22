import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { LGMarkdown } from '.';

const StoryMarkdown = `
# Heading 1

## Heading 2

### Heading 3

This is a paragraph.

Each paragraph can span multiple lines. And have multiple sentences!

A paragraph can also contain formatted text, like *italics* or **bold** words.

You can link to a URL using markdown link notation, e.g. [LeafyGreen UI](mongodb.design)

If you want to talk about code in a paragraph, you can use \`inline code\`. Wow!

Or you can use a markdown code block like this:

\`\`\`typescript
type HelloWorld = "Hello, world!"

function helloWorld() {
  return "Hello, world!" satisfies HelloWorld;
}
\`\`\`
- [https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs](https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs)
- [https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs](https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs)
- [https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs](https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs)
`;

const meta = {
  title: 'Chat/LGMarkdown',
  component: LGMarkdown,
  args: {
    children: StoryMarkdown,
  },
  argTypes: {
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
