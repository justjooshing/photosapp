import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Spinner } from "tamagui";

import SwipeAnimation from "./components/swipe_animation";

import { useGetLoginLink } from "@/api/queries/auth";
import { tokens } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";
import { useAppContext } from "@/context/app";
import useHideSplashScreen from "@/hooks/useHideSplashScreen";

const Login = () => {
  const { setWindowWidth } = useAppContext();
  const loginLink = useGetLoginLink();
  useHideSplashScreen({ loaded: !!loginLink.data || loginLink.isError });

  const onLayout = ({ nativeEvent: { layout } }) => {
    setWindowWidth(layout.width);
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[tokens.color.blue, tokens.color.blue2]}
      onLayout={onLayout}
    >
      <View style={styles.contents}>
        <Text style={styles.tagline}>Uncover memories.</Text>
        <Text style={[styles.tagline, styles.offset_tagline]}>
          Delete near duplicates.
        </Text>
        <Text style={styles.tagline}>Save storage.</Text>
      </View>
      <SwipeAnimation />
      <View style={styles.buttons}>
        <Text style={styles.copy}>
          This wee app was built to help me sort through my loads of images on
          Google Photos, so hopefully it helps you too!
        </Text>
        {loginLink.isLoading ? (
          <Button variant="google" size="$1" radius="$1" disabled>
            <Spinner color="$color.grey1" />
          </Button>
        ) : (
          <Button
            variant="google"
            size="$1"
            radius="$1"
            disabled={loginLink.isError}
          >
            <Link href={loginLink.data || "/"}>
              <View style={styles.login_button}>
                <AntDesign name="google" size={24} style={styles.icon} />
                <Button.Text style={styles.button_text}>
                  Login with Google
                </Button.Text>
              </View>
            </Link>
          </Button>
        )}
        {loginLink.isError && (
          <Text style={styles.error}>
            Something's gone wrong. {loginLink.error.message}
          </Text>
        )}
        <View style={styles.privacy_policy}>
          <Button variant="secondary" size="$1" radius="$1">
            <Link href="/privacy">
              <Button.Text>Privacy Policy</Button.Text>
            </Link>
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 50,
    height: "100%",
    justifyContent: "space-between",
  },
  contents: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  tagline: {
    color: tokens.color.grey1,
    fontSize: tokens.fontSize[3],
    padding: tokens.space[2],
  },
  offset_tagline: { textAlign: "right" },
  copy: {
    paddingVertical: tokens.space[2] * 2,
    color: tokens.color.grey2,
  },
  login_button: {
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    color: tokens.color.grey1,
  },
  buttons: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button_text: {
    paddingLeft: 10,
    color: tokens.color.white,
  },
  privacy_policy: {
    paddingVertical: 40,
  },
  error: {
    paddingTop: tokens.space[1],
  },
});
