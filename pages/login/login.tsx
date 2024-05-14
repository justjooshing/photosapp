import { Redirect } from "expo-router";
import { SafeAreaView, ScrollView, Text } from "react-native";

import { useGetLoginLink } from "@/api/queries/auth";

const Login = () => {
  const loginLink = useGetLoginLink();

  const getCopy = () => {
    if (loginLink.isLoading) return "Loading...";
    if (loginLink.isError) return loginLink.error.stack;
    else return "Redirecting to Google login";
  };

  if (loginLink.isLoading || loginLink.isError)
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 120 }}>
        <ScrollView>
          <Text>{getCopy()}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  // To google login page
  return <Redirect href={loginLink.data} />;
};

export default Login;
