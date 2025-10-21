import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { GenreCard } from "@/components/genre-card";
import { SliderHeader } from "@/components/slider-header";
import { getDiscoverGenresliderMovieOptions } from "@/http/gen/@tanstack/react-query.gen";

interface MovieGenreItem {
  id: number;
  backdrops: string[];
  name: string;
}

interface MovieGenreItemsProps {
  items: MovieGenreItem[];
}

function MovieGenreItems({ items }: MovieGenreItemsProps) {
  return (
    <ScrollView horizontal scrollIndicatorInsets={{ left: 16, right: 16 }}>
      {items.map((genre, i) => {
        return (
          <GenreCard
            key={`movie-genre-${genre.id}`}
            genre={genre}
            style={i === 0 ? styles.cardFirst : styles.card}
          />
        );
      })}
    </ScrollView>
  );
}

export function MovieGenreSlider() {
  const query = useQuery({ ...getDiscoverGenresliderMovieOptions() });

  const data = use(query.promise);
  if (!data.length) return null;

  return (
    <View style={styles.container}>
      {/* todo: /discover/movies/genres */}
      <SliderHeader title="Movie Genres" />
      {/* fixme */}
      <MovieGenreItems items={data as MovieGenreItem[]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  card: { marginRight: 16 },
  cardFirst: { marginHorizontal: 16 },
});
