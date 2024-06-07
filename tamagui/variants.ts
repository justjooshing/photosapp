import { VariantDefinitions } from "@tamagui/web";
import {
  styled,
  Button as TamButton,
  Anchor as TamAnchor,
  ButtonText as TamButtonText,
  TamaguiComponent,
  withStaticProperties,
} from "tamagui";

type Sizes = "small" | "medium" | "true" | "large";
const buttonStyles: VariantDefinitions<typeof TamButton> &
  VariantDefinitions<typeof TamAnchor> = {
  variant: {
    success: {
      backgroundColor: "$success",
      color: "$text",
    },
    primary: {
      backgroundColor: "$primary",
      color: "$text",
      hoverStyle: {
        backgroundColor: "$primaryHover",
      },
      pressStyle: {
        backgroundColor: "$primaryActive",
      },
    },
    secondary: {
      backgroundColor: "$secondary",
      color: "$text",
      hoverStyle: {
        backgroundColor: "$secondaryHover",
      },
      pressStyle: {
        backgroundColor: "$secondaryActive",
      },
    },
    danger: {
      backgroundColor: "$danger",
      color: "$text",
      hoverStyle: {
        backgroundColor: "$dangerHover",
      },
      pressStyle: {
        backgroundColor: "$dangerActive",
      },
    },
    google: {
      backgroundColor: "$google",
      color: "$googleText",
      hoverStyle: {
        backgroundColor: "$googleHover",
      },
      pressStyle: {
        backgroundColor: "$googleActive",
      },
    },
  } as const,
  centered: {
    true: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  radius: {
    "...size": (name: Sizes, { tokens }) => ({
      borderRadius: tokens.radius[name],
    }),
  },
  size: {
    "...size": (name: Sizes, { tokens }) => ({
      padding: tokens.space[name],
      fontSize: tokens.fontSize[name],
    }),
  },
} as const;

const baseButtonStyles = {
  style: {
    minWidth: "100px",
    maxWidth: "80vw",
    height: "auto",
  },
  disabledStyle: {
    cursor: "default",
    opacity: 0.6,
  },
} as const;

const ButtonText = styled(TamButtonText, {
  name: "ButtonText",
  style: {
    whiteSpace: "balance",
  },
  disabledStyle: {
    cursor: "default",
  },
});

export const ButtonFrame: TamaguiComponent = styled(TamButton, {
  name: "Button",
  ...baseButtonStyles,
  variants: buttonStyles,
} as const);

export const Button = withStaticProperties(ButtonFrame, {
  Text: ButtonText,
});

export const Anchor: TamaguiComponent = styled(TamAnchor, {
  name: "Anchor",
  textDecorationLine: "none",
  ...baseButtonStyles,
  variants: buttonStyles,
} as const);
