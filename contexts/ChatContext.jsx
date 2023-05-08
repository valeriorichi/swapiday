import { createContext, useState } from "react";

export const ChatContext = createContext([null, () => {}]);

export const ChatContextProvider = (props) => {
  const [senderRecipient, setSenderRecipient] = useState();
  return (
    <ChatContext.Provider value={[senderRecipient, setSenderRecipient]}>
      {props.children}
    </ChatContext.Provider>
  );
};
