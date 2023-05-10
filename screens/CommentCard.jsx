import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { database, auth } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
// import unknown_user_Img from "../assets/unknown_user_Img";

const CommentCard = ({
  user,
  comment,
  currentUser,
  onDelete,
  deletedComment,
}) => {
  const isAuthor = currentUser.uid === comment.userId;

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

  const handleDeleteComment = () => {
    const docRef = doc(database, `userProfilesV2/${currentUser.uid}`);
    updateDoc(docRef, {
      comments: arrayRemove(comment),
    })
      .then(() => {
        setDeletedComment(true);
        alert("comment was deleted");
      })
      .catch((error) => {
        console.error("Error deleting comment: ", error);
      });
  };

  return (
    <View style={{ flexDirection: "row", marginVertical: 10, marginLeft: 20 }}>
      <Avatar.Image source={{ uri: userImage }} size={40} />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{user.name}</Text>
          <Text style={{ color: "grey", fontSize: 12 }}>{comment.date}</Text>
        </View>
        <Text style={{ marginTop: 5 }}>{comment.body}</Text>
        {isAuthor && (
          <TouchableOpacity onPress={onDelete}>
            <Text style={{ color: "red", marginTop: 5 }}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CommentCard;
