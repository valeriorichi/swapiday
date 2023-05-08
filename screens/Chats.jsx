import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { database } from "../config/firebase";
import { Image } from "react-native";
import { List } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

function Chats({ navigation }) {
  const [chatList, setChatList] = useState([]);
  const { currentUser, setCurrentUser } = useAuth();
  const [senderRecipient, setSenderRecipient] = useContext(ChatContext);

  const chatArr = [];
  async function getChats() {
    const [senderQuerySnapshot, recipientQuerySnapshot] = await Promise.all([
      getDocs(
        query(
          collection(database, "chatsTest"),
          where("sender", "==", currentUser.email)
        )
      ),
      getDocs(
        query(
          collection(database, "chatsTest"),
          where("recipient", "==", currentUser.email)
        )
      ),
    ]);
    senderQuerySnapshot.forEach((doc) => {
      chatArr.push(doc.id);
    });
    recipientQuerySnapshot.forEach((doc) => {
      chatArr.push(doc.id);
    });
  }
  useEffect(() => {
    getChats().then(() => setChatList(chatArr));
  }, []);

  return (
    <>
      {chatList.map((item, i) => {
        return (
          <List.Item
            title={item}
            key={i}
            onPress={() => {
              setSenderRecipient(item);
              navigation.navigate("Chat");
            }}
            left={(props) => (
              <List.Icon
                {...props}
                icon={() => (
                  <Image
                    source={require("../imagesTemp/avatar.png")}
                    style={{ width: 50, height: 50 }}
                  />
                )}
              />
            )}
          />
        );
      })}
    </>
  );
}

export default Chats;
