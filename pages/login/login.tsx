import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Anchor, H1, Spinner, Text } from "tamagui";

import { useGetLoginLink } from "@/api/queries/auth";

const Login = () => {
  const loginLink = useGetLoginLink();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 120 }}>
      <ScrollView>
        <H1 style={{ paddingBottom: 20 }}>Welcome, you're logged out</H1>
        <Text style={{ paddingBottom: 20 }}>
          This wee app was built to help me sort through my loads of images on
          Google Photos, so hopefully it helps you too!
        </Text>
        <View style={styles.container}>
          {!loginLink.data ? (
            <View style={styles.button}>
              <Spinner color="white" />
            </View>
          ) : (
            <Anchor href={loginLink.data} style={styles.button}>
              <AntDesign name="google" size={24} style={styles.icon} />
              <Text>Login with Google</Text>
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
  button: {
    display: "flex",
    padding: 10,
    width: 200,
    backgroundColor: "#DB4437", // Google brand color
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    textDecorationLine: "none",
  },
  icon: {
    color: "white",
    paddingRight: 10,
  },
});
