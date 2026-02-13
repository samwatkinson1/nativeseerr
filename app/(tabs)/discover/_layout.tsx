import { Stack } from "expo-router";

import { useSignOut } from "@/hooks/use-sign-out";

export default function Layout() {
  const signOut = useSignOut();

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTitle: "Discover",
        unstable_headerRightItems: () => [
          {
            type: "menu",
            label: "",
            icon: { type: "sfSymbol", name: "person.crop.circle" },
            menu: {
              items: [
                {
                  type: "action",
                  label: "Sign out",
                  destructive: true,
                  icon: { type: "sfSymbol", name: "rectangle.portrait.and.arrow.right" },
                  onPress: () => signOut.mutate(),
                },
              ],
            },
          },
        ],
      }}
    />
  );
}
