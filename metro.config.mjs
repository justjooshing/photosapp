// Learn more https://docs.expo.io/guides/customizing-metro

import { withTamagui } from "@tamagui/metro-plugin";
import { getDefaultConfig } from "expo/metro-config";
import path from "path";
import { fileURLToPath } from "url";

/** @type {import('expo/metro-config').MetroConfig} */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

module.exports = withTamagui(config, {
  components: ["tamagui"],
  config: "./tamagui.config.ts",
  outputCSS: "./tamagui-web.css",
});
