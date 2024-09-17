import { AxiosError } from "axios";
import { StyleSheet, Text, View } from "react-native";

import { errorMessageLookup } from "@/api/errors";
import { tokens } from "@/config/tamagui/tokens";

interface ErrorHandlerProps {
  error: AxiosError;
}

const ErrorHandler = ({ error }: ErrorHandlerProps) => (
  <View style={styles.container}>
    <View style={styles.error}>
      <Text style={styles.copy}>{errorMessageLookup(error)}</Text>
    </View>
  </View>
);

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
    textAlign: "center",
    color: tokens.color.grey1,
  },
});
