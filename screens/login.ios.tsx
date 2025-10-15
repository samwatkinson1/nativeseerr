import { router } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Button title="/discover" onPress={() => router.replace("/discover")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
