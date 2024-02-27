import { useGetLoginLink } from "@/api/query";
import { useAuthContext } from "@/context/Auth/Auth";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Text, Pressable, StyleSheet } from "react-native";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const loginLink = useGetLoginLink();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn]);

  const handleClick = () => {
    router.push(loginLink.data);
    setIsLoggedIn(true);
  };

  return (
    <>
      <Text>Login</Text>
      <Link href="/" asChild>
        <Pressable onTouchEnd={handleClick}>
          <Text style={styles.button}>Login with Google</Text>
        </Pressable>
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
