import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { router } from "expo-router";

import { useSignOut } from "@/hooks/use-sign-out";

interface UseTitleHeaderItemsProps {
  items: { label: string; value: string }[];
  sort: string;
  sortDirection: "asc" | "desc";
}

type UseTitleHeaderItemsReturn = Pick<
  NativeStackNavigationOptions,
  "unstable_headerLeftItems" | "unstable_headerRightItems"
>;

export const useTitleHeaderItems = ({
  items,
  sort,
  sortDirection,
}: UseTitleHeaderItemsProps): UseTitleHeaderItemsReturn => {
  const signOut = useSignOut();

  return {
    unstable_headerLeftItems: ({ canGoBack }) => {
      if (canGoBack) return [];
      return [
        {
          type: "menu",
          label: "",
          icon: { type: "sfSymbol", name: "line.3.horizontal.decrease" },
          menu: {
            items: [
              {
                type: "submenu",
                label: "Sort by",
                icon: { type: "sfSymbol", name: "arrow.up.arrow.down" },
                items: items.map(({ label, value }) => ({
                  type: "action",
                  label: label,
                  state: sort === value ? "on" : "off",
                  onPress: () => router.setParams({ sort: value }),
                })),
              },
              {
                type: "action",
                label: "Ascending",
                icon: { type: "sfSymbol", name: "arrowtriangle.up" },
                state: sortDirection === "asc" ? "on" : "off",
                onPress: () => router.setParams({ sortDirection: "asc" }),
              },
              {
                type: "action",
                label: "Descending",
                icon: { type: "sfSymbol", name: "arrowtriangle.down" },
                state: sortDirection === "desc" ? "on" : "off",
                onPress: () => router.setParams({ sortDirection: "desc" }),
              },
            ],
          },
        },
        {
          type: "button",
          label: "",
          icon: { type: "sfSymbol", name: "slider.vertical.3" },
          onPress: () => router.navigate("./filters", { relativeToDirectory: true }),
        },
      ];
    },
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
  };
};
