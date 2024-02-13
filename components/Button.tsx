import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  onClick?: () => void;
  copy: string;
};

const Button = ({ copy, onClick = () => {} }: Props) => (
  <View
    className="px-10 mx-10 border-blue-800 border-solid border-x-2"
    style={{
      borderStyle: "solid",
      borderWidth: 10,
      borderColor: "red",
    }}
  >
    <Pressable onPress={onClick} className="border-red-800 mx-10">
      <Text className="border-4 border-red-800 mx-10">{copy}</Text>
    </Pressable>
  </View>
);

export default Button;
