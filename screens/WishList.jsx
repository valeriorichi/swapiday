import { ScrollView, Text } from "react-native";
import LogoHeader from "./LogoHeader";
import { database, auth } from "../config/firebase";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";

function WishList() {
  return (
    <ScrollView>
      <LogoHeader />
      <Text>hello</Text>
    </ScrollView>
  );
}

export default WishList;
