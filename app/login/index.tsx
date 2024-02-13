import { useAuthContext } from "@/context/Auth";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Text, Pressable } from "react-native";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn]);

  const handleClick = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Text>Login</Text>
      <Link href="/" asChild>
        <Pressable onTouchEnd={handleClick} className="p-10">
          <Text className="bg-gray-200 border-4">Login with Google</Text>
        </Pressable>
      </Link>
    </>
  );
};

export default Login;
