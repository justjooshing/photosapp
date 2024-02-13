import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Link as ExpoLink } from "expo-router";

type Props = {
  href: string;
  copy: string;
};

const Link = ({ href, copy }: Props) => (
  <ExpoLink href={href} asChild>
    <Pressable>
      <Text style={styles.link}>{copy}</Text>
    </Pressable>
  </ExpoLink>
);

export default Link;

const styles = StyleSheet.create({
  link: {
    borderWidth: 4,
    padding: 4,
  },
});
