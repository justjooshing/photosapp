import { tamaguiTokens } from "./tokens";

const light = {
  text: tamaguiTokens.color.grey1,
  primary: tamaguiTokens.color.blue,
  primaryHover: tamaguiTokens.color.blue2,
  primaryActive: tamaguiTokens.color.blue3,
  secondary: tamaguiTokens.color.grey6,
  secondaryHover: tamaguiTokens.color.grey5,
  secondaryActive: tamaguiTokens.color.grey7,
  danger: tamaguiTokens.color.red2,
  dangerHover: tamaguiTokens.color.red3,
  dangerActive: tamaguiTokens.color.red4,
  google: tamaguiTokens.color.red2,
  googleText: tamaguiTokens.color.grey1,
  googleHover: tamaguiTokens.color.red3,
  googleActive: tamaguiTokens.color.red4,
  success: tamaguiTokens.color.green,
  info: tamaguiTokens.color.yellow,
};

const dark = { ...light };

export const allThemes = {
  light,
  dark,
};
