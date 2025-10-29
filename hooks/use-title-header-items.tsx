import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { router } from "expo-router";

import { UserHeaderButton } from "@/components/user-header-button";

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
      ];
    },
    unstable_headerRightItems: () => {
      return [{ type: "custom", element: <UserHeaderButton /> }];
    },
  };
};
