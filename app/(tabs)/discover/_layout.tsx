import { Stack } from "expo-router";

import { UserHeaderButton } from "@/components/user-header-button";

// todo: account header right
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTitle: "Discover",
        unstable_headerRightItems: () => [{ type: "custom", element: <UserHeaderButton /> }],
      }}
    />
  );
}
