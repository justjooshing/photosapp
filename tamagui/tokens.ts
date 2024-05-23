import { createTokens } from "tamagui";

export const color = {
  grey1: "hsl(0, 0%, 94%)",
  grey2: "hsl(0, 0%, 90%)",
  grey3: "hsl(0, 0%, 85%)",
  grey4: "hsl(0, 0%, 80%)",
  grey5: "hsl(0, 0%, 70%)",
  grey5T: "hsla(0, 0%, 70%, 0.7)",
  grey6: "hsl(0, 0%, 65%)",
  grey7: "hsl(0, 0%, 60%)",
  grey7T: "hsla(0, 0%, 60%, 0.6)",
  grey8: "hsl(0, 0%, 50%)",
  grey8T: "hsla(0, 0%, 50%, 0.5)",
  grey9: "hsl(0, 0%, 30%)",
  grey10: "hsl(0, 0%, 25%)",
  grey11: "hsl(0, 0%, 20%)",
  blue: "hsl(240, 100%, 50%)",
  blue2: "hsl(240, 100%, 25%)",
  blue3: "hsl(210, 100%, 50%)",
  blue4: "hsl(195, 53%, 79%)",
  green: "hsl(122, 100%, 50%)",
  red: "hsl(0, 100%, 50%)",
  red2: "hsl(5, 75%, 54%)",
  red3: "hsl(5, 75%, 44%)",
  red4: "hsl(5, 75%, 34%)",
  white: "hsl(0, 0%, 100%)",
  black: "hsl(0, 0%, 0%)",
  yellow: "hsl(46, 99%, 44%)",
};

// tokens.ts
export const tokens = createTokens({
  space: {
    small: "",
    medium: "",
    true: "",
    large: "",
  },
  radius: {
    small: 10,
    medium: 20,
    true: 20,
    large: 40,
  },
  zIndex: {
    small: "",
    medium: "",
    true: "",
    large: "",
  },
  color,
  size: {
    small: "8px",
    medium: "12px",
    true: "12px",
    large: "16px",
  },
  fontSize: {
    small: "12px",
    medium: "16px",
    large: "20px",
  },
});
