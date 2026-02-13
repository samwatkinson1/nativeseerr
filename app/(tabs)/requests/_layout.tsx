import { router, Stack, useGlobalSearchParams } from "expo-router";

import { useSignOut } from "@/hooks/use-sign-out";

export type RequestsParams = {
  filter:
    | "all"
    | "approved"
    | "available"
    | "pending"
    | "processing"
    | "unavailable"
    | "failed"
    | "deleted"
    | "completed";
  mediaType: "movie" | "tv" | "all";
  sort: "added" | "modified";
  sortDirection: "asc" | "desc";
};

const mediaTypes: { label: string; value: RequestsParams["mediaType"] }[] = [
  { label: "All", value: "all" },
  { label: "Movies", value: "movie" },
  { label: "Series", value: "tv" },
];

const filters: { label: string; value: RequestsParams["filter"] }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Completed", value: "completed" },
  { label: "Processing", value: "processing" },
  { label: "Failed", value: "failed" },
  { label: "Available", value: "available" },
  { label: "Unavailable", value: "unavailable" },
  { label: "Deleted", value: "deleted" },
];

const sorts: { label: string; value: RequestsParams["sort"] }[] = [
  { label: "Most Recent", value: "added" },
  { label: "Last Modified", value: "modified" },
];

export default function Layout() {
  const {
    filter = "all",
    mediaType = "all",
    sort = "added",
    sortDirection = "desc",
  } = useGlobalSearchParams<RequestsParams>();

  const signOut = useSignOut();

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        unstable_headerLeftItems: () => [
          {
            type: "menu",
            label: "",
            icon: { type: "sfSymbol", name: "line.3.horizontal.decrease" },
            menu: {
              items: [
                {
                  type: "submenu",
                  label: "Media Type",
                  icon: { type: "sfSymbol", name: "list.and.film" },
                  items: mediaTypes.map(({ label, value }) => ({
                    type: "action",
                    label: label,
                    state: mediaType === value ? "on" : "off",
                    onPress: () => router.setParams({ mediaType: value }),
                  })),
                },
                {
                  type: "submenu",
                  label: "Filter",
                  icon: { type: "sfSymbol", name: "slider.vertical.3" },
                  items: filters.map(({ label, value }) => ({
                    type: "action",
                    label: label,
                    state: filter === value ? "on" : "off",
                    onPress: () => router.setParams({ filter: value }),
                  })),
                },
                {
                  type: "submenu",
                  label: "Sort by",
                  icon: { type: "sfSymbol", name: "arrow.up.arrow.down" },
                  items: sorts.map(({ label, value }) => ({
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
        ],
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
    >
      <Stack.Screen
        name="index"
        initialParams={{ filter, mediaType, sort, sortDirection }}
        options={{ headerTitle: "Requests" }}
      />
    </Stack>
  );
}
