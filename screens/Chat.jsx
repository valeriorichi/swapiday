import React, { useState, useEffect, useCallback, useContext } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import avatar from "../imagesTemp/avatar.png";
import { auth, database } from "../config/firebase";
import { ChatContext } from "../contexts/ChatContext";

function Chat({ route }) {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const docRef = doc(
      database,
      "chatsTest",
      route.params.sender + "-" + route.params.recipient
    );
    getDoc(docRef)
      .then((doc) => {
        setChat(doc);
        return doc;
      })
      .then((data) => {
        if (!data.exists()) {
          setDoc(
            doc(
              database,
              "chatsTest",
              route.params.sender + "-" + route.params.recipient
            ),
            {
              senderRecipient:
                route.params.sender + "-" + route.params.recipient,
              sender: user._id,
              recipient: route.params.recipient,
            }
          );
        }
      });
  }, []);

  useEffect(() => {
    const collectionRef = collection(
      database,
      "chatsTest",
      route.params.sender + "-" + route.params.recipient,
      "messages"
    );
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];

    addDoc(
      collection(
        database,
        "chatsTest",
        route.params.sender + "-" + route.params.recipient,
        "messages"
      ),
      {
        _id,
        createdAt,
        text,
        user,
      }
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: avatar,
      }}
    />
  );
}
export default Chat;
