import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

type Props = {
  onClick?: () => void;
  copy: string;
};

const Button = ({ copy, onClick = () => {} }: Props) => (
  <View style={styles.button}>
    <Pressable onPress={onClick}>
      <Text>{copy}</Text>
    </Pressable>
  </View>
);

export default Button;

const styles = StyleSheet.create({
  button: {
    borderStyle: "solid",
    borderWidth: 10,
    borderColor: "red",
  },
});
