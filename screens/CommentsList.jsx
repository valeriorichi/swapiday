import React, { useState, useEffect } from "react";
import { View, Button, TextInput } from "react-native";
import CommentCard from "./CommentCard";
import { doc, getDoc } from "firebase/firestore";
import { database, auth } from "../config/firebase";

const initialComments = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=3",
    date: "May 2023",
    body: "This is the first comment.",
  },
];

const CommentsList = () => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const currentUser = "User"; // Replace with the username of the logged-in user

  const handleAddComment = () => {
    const id = comments.length + 1;
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const comment = {
      id,
      name: "User",
      avatar: "https://i.pravatar.cc/150?img=1",
      date,
      body: newComment,
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  useEffect(() => {
    const docRef = doc(database, "userProfilesV2/DNuWaXM85COmHYtIXBnys2vRQxu2");
    getDoc(docRef)
      .then((doc) => {
        setNewComment(doc.data().comments);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          user={comment}
          comment={comment}
          onDelete={handleDeleteComment}
          currentUser={currentUser}
        />
      ))}
      <TextInput
        value={newComment}
        onChangeText={setNewComment}
        placeholder="Add a comment..."
      />
      <Button title="Add Comment" onPress={handleAddComment} />
    </View>
  );
};

export default CommentsList;
