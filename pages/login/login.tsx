import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "tamagui";

import { useGetLoginLink } from "@/api/query";

const Login = () => {
  const loginLink = useGetLoginLink();

  if (loginLink.isLoading) return <Text>Loading...</Text>;
  if (loginLink.isError) return <Text>{loginLink.error.message}</Text>;

  return (
    <View>
      <Text>Login</Text>
      <Link href={loginLink.data} asChild>
        <Button size="$4">
          <Button.Text>Login with Google</Button.Text>
        </Button>
      </Link>
    </View>
  );
};

export default Login;
