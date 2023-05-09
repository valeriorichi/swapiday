import React, { useState, useEffect } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { doc, getDoc } from "firebase/firestore";
import { database, auth } from "../config/firebase";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
// import unknown_user_Img from "../assets/unknown_user_Img";

const CommentCard = ({ user, comment, onDelete, currentUser }) => {
  const isAuthor = currentUser === comment.name;

  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const storage = getStorage();
    const userImageRef = ref(
      storage,
      `users/${comment.userId}/userImages/userImage.jpg`
    );
    getDownloadURL(userImageRef)
      .then((url) => {
        setUserImage(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ flexDirection: "row", marginVertical: 10, marginLeft: 20 }}>
      <Avatar.Image source={{ uri: userImage }} size={40} />
      <View style={{ marginLeft: 10 }}>
        <Text>{user.name}</Text>
        <Text style={{ color: "grey", fontSize: 12 }}>{comment.date}</Text>
        <Text style={{ marginTop: 5 }}>{comment.body}</Text>
        {isAuthor && (
          <TouchableOpacity onPress={() => onDelete(comment.id)}>
            <Text style={{ color: "red", marginTop: 5 }}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CommentCard;
