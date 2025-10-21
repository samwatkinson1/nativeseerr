import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { GenreCard } from "@/components/genre-card";
import { SliderHeader } from "@/components/slider-header";
import { getDiscoverGenresliderTvOptions } from "@/http/gen/@tanstack/react-query.gen";

interface TvGenreItem {
  id: number;
  backdrops: string[];
  name: string;
}

interface TvGenreItemsProps {
  items: TvGenreItem[];
}

function TvGenreItems({ items }: TvGenreItemsProps) {
  return (
    <ScrollView horizontal scrollIndicatorInsets={{ left: 16, right: 16 }}>
      {items.map((genre, i) => {
        return (
          <GenreCard
            key={`tv-genre-${genre.id}`}
            genre={genre}
            style={i === 0 ? styles.cardFirst : styles.card}
          />
        );
      })}
    </ScrollView>
  );
}

export function TvGenreSlider() {
  const query = useQuery({ ...getDiscoverGenresliderTvOptions() });

  const data = use(query.promise);
  if (!data.length) return null;

  return (
    <View style={styles.container}>
      {/* todo: /discover/series/genres */}
      <SliderHeader title="Series Genres" />
      {/* fixme */}
      <TvGenreItems items={data as TvGenreItem[]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  card: { marginRight: 16 },
  cardFirst: { marginHorizontal: 16 },
});
