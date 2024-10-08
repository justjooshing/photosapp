import { VariantDefinitions } from "@tamagui/web";
import {
  styled,
  Button as TamButton,
  Anchor as TamAnchor,
  ButtonText as TamButtonText,
  H1 as TamH1,
  H2 as TamH2,
  H3 as TamH3,
  Text as TamText,
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
      disabledStyle: {
        backgroundColor: "$google",
      },
      hoverStyle: {
        backgroundColor: "$googleHover",
      },
      pressStyle: {
        backgroundColor: "$googleActive",
      },
    },
  } as const,
  full: {
    true: {
      width: "100%",
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
    minWidth: 100,
    maxWidth: 300,
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledStyle: {
    cursor: "default",
    opacity: 0.6,
  },
} as const;

const ButtonText = styled(TamButtonText, {
  name: "ButtonText",
  color: "$color.white",
  disabledStyle: {
    cursor: "default",
  },
});

const ButtonFrame: TamaguiComponent = styled(TamButton, {
  name: "Button",
  ...baseButtonStyles,
  variants: buttonStyles,
} as const);

export const Button = withStaticProperties(ButtonFrame, {
  Text: ButtonText,
});

export const H1: TamaguiComponent = styled(TamH1, {
  name: "H1",
  color: "$color.grey7",
  paddingTop: "$space.large",
  paddingBottom: "$space.medium",
});

export const H2: TamaguiComponent = styled(TamH2, {
  name: "H2",
  color: "$color.grey7",
  fontSize: "$fontSize.3",
  paddingTop: "$space.large",
  paddingBottom: "$space.small",
});

export const H3: TamaguiComponent = styled(TamH3, {
  name: "H3",
  color: "$color.grey7",
  fontSize: "$fontSize.2",
  paddingTop: "$space.large",
  paddingBottom: "$space.small",
});

export const LegalText: TamaguiComponent = styled(TamText, {
  name: "LegalText",
  lineHeight: 24,
  paddingVertical: "$space.small",
});
