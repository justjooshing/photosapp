import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import { H1, Spinner } from "tamagui";

import { useGetLoginLink } from "@/api/queries/auth";
import { color, space } from "@/config/tamagui/tokens";
import { Anchor, Button } from "@/config/tamagui/variants";

const Login = () => {
  const loginLink = useGetLoginLink();

  return (
    <View style={styles.container}>
      <H1 paddingBottom="$space.large">Welcome, you're logged out</H1>
      <Text style={styles.subheading}>
        This wee app was built to help me sort through my loads of images on
        Google Photos, so hopefully it helps you too!
      </Text>
      <View style={styles.login_wrapper}>
        {loginLink.isLoading ? (
          <Button variant="google" size="$1" radius="$1" disabled>
            <Spinner color="$color.grey1" />
          </Button>
        ) : (
          <Anchor
            variant="google"
            size="$1"
            radius="$1"
            href={loginLink.data}
            disabled={loginLink.isError}
          >
            <View style={styles.login_button}>
              <AntDesign name="google" size={24} style={styles.icon} />
              <Text style={styles.button_text}>Login with Google</Text>
            </View>
          </Anchor>
        )}
        {loginLink.isError && (
          <Text style={styles.error}>
            Something's gone wrong. {loginLink.error.message}
          </Text>
        )}
      </View>
      <View style={styles.privacy_policy}>
        <Button variant="secondary" size="$1" radius="$1">
          <Link href="/privacy">
            <Button.Text>Privacy Policy</Button.Text>
          </Link>
        </Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { paddingTop: 120, paddingHorizontal: 30 },
  login_wrapper: {
    alignItems: "center",
  },
  login_button: {
    paddingTop: Platform.OS !== "web" ? space[1] : 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: color.grey1,
  },
  subheading: {
    paddingVertical: space[3],
  },
  button_text: {
    paddingLeft: 10,
    color: color.white,
  },
  privacy_policy: {
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    paddingTop: space[1],
  },
});
