import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text } from "react-native";

const Images = () => {
  return (
    <>
      <Text>Images</Text>
      <Link href="/login" asChild>
        <Pressable className="p-10">
          <Text className="border-4">press</Text>
        </Pressable>
      </Link>
      <StatusBar style="auto" />
    </>
  );
};

export default Images;
