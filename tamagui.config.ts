import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

import { allThemes } from "./config/tamagui/themes";
import { tokens } from "./config/tamagui/tokens";

const tamaguiConfig = createTamagui({
  ...config,
  themes: allThemes,
  defaultTheme: "light",
  tokens,
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
