import { ActivityIndicator, StyleSheet, View } from "react-native";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
