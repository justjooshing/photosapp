import { useGetLoginLink } from "@/api/query";
import { useAuthContext } from "@/context/Auth/Auth";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Text, StyleSheet } from "react-native";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const loginLink = useGetLoginLink();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn]);

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
