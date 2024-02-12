import { useAuthContext } from "@/context/Auth";
import { Link } from "expo-router";
import { Text, Pressable } from "react-native";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  const handleClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      <Text>Login</Text>
      <Link href="/images" asChild>
        <Pressable onTouchEnd={handleClick} className="p-10">
          <Text className="bg-gray-200 border-4">Login with Google</Text>
        </Pressable>
      </Link>
    </>
  );
};

export default Login;
