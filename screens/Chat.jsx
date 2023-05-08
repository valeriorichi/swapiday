
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useContext
} from "react";
import { TouchableOpacity, Text } from "react-native";
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
import { useRoute } from "@react-navigation/native"; // added by Val

function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);

  //This will be set using profile page.
  const [recipient, setRecipient] = useState();

function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const route = useRoute(); //added by Val
  const { searchedUserUid } = route.params; //added by Val
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const [senderRecipient, setSenderRecipient] = useContext(ChatContext);
  
  async function getDocument() {
    const docRef = doc(database, "chatsTest", senderRecipient);
    const docSnap = await getDoc(docRef);
    return docSnap;
  }

  useEffect(() => {
    const collectionRef = collection(
      database,
      "chatsTest",
      senderRecipient,
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

    //Prevents overwriting of sender/recipient
    getDocument().then((data) => {
      if (!data.exists()) {
        setDoc(doc(database, "chatsTest", senderRecipient), {
          senderRecipient,
          sender: user._id,
          recipient,
        });
      }
    });

    addDoc(collection(database, "chatsTest", senderRecipient, "messages"), {
      _id,
      createdAt,
      text,
      user,
    });
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
