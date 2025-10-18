import { useQuery, useSuspenseQueries } from "@tanstack/react-query";
import { use } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { SliderHeader } from "@/components/slider-header";
import { TitleCard } from "@/components/title-card";
import {
  getDiscoverWatchlistOptions,
  getMovieByMovieIdOptions,
  getTvByTvIdOptions,
} from "@/http/gen/@tanstack/react-query.gen";

interface PlexWatchlistItem {
  tmdbId?: number;
  ratingKey?: string;
  type?: string;
  title?: string;
  mediaType?: "movie" | "tv";
}

interface PlexWatchlistItemsProps {
  items: PlexWatchlistItem[];
}

function PlexWatchlistItems({ items }: PlexWatchlistItemsProps) {
  const titles = useSuspenseQueries({
    queries: items.map((item) => {
      const id = item.tmdbId!; // fixme: remove non-null assertion
      return item.mediaType === "movie"
        ? getMovieByMovieIdOptions({ path: { movieId: id } })
        : getTvByTvIdOptions({ path: { tvId: id } });
    }),
    combine(queries) {
      return queries.map((item) => item.data);
    },
  });

  return (
    <ScrollView horizontal scrollIndicatorInsets={{ left: 16, right: 16 }}>
      {titles.map((title, i) => {
        return (
          <TitleCard
            key={`plex-watchlist-${title.id}`}
            title={title}
            style={i === 0 ? styles.cardFirst : styles.card}
          />
        );
      })}
    </ScrollView>
  );
}

// todo: check user watchlistSyncMovies/watchlistSyncTv
export function PlexWatchlistSlider() {
  const query = useQuery({ ...getDiscoverWatchlistOptions() });

  const data = use(query.promise);
  if (!data.results?.length) return null;

  return (
    <View style={styles.container}>
      {/* todo: /discover/watchlist */}
      <SliderHeader title="Your Watchlist" />
      <PlexWatchlistItems items={data.results} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  card: { marginRight: 16 },
  cardFirst: { marginHorizontal: 16 },
});
