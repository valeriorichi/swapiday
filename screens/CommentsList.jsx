import React, { useState, useEffect } from "react";
import { View, Button, TextInput } from "react-native";
import CommentCard from "./CommentCard";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { database, auth } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import { ScrollView } from "react-native-gesture-handler";

const CommentsList = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [addedComment, setAddedComment] = useState(false);
  const [deletedComment, setDeletedComment] = useState(false);

  useEffect(() => {
    const docRef = doc(database, `userProfilesV2/${currentUser.uid}`);
    getDoc(docRef)
      .then((doc) => {
        setComments(doc.data().comments);
      })
      .then(() => {
        console.log("currentUser.uid", currentUser.uid);
        console.log("comments", comments);
        console.log("comments[0]", comments[0]);
        console.log(comments[0]["userId"]), "<<<<LINE 26";
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddComment = () => {
    const docRef = doc(database, `userProfilesV2/${currentUser.uid}`);
    updateDoc(docRef, {
      comments: arrayUnion({ body: newComment, userId: currentUser.uid }),
    })
      .then(() => {
        setAddedComment(true);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  // const updatedComments = comments.filter((comment) => comment.id !== id);
  // setComments(updatedComments);

  return (
    <ScrollView>
      <View style={{ marginTop: 20 }}>
        {comments.map((comment, index) => (
          <CommentCard
            key={index}
            user={comment}
            comment={comment}
            currentUser={currentUser}
          />
        ))}
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
        />
        <Button
          title="Add Comment"
          onPress={handleAddComment}
          disabled={addedComment}
        />
      </View>
    </ScrollView>
  );
};

export default CommentsList;
