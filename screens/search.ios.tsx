import { ContentUnavailableView, Host } from "@expo/ui/swift-ui";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function SearchScreen() {
  const { query } = useLocalSearchParams<{ query: string }>();

  if (!query) return null;

  return (
    <Host style={styles.container}>
      <ContentUnavailableView
        systemImage="magnifyingglass"
        title={`No Results for "${query}"`}
        description="Check the spelling and try again."
      />
    </Host>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
