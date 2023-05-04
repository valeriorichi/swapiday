import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

const CommentCard = ({ user, comment, onDelete }) => {
  return (
    <View style={{ flexDirection: "row", marginVertical: 10, marginLeft: 20 }}>
      <Avatar.Image source={{ uri: user.avatar }} size={40} />
      <View style={{ marginLeft: 10 }}>
        <Text>{user.name}</Text>
        <Text style={{ color: "grey", fontSize: 12 }}>{comment.date}</Text>
        <Text style={{ marginTop: 5 }}>{comment.body}</Text>
        <TouchableOpacity onPress={() => onDelete(comment.id)}>
          <Text style={{ color: "red", marginTop: 5 }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentCard;
