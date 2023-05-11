import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { database } from "../config/firebase";
import { Image } from "react-native";
import { List, ActivityIndicator } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function Chats({ navigation }) {
  const [chatList, setChatList] = useState([]);
  const { currentUser } = useAuth();
  const [recipientAvatar, setRecipientAvatar] = useState();
  const [isLoading, setIsLoading] = useState();
  const chatArr = [];
  async function getChats() {
    const [senderQuerySnapshot, recipientQuerySnapshot] = await Promise.all([
      getDocs(
        query(
          collection(database, "chatsTest"),
          where("sender", "==", currentUser.uid)
        )
      ),
      getDocs(
        query(
          collection(database, "chatsTest"),
          where("recipient", "==", currentUser.uid)
        )
      ),
    ]);
    senderQuerySnapshot.forEach((doc) => {
      chatArr.push({
        docId: doc.id,
        docRecipient: doc.data().recipient,
        docSender: doc.data().sender,
        docName: doc.data().name,
      });
    });
    recipientQuerySnapshot.forEach((doc) => {
      chatArr.push({
        docId: doc.id,
        docRecipient: doc.data().recipient,
        docSender: doc.data().sender,
        docName: doc.data().name,
      });
    });
  }
  useEffect(() => {
    setIsLoading(true);
    getChats().then(() => {
      setChatList(chatArr);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <ActivityIndicator />
      </>
    );
  }

  return (
    <>
      {chatList.map((item, i) => {
        // const storage = getStorage();
        // const reference = ref(
        //   storage,
        //   `users/${currentUser.uid}/userImages/userImage.jpg`
        // );
        // getDownloadURL(reference)
        //   .then((url) => {
        //     setRecipientAvatar(url);
        //   })
        //   .then(() => {
        //     setIsLoading(false);
        //   })
        //   .catch((e) => console.log(e));

        return (
          <List.Item
            title={item.docName}
            key={i}
            onPress={() => {
              navigation.navigate("Chat", {
                sender: item.docSender,
                recipient: item.docRecipient,
              });
            }}
            left={(props) => (
              <List.Icon
                {...props}
                icon={() => (
                  <Image
                    // source={{ uri: recipientAvatar }}
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
