import { createTokens } from "tamagui";

export const color = {
  grey1: "hsl(0, 0%, 94%)",
  grey2: "hsl(0, 0%, 85%)",
  grey3: "hsl(0, 0%, 80%)",
  grey4: "hsl(0, 0%, 70%)",
  grey5: "hsl(0, 0%, 65%)",
  grey6: "hsl(0, 0%, 50%)",
  grey7: "hsl(0, 0%, 40%)",
  blue: "hsl(210, 100%, 50%)",
  blue2: "hsl(210, 100%, 40%)",
  blue3: "hsl(210, 100%, 30%)",
  blue4: "hsl(210, 100%, 20%)",
  red: "hsl(0, 100%, 50%)",
  red2: "hsl(5, 75%, 54%)",
  red3: "hsl(5, 75%, 44%)",
  red4: "hsl(5, 75%, 34%)",
  white: "hsl(0, 0%, 100%)",
  black: "hsl(0, 0%, 0%)",
  green: "hsl(122, 50%, 40%)",
  green2: "hsl(122, 40%, 35%)",
  green3: "hsl(122, 30%, 30%)",
  yellow: "hsl(46, 99%, 44%)",
};

// tokens.ts
export const tokens = createTokens({
  color,
  space: {
    small: "8px",
    medium: "12px",
    true: "12px",
    large: "16px",
  },
  radius: {
    small: 5,
    medium: 10,
    large: 20,
  },
  zIndex: {
    small: "",
    medium: "",
    true: "",
    large: "",
  },
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
