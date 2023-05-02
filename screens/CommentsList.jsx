import React from "react";
import { View } from "react-native";
import CommentCard from "./CommentCard";

const comments = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=3",
    date: "May 2023",
    body: "This is the first comment.",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=7",
    date: "June 2023",
    body: "This is the second comment.",
  },
  {
    id: 3,
    name: "Bob Johnson",
    avatar: "https://i.pravatar.cc/150?img=13",
    date: "July 2023",
    body: "This is the third comment.",
  },
  {
    id: 4,
    name: "Sarah Lee",
    avatar: "https://i.pravatar.cc/150?img=5",
    date: "August 2023",
    body: "This is the fourth comment.",
  },
];

const CommentsList = () => {
  return (
    <View style={{ marginTop: 20 }}>
      {comments.map((comment) => (
        <CommentCard key={comment.id} user={comment} comment={comment} />
      ))}
    </View>
  );
};

export default CommentsList;
