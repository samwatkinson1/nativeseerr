import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { SliderHeader } from "@/components/slider-header";
import { TitleCard } from "@/components/title-card";
import { MovieResult } from "@/http/gen";
import { getDiscoverMoviesOptions } from "@/http/gen/@tanstack/react-query.gen";

interface PopularMoviesItemsProps {
  items: MovieResult[];
}

function PopularMoviesItems({ items }: PopularMoviesItemsProps) {
  return (
    <ScrollView horizontal scrollIndicatorInsets={{ left: 16, right: 16 }}>
      {items.map((title, i) => {
        return (
          <TitleCard
            key={`popular-movies-${title.id}`}
            title={title}
            style={i === 0 ? styles.cardFirst : styles.card}
          />
        );
      })}
    </ScrollView>
  );
}

export function PopularMoviesSlider() {
  const query = useQuery({ ...getDiscoverMoviesOptions() });

  const data = use(query.promise);
  if (!data.results?.length) return null;

  return (
    <View style={styles.container}>
      {/* todo: /discover/movies */}
      <SliderHeader title="Popular Movies" />
      <PopularMoviesItems items={data.results} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  card: { marginRight: 16 },
  cardFirst: { marginHorizontal: 16 },
});
