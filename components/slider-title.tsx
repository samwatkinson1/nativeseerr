import { useTheme } from "@react-navigation/core";
import { Text } from "react-native";

export interface SliderTitleProps {
  title: string;
}

export function SliderTitle({ title }: SliderTitleProps) {
  const { colors, fonts } = useTheme();
  return (
    <Text style={{ color: colors.text, ...fonts.bold, fontSize: 28, lineHeight: 34 }}>{title}</Text>
  );
}
