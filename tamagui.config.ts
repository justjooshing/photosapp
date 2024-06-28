import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

import { allThemes } from "./config/tamagui/themes";
import { tamaguiTokens } from "./config/tamagui/tokens";

const tamaguiConfig = createTamagui({
  ...config,
  themes: allThemes,
  defaultTheme: "light",
  tokens: tamaguiTokens,
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
