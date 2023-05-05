import { ScrollView, Text } from "react-native";
import LogoHeader from "./LogoHeader";
import { database, auth } from "../config/firebase";
import "firebase/firestore";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useEffect } from "react";

function WishList() {
  useEffect(() => {
    const todosRef = collection(database, "todos");
    const unsubscribe = onSnapshot(todosRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
      });
    });
    addDoc(todosRef, {
      text: "our second message",
    })
      .then((docRef) => {
        console.log("Added new todo with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding new todo: ", error);
      });
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView>
      <LogoHeader />
      <Text>hello</Text>
    </ScrollView>
  );
}

export default WishList;
