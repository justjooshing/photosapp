import { StyleSheet, Text, View } from "react-native";

import { tokens } from "@/config/tamagui/tokens";

const globalErrorMessages = {
  400: "The request could not be understood by the server.",
  401: "You are not authorized to access this resource.",
  404: "The requested resource was not found.",
  500: "An error occurred on the server. Please try again later.",
};

export const handleErrorCode = ({
  status,
  localErrorMessages,
}: ErrorHandlerProps) => {
  if (!status) return "Something's gone wrong";
  return (
    localErrorMessages?.[status] ||
    globalErrorMessages[status] ||
    "Something's gone wrong"
  );
};

interface ErrorHandlerProps {
  status: number | undefined;
  localErrorMessages?: { [key: number]: string };
}

const ErrorHandler = (props: ErrorHandlerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.error}>
        <Text style={styles.copy}>{handleErrorCode(props)}</Text>
      </View>
    </View>
  );
};

export default ErrorHandler;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.space[3],
  },
  error: {
    maxWidth: 300,
    padding: tokens.space[3],
    backgroundColor: tokens.color.red2,
    borderRadius: tokens.radius[1],
  },
  copy: {
    color: tokens.color.grey1,
  },
});
