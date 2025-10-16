import { StyleSheet, Text, TextProps } from "react-native";

export interface PillProps {
  title: string;
  style?: TextProps["style"];
}

export function Pill({ title, style }: PillProps) {
  return (
    <Text style={StyleSheet.compose(styles.container, style)}>{title}</Text>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 4, paddingVertical: 2, borderRadius: 999 },
});
