import { GlassView, GlassViewProps } from "expo-glass-effect";
import { StyleSheet, Text, TextProps } from "react-native";

export interface PillProps {
  title: string;
  contentContainerStyle?: GlassViewProps["style"];
  style?: TextProps["style"];
}

export function Pill({ title, contentContainerStyle, style }: PillProps) {
  return (
    <GlassView
      glassEffectStyle="clear"
      style={StyleSheet.compose(styles.container, contentContainerStyle)}
    >
      <Text style={style}>{title}</Text>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 6, paddingVertical: 4, borderRadius: 999 },
});
