import { useTheme } from "@react-navigation/core";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function MovieIDScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
