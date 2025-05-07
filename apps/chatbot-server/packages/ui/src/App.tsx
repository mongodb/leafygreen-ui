import { useState } from 'react';
import Chatbot, {
  ChatWindow,
  FloatingActionButtonTrigger,
  InputBarTrigger,
  ModalView,
} from 'mongodb-chatbot-ui';

const suggestedPrompts = [
  'Why should I use the MongoDB Chatbot Framework?',
  'How does the framework use Atlas Vector Search?',
  'Do you support using LLMs from OpenAI?',
];

function App() {
  return (
    <div>
      <Chatbot darkMode={true} serverBaseUrl="http://localhost:3000/api/v1">
        <>
          <FloatingActionButtonTrigger text="Ask LeafyGreen AI" />
          <ModalView
            initialMessageText="Welcome to MongoDB AI Assistant. What can I help you with?"
            initialMessageSuggestedPrompts={suggestedPrompts}
          />
        </>
      </Chatbot>
    </div>
  );
}

export default App;
