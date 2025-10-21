import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { SliderHeader } from "@/components/slider-header";
import { TitleCard } from "@/components/title-card";
import { MovieResult } from "@/http/gen";
import { getDiscoverMoviesUpcomingOptions } from "@/http/gen/@tanstack/react-query.gen";

interface UpcomingMoviesItemsProps {
  items: MovieResult[];
}

function UpcomingMoviesItems({ items }: UpcomingMoviesItemsProps) {
  return (
    <ScrollView horizontal scrollIndicatorInsets={{ left: 16, right: 16 }}>
      {items.map((title, i) => {
        return (
          <TitleCard
            key={`upcoming-movies-${title.id}`}
            title={title}
            style={i === 0 ? styles.cardFirst : styles.card}
          />
        );
      })}
    </ScrollView>
  );
}

export function UpcomingMoviesSlider() {
  const query = useQuery({ ...getDiscoverMoviesUpcomingOptions() });

  const data = use(query.promise);
  if (!data.results?.length) return null;

  const now = new Date();
  const offset = now.getTimezoneOffset();
  const upcomingDate = new Date(now.getTime() - offset * 60 * 1000).toISOString().split("T")[0];

  return (
    <View style={styles.container}>
      <SliderHeader
        href={{ pathname: "/movies", params: { primaryReleaseDateGte: upcomingDate } }}
        title="Upcoming Movies"
      />
      <UpcomingMoviesItems items={data.results} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  card: { marginRight: 16 },
  cardFirst: { marginHorizontal: 16 },
});
