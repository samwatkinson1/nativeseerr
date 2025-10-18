import { useQuery, useSuspenseQueries } from "@tanstack/react-query";
import { use } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { SliderHeader } from "@/components/slider-header";
import { TitleCard } from "@/components/title-card";
import { MediaInfo } from "@/http/gen";
import {
  getMediaOptions,
  getMovieByMovieIdOptions,
  getTvByTvIdOptions,
} from "@/http/gen/@tanstack/react-query.gen";

interface RecentlyAddedItemsProps {
  items: MediaInfo[];
}

function RecentlyAddedItems({ items }: RecentlyAddedItemsProps) {
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
            key={`recently-added-${title.id}`}
            title={title}
            style={i === 0 ? styles.cardFirst : styles.card}
          />
        );
      })}
    </ScrollView>
  );
}

export function RecentlyAddedSlider() {
  const query = useQuery({
    ...getMediaOptions({
      query: { filter: "allavailable", take: 20, sort: "mediaAdded" },
    }),
  });

  const data = use(query.promise);
  if (!data.results) return null;

  return (
    <View style={styles.container}>
      <SliderHeader title="Recently Added" />
      <RecentlyAddedItems items={data.results} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  card: { marginRight: 16 },
  cardFirst: { marginHorizontal: 16 },
});
