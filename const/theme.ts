import {
  DarkTheme as RNDarkTheme,
  DefaultTheme as RNDefaultTheme,
} from "@react-navigation/native";

export const DarkTheme = {
  ...RNDarkTheme,
  colors: { ...RNDarkTheme.colors, card: "rgb(28, 28, 30)" },
};

export const DefaultTheme = {
  ...RNDefaultTheme,
  colors: { ...RNDefaultTheme.colors, card: "rgb(242, 242, 247)" },
};
