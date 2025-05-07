import { useState } from "react";
import Chatbot, {
  ChatWindow,
  FloatingActionButtonTrigger,
  InputBarTrigger,
  ModalView,
} from "mongodb-chatbot-ui";
import { css } from "@emotion/css";

const suggestedPrompts = [
  "Why should I use the MongoDB Chatbot Framework?",
  "How does the framework use Atlas Vector Search?",
  "Do you support using LLMs from OpenAI?",
];

function MyApp() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Chatbot darkMode={true} serverBaseUrl="http://localhost:3000/api/v1">
        <>
          {/* <InputBarTrigger suggestedPrompts={suggestedPrompts} /> */}
          {/* <div onClick={(current) => setOpen(!current)}> */}
          <FloatingActionButtonTrigger text="Ask LeafyGreen AI" />
          {/* </div> */}
          <ModalView
            initialMessageText="Welcome to MongoDB AI Assistant. What can I help you with?"
            initialMessageSuggestedPrompts={suggestedPrompts}
          />
          {/* {open && (
            <ChatWindow
              className={css`width: 700px; position: fixed; bottom: 0; right: 0; margin-bottom: 48px;`}
              inputBarId="my-input-bar"
              inputBarPlaceholder="Ask me anything about MongoDB"
              inputBottomText="Powered by MongoDB Atlas Vector Search"
              initialMessageText="Welcome to MongoDB AI Assistant. What can I help you with?"
              initialMessageSuggestedPrompts={suggestedPrompts}
            />
          )} */}
        </>
      </Chatbot>
    </div>
  );
}

export default MyApp;
