// The structure of these Message objects is arbitrary given it is dependent on the user's backend data structure
const baseMessages: Array<unknown> = [
  {
    id: 0,
    messageBody: 'Hi! Ask me anything.',
    isSender: false,
  },
  {
    id: 1,
    messageBody: 'Can you tell me the answer to this thing?',
  },
  {
    id: 2,
    messageBody: `This should do the trick.\n
\`\`\`typescript
type HelloWorld = "Hello, world!"

function helloWorld() {
return "Hello, world!" satisfies HelloWorld;
}
\`\`\``,
    isSender: false,
    hasMessageActions: true,
  },
  {
    id: 3,
    messageBody: 'How about another question?',
  },
  {
    id: 4,
    messageBody: `Sorry, MongoAI can't do that right now.

Refer to [LeafyGreen UI](mongodb.design) or [LeafyGreen UI](mongodb.design) for more details. I'm filling out this space to see if the message will line up to the right side.`,
    isSender: false,
    hasMessageActions: true,
  },
];

export default baseMessages;
