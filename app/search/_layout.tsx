import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerSearchBarOptions: {
          placeholder: "Search Movies & TV",
          hideNavigationBar: false,
        },
        headerTitle: "Search",
        headerTransparent: true,
      }}
    />
  );
}
