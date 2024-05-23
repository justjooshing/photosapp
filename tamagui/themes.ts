import { tokens } from "./tokens";

const light = {
  text: tokens.color.grey1,
  primary: tokens.color.blue,
  primaryHover: tokens.color.blue2,
  primaryActive: tokens.color.blue3,
  secondary: tokens.color.grey8,
  secondaryHover: tokens.color.grey6,
  secondaryActive: tokens.color.grey9,
  danger: tokens.color.red2,
  dangerHover: tokens.color.red3,
  dangerActive: tokens.color.red4,
  google: tokens.color.red2,
  googleText: tokens.color.grey1,
  googleHover: tokens.color.red3,
  googleActive: tokens.color.red4,
  success: tokens.color.green,
  info: tokens.color.yellow,
};

const dark = { ...light };

export const allThemes = {
  light,
  dark,
};
