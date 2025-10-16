import { LegendList } from "@legendapp/list";
import { UseQueryResult } from "@tanstack/react-query";
import { createElement, ElementType, Fragment, use } from "react";
import { StyleSheet } from "react-native";

import { RecentlyAddedSlider } from "@/components/recently-added-slider";
import { DiscoverSliderType } from "@/const/discover";
import { GetSettingsDiscoverResponse } from "@/http/gen";

export interface DiscoverListProps {
  query: UseQueryResult<GetSettingsDiscoverResponse>;
}

export function DiscoverList({ query }: DiscoverListProps) {
  const data = use(query.promise);

  return (
    <LegendList
      data={data}
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="always"
      recycleItems
      contentContainerStyle={styles.container}
      keyExtractor={(item) => DiscoverSliderType[item.type]}
      renderItem={({ item }) => {
        return createElement(sliders[item.type as DiscoverSliderType]);
      }}
    />
  );
}

const sliders: Record<DiscoverSliderType, ElementType> = {
  [DiscoverSliderType.RECENTLY_ADDED]: RecentlyAddedSlider,
  [DiscoverSliderType.RECENT_REQUESTS]: Fragment,
  [DiscoverSliderType.PLEX_WATCHLIST]: Fragment,
  [DiscoverSliderType.TRENDING]: Fragment,
  [DiscoverSliderType.POPULAR_MOVIES]: Fragment,
  [DiscoverSliderType.MOVIE_GENRES]: Fragment,
  [DiscoverSliderType.UPCOMING_MOVIES]: Fragment,
  [DiscoverSliderType.STUDIOS]: Fragment,
  [DiscoverSliderType.POPULAR_TV]: Fragment,
  [DiscoverSliderType.TV_GENRES]: Fragment,
  [DiscoverSliderType.UPCOMING_TV]: Fragment,
  [DiscoverSliderType.NETWORKS]: Fragment,
  [DiscoverSliderType.TMDB_MOVIE_KEYWORD]: Fragment,
  [DiscoverSliderType.TMDB_MOVIE_GENRE]: Fragment,
  [DiscoverSliderType.TMDB_TV_KEYWORD]: Fragment,
  [DiscoverSliderType.TMDB_TV_GENRE]: Fragment,
  [DiscoverSliderType.TMDB_SEARCH]: Fragment,
  [DiscoverSliderType.TMDB_STUDIO]: Fragment,
  [DiscoverSliderType.TMDB_NETWORK]: Fragment,
  [DiscoverSliderType.TMDB_MOVIE_STREAMING_SERVICES]: Fragment,
  [DiscoverSliderType.TMDB_TV_STREAMING_SERVICES]: Fragment,
};

const styles = StyleSheet.create({
  container: { gap: 8, paddingHorizontal: 16, paddingBottom: 16 },
});
