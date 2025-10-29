import { Stack, useGlobalSearchParams } from "expo-router";

import { useTitleHeaderItems } from "@/hooks/use-title-header-items";

export type MoviesParams = {
  sort: "popularity" | "release_date" | "vote_average" | "original_title";
  sortDirection: "asc" | "desc";
};

const sorts: { label: string; value: MoviesParams["sort"] }[] = [
  { label: "Popularity", value: "popularity" },
  { label: "Release Date", value: "release_date" },
  { label: "TMDB Rating", value: "vote_average" },
  { label: "Title", value: "original_title" },
];

export default function Layout() {
  const { sort = "popularity", sortDirection = "desc" } = useGlobalSearchParams<MoviesParams>();

  const headerItems = useTitleHeaderItems({ items: sorts, sort, sortDirection });

  return (
    <Stack
      screenOptions={{
        headerBackVisible: true,
        headerTransparent: true,
        headerTitle: "",
        ...headerItems,
      }}
    >
      <Stack.Screen name="index" initialParams={{ sort, sortDirection }} />
    </Stack>
  );
}
