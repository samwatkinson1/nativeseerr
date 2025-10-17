import { useTheme } from "@react-navigation/core";
import { StyleSheet, Text, View } from "react-native";

export default function RequestsScreen() {
  const { colors, fonts } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text, ...fonts.regular, ...styles.body }}>/requests</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  body: { fontSize: 17, lineHeight: 22 },
});
