import { ContentUnavailableView, Host } from "@expo/ui/swift-ui";
import { useLocalSearchParams } from "expo-router";

export default function SearchScreen() {
  const { query } = useLocalSearchParams<{ query: string }>();

  if (!query) return null;

  return (
    <Host style={{ flex: 1 }}>
      <ContentUnavailableView
        systemImage="magnifyingglass"
        title={`No Results for "${query}"`}
        description="Check the spelling and try again."
      />
    </Host>
  );
}
