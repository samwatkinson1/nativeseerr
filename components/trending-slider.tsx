import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { SliderHeader } from "@/components/slider-header";
import { TitleCard } from "@/components/title-card";
import { MovieResult, PersonResult, TvResult } from "@/http/gen";
import { getDiscoverTrendingOptions } from "@/http/gen/@tanstack/react-query.gen";

function isPersonResult(x: MovieResult | TvResult | PersonResult): x is PersonResult {
  return x.mediaType === "person";
}

interface TrendingItemsProps {
  items: (MovieResult | TvResult | PersonResult)[];
}

// todo: handle person cards
function TrendingItems({ items }: TrendingItemsProps) {
  return (
    <ScrollView horizontal scrollIndicatorInsets={{ left: 16, right: 16 }}>
      {items
        .filter((item) => !isPersonResult(item))
        .map((title, i) => {
          return (
            <TitleCard
              key={`trending-${title.id}`}
              title={title as MovieResult | TvResult}
              style={i === 0 ? styles.cardFirst : styles.card}
            />
          );
        })}
    </ScrollView>
  );
}

export function TrendingSlider() {
  const query = useQuery({ ...getDiscoverTrendingOptions() });

  const data = use(query.promise);
  if (!data.results?.length) return null;

  return (
    <View style={styles.container}>
      {/* todo: /discover/trending */}
      <SliderHeader title="Trending" />
      <TrendingItems items={data.results} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  card: { marginRight: 16 },
  cardFirst: { marginHorizontal: 16 },
});
