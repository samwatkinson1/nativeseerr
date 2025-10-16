import { useTheme } from "@react-navigation/core";
import { Stack } from "expo-router";

export default function LoginLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.card },
        headerLargeTitle: true,
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="local" options={{ title: "Login with Seerr" }} />
      <Stack.Screen
        name="jellyfin"
        options={{ title: "Login with Jellyfin" }}
      />
    </Stack>
  );
}
