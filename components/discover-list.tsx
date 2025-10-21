import { UseQueryResult } from "@tanstack/react-query";
import { ElementType, Fragment, use } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { MovieGenreSlider } from "@/components/movie-genre-slider";
import { PlexWatchlistSlider } from "@/components/plex-watchlist-slider";
import { PopularMoviesSlider } from "@/components/popular-movies-slider";
import { RecentRequestsSlider } from "@/components/recent-requests-slider";
import { RecentlyAddedSlider } from "@/components/recently-added-slider";
import { TrendingSlider } from "@/components/trending-slider";
import { UpcomingMoviesSlider } from "@/components/upcoming-movies-slider";
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
  [DiscoverSliderType.TRENDING]: TrendingSlider,
  [DiscoverSliderType.POPULAR_MOVIES]: PopularMoviesSlider,
  [DiscoverSliderType.MOVIE_GENRES]: MovieGenreSlider,
  [DiscoverSliderType.UPCOMING_MOVIES]: UpcomingMoviesSlider,
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
  container: { gap: 8, paddingBottom: 32 },
});
