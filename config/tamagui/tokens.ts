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

export const space = {
  1: 8,
  2: 12,
  true: 12,
  3: 16,
} as const;

export const radius = {
  1: 5,
  2: 10,
  3: 20,
} as const;

export const tokens = createTokens({
  color,
  space,
  radius,
  zIndex: {
    1: 1,
    2: 2,
    true: 3,
    3: 4,
  },
  size: {
    1: "8px",
    2: "12px",
    true: "12px",
    3: "16px",
  },
  fontSize: {
    1: 12,
    2: 16,
    true: 16,
    3: 24,
  },
});
