import { Host, Text } from "@expo/ui/swift-ui";

export default function MoviesScreen() {
  return (
    <Host style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text color="black">/movies</Text>
    </Host>
  );
}
