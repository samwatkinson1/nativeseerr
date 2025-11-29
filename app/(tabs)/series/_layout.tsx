import { Stack, useGlobalSearchParams } from "expo-router";

import { formSheet } from "@/const/stack";
import { useTitleHeaderItems } from "@/hooks/use-title-header-items";

export type SeriesParams = {
  sort: "popularity" | "first_air_date" | "vote_average" | "original_title";
  sortDirection: "asc" | "desc";
};

const sorts: { label: string; value: SeriesParams["sort"] }[] = [
  { label: "Popularity", value: "popularity" },
  { label: "First Air Date", value: "first_air_date" },
  { label: "TMDB Rating", value: "vote_average" },
  { label: "Title", value: "original_title" },
];

export default function Layout() {
  const { sort = "popularity", sortDirection = "desc" } = useGlobalSearchParams<SeriesParams>();

  const headerItems = useTitleHeaderItems({ items: sorts, sort, sortDirection });

  return (
    <Stack screenOptions={{ headerTransparent: true, headerTitle: "" }}>
      <Stack.Screen name="index" initialParams={{ sort, sortDirection }} options={headerItems} />
      <Stack.Screen name="[id]" options={{ headerBackButtonMenuEnabled: false }} />
      <Stack.Screen name="filters" options={formSheet} />
    </Stack>
  );
}
