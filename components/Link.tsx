import { Link as ExpoLink } from "expo-router";
import React from "react";
import { Pressable, Text, StyleSheet, TextStyle } from "react-native";

type Props = {
  href: string;
  copy: string;
  style?: TextStyle;
};

const Link = ({ href, copy, style }: Props) => (
  <ExpoLink href={href} asChild>
    <Pressable>
      {({ pressed }) => (
        <Text style={[styles(pressed).link, style]}>{copy}</Text>
      )}
    </Pressable>
  </ExpoLink>
);

export default Link;

const styles = (isPressed: boolean) =>
  StyleSheet.create({
    link: {
      display: "flex",
      textAlign: "center",
      borderStyle: "solid",
      padding: 10,
      margin: 10,
      borderWidth: 2,
      borderRadius: 5,
      fontWeight: "700",
      backgroundColor: isPressed ? "grey" : "white",
      transform: [{ scale: isPressed ? 1.2 : 1 }],
    },
  });
