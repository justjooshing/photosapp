import { useFonts as useExpoFonts } from "expo-font";

const useFonts = () => {
  const [loaded] = useExpoFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  return loaded;
};

export default useFonts;
