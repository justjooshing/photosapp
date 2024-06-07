import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

import { allThemes } from "./tamagui/themes";
import { tokens } from "./tamagui/tokens";

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
