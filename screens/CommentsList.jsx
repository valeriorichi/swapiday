import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import CommentCard from "./CommentCard";

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

  return (
    <View style={{ marginTop: 20 }}>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          user={comment}
          comment={comment}
          onDelete={handleDeleteComment}
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
