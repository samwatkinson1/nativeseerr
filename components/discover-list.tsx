import { UseQueryResult } from "@tanstack/react-query";
import { ElementType, Fragment, use } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { PlexWatchlistSlider } from "@/components/plex-watchlist-slider";
import { RecentRequestsSlider } from "@/components/recent-requests-slider";
import { RecentlyAddedSlider } from "@/components/recently-added-slider";
import { DiscoverSliderType } from "@/const/discover";
import { GetSettingsDiscoverResponse } from "@/http/gen";

export interface DiscoverListProps {
  query: UseQueryResult<GetSettingsDiscoverResponse>;
}

export function DiscoverList({ query }: DiscoverListProps) {
  const data = use(query.promise);

  return (
    <ScrollView
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="always"
      contentContainerStyle={styles.container}
    >
      {data.map((item) => {
        const Item = sliders[item.type as DiscoverSliderType];
        return <Item key={DiscoverSliderType[item.type]} />;
      })}
    </ScrollView>
  );
}

const sliders: Record<DiscoverSliderType, ElementType> = {
  [DiscoverSliderType.RECENTLY_ADDED]: RecentlyAddedSlider,
  [DiscoverSliderType.RECENT_REQUESTS]: RecentRequestsSlider,
  [DiscoverSliderType.PLEX_WATCHLIST]: PlexWatchlistSlider,
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
  container: { gap: 8, paddingBottom: 16 },
});
