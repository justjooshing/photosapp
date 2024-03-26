import { Link } from "expo-router";
import { Text, StyleSheet } from "react-native";

import { useGetLoginLink } from "@/api/query";

const Login = () => {
  const loginLink = useGetLoginLink();

  if (loginLink.isLoading) return <Text>Loading...</Text>;
  if (loginLink.isError) return <Text>{loginLink.error.message}</Text>;

  return (
    <>
      <Text>Login</Text>
      <Link href={loginLink.data} asChild>
        <Text style={styles.button}>Login with Google</Text>
      </Link>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "grey",
    borderWidth: 4,
    padding: 10,
  },
});
