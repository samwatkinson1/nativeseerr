import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { SliderHeader } from "@/components/slider-header";
import { TitleCard } from "@/components/title-card";
import { TvResult } from "@/http/gen";
import { getDiscoverTvOptions } from "@/http/gen/@tanstack/react-query.gen";

interface PopularTvItemsProps {
  items: TvResult[];
}

function PopularTvItems({ items }: PopularTvItemsProps) {
  return (
    <ScrollView horizontal scrollIndicatorInsets={{ left: 16, right: 16 }}>
      {items.map((title, i) => {
        return (
          <TitleCard
            key={`popular-tv-${title.id}`}
            title={title}
            style={i === 0 ? styles.cardFirst : styles.card}
          />
        );
      })}
    </ScrollView>
  );
}

export function PopularTvSlider() {
  const query = useQuery({ ...getDiscoverTvOptions() });

  const data = use(query.promise);
  if (!data.results?.length) return null;

  return (
    <View style={styles.container}>
      {/* todo: /discover/series */}
      <SliderHeader title="Popular Series" />
      <PopularTvItems items={data.results} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  card: { marginRight: 16 },
  cardFirst: { marginHorizontal: 16 },
});
