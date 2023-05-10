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

const CommentsList = () => {
  // const { currentUser, setCurrentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [addedComment, setAddedComment] = useState(false);
  const [deletedComment, setDeletedComment] = useState(false);

  let currentUser = {
    uid: "DNuWaXM85COmHYtIXBnys2vRQxu2",
  };

  useEffect(() => {
    const docRef = doc(database, `userProfilesV2/${currentUser.uid}`);
    getDoc(docRef)
      .then((doc) => {
        const allComments = doc.data().comments;
        const filteredComments = allComments.filter(
          (comment) =>
            comment.body !== deletedComment.body &&
            comment.userId !== deletedComment.userId
        );
        setComments(filteredComments);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [addedComment, deletedComment]);

  const handleAddComment = () => {
    const docRef = doc(database, `userProfilesV2/${currentUser.uid}`);
    updateDoc(docRef, {
      comments: arrayUnion({ body: newComment, userId: currentUser.uid }),
    })
      .then(() => {
        setNewComment("");
        setAddedComment(true);
        setComments([
          ...comments,
          { body: newComment, userId: currentUser.uid },
        ]);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const handleDeleteComment = (comment) => {
    const docRef = doc(database, `userProfilesV2/${currentUser.uid}`);
    updateDoc(docRef, {
      comments: arrayRemove(
        comments.find(
          (c) => c.body === comment.body && c.userId === comment.userId
        )
      ),
    })
      .then(() => {
        setDeletedComment(true);
        const updatedComments = comments.filter(
          (c) => c.body !== comment.body && c.userId !== comment.userId
        );
        setComments(updatedComments);
        alert("Comment was deleted");
      })
      .catch((error) => {
        console.error("Error deleting comment: ", error);
      });
  };

  return (
    <View style={{ marginTop: 20 }}>
      {comments.map((comment, index) => (
        <CommentCard
          key={index}
          user={comment}
          comment={comment}
          currentUser={currentUser}
          onDelete={() => handleDeleteComment(comment)}
          deletedComment={deletedComment}
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
  );
};

export default CommentsList;
