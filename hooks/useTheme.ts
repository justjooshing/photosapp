import { DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";

const useTheme = () => {
  const colourScheme = useColorScheme();
  // Update after checking over dark mode themes
  const theme = colourScheme === "dark" ? DefaultTheme : DefaultTheme;
  return theme;
};

export default useTheme;
