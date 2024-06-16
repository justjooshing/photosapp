const TamaguiTextComponents = ["Button.Text", "LegalText", "H1", "H2", "H3"];

module.exports = {
  root: true,
  plugins: ["react", "react-native"],
  extends: ["universe/native"],
  rules: {
    "react-native/no-raw-text": [
      "error",
      {
        skip: TamaguiTextComponents,
      },
    ],
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "react-native/no-single-element-style-arrays": 2,
  },
  ignorePatterns: ["/dist/**", "/node_modules/**", "android/**", ".expo/**"],
  settings: {
    "react-native/text-component-names": ["Text", "Button.Text"],
  },
};
