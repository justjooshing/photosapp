import React from "react";
import { Pressable, Text, View, StyleSheet, TextStyle } from "react-native";

type Props = {
  onClick?: () => void;
  copy: string;
  style?: TextStyle;
};

const Button = ({ copy, onClick = () => {}, style }: Props) => (
  <View>
    <Pressable onPress={onClick}>
      {({ pressed }) => (
        <Text style={[styles(pressed).button, style]}>{copy}</Text>
      )}
    </Pressable>
  </View>
);

export default Button;

const styles = (isPressed: boolean) =>
  StyleSheet.create({
    button: {
      display: "flex",
      textAlign: "center",
      borderStyle: "solid",
      padding: 10,
      margin: 10,
      borderWidth: 2,
      borderRadius: 5,
      fontWeight: "700",
      backgroundColor: isPressed ? "grey" : "white",
    },
  });
