import React from "react";
import { Pressable, Text } from "react-native";
import { Link as ExpoLink } from "expo-router";

type Props = {
  href: string;
  copy: string;
};

const Link = ({ href, copy }: Props) => (
  <ExpoLink href={href} asChild>
    <Pressable>
      <Text className="border-4 p-4">{copy}</Text>
    </Pressable>
  </ExpoLink>
);

export default Link;
