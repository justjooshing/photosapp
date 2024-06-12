import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { H1, Spinner } from "tamagui";

import { useGetLoginLink } from "@/api/queries/auth";
import { color, space } from "@/config/tamagui/tokens";
import { Anchor, Button } from "@/config/tamagui/variants";

const Login = () => {
  const loginLink = useGetLoginLink();

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <H1 paddingBottom="$space.large">Welcome, you're logged out</H1>
        <Text style={styles.subheading}>
          This wee app was built to help me sort through my loads of images on
          Google Photos, so hopefully it helps you too!
        </Text>
        <View style={styles.login_container}>
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
              <Text style={styles.button_text}>Login with Google</Text>
            </Anchor>
          )}
        </View>
        {loginLink.isError && (
          <Text>Something's gone wrong. {loginLink.error.message}</Text>
        )}
        <View style={styles.privacy_policy}>
          <Link href="/privacy">
            <Button variant="secondary" size="$small" radius="$small">
              <Button.Text>Privacy Policy</Button.Text>
            </Button>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 120, paddingHorizontal: 30 },
  login_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: color.grey1,
    paddingRight: 10,
  },
  subheading: {
    paddingBottom: space.large,
  },
  button_text: {
    color: color.white,
  },
  privacy_policy: {
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
