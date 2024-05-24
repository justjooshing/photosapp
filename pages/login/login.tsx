import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { H1, Spinner, Text, View } from "tamagui";

import { useGetLoginLink } from "@/api/queries/auth";
import { color } from "@/tamagui/tokens";
import { Anchor, Button } from "@/tamagui/variants";

const Login = () => {
  const loginLink = useGetLoginLink();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 120, paddingHorizontal: 30 }}>
      <ScrollView>
        <H1 paddingBottom="$space.large">Welcome, you're logged out</H1>
        <Text paddingBottom="$space.large">
          This wee app was built to help me sort through my loads of images on
          Google Photos, so hopefully it helps you too!
        </Text>
        <View style={styles.container}>
          {loginLink.isLoading ? (
            <Button
              variant="google"
              size="$small"
              radius="$small"
              centered
              disabled
            >
              <Spinner color="$color.grey1" />
            </Button>
          ) : (
            <Anchor
              variant="google"
              size="$small"
              radius="$small"
              centered
              href={loginLink.data}
            >
              <AntDesign name="google" size={24} style={styles.icon} />
              <Text color="$color.white">Login with Google</Text>
            </Anchor>
          )}
        </View>
        {loginLink.isError && (
          <Text>Something's gone wrong. {loginLink.error.message}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: color.grey1,
    paddingRight: 10,
  },
});
