import { Redirect } from "expo-router";
import { Text } from "react-native";

import { useGetLoginLink } from "@/api/query";

const Login = () => {
  const loginLink = useGetLoginLink();

  if (loginLink.isLoading) return <Text>Loading...</Text>;
  if (loginLink.isError) return <Text>{loginLink.error.message}</Text>;
  return <Redirect href={loginLink.data} />;
};

export default Login;
