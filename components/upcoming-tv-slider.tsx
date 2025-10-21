import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { SliderHeader } from "@/components/slider-header";
import { TitleCard } from "@/components/title-card";
import { TvResult } from "@/http/gen";
import { getDiscoverTvUpcomingOptions } from "@/http/gen/@tanstack/react-query.gen";

interface UpcomingTvItemsProps {
  items: TvResult[];
}

function UpcomingTvItems({ items }: UpcomingTvItemsProps) {
  return (
    <ScrollView horizontal scrollIndicatorInsets={{ left: 16, right: 16 }}>
      {items.map((title, i) => {
        return (
          <TitleCard
            key={`upcoming-tv-${title.id}`}
            title={title}
            style={i === 0 ? styles.cardFirst : styles.card}
          />
        );
      })}
    </ScrollView>
  );
}

export function UpcomingTvSlider() {
  const query = useQuery({ ...getDiscoverTvUpcomingOptions() });

  const data = use(query.promise);
  if (!data.results?.length) return null;

  const now = new Date();
  const offset = now.getTimezoneOffset();
  const upcomingDate = new Date(now.getTime() - offset * 60 * 1000).toISOString().split("T")[0];

  return (
    <View style={styles.container}>
      <SliderHeader
        href={{ pathname: "/series", params: { primaryReleaseDateGte: upcomingDate } }}
        title="Upcoming Series"
      />
      <UpcomingTvItems items={data.results} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  card: { marginRight: 16 },
  cardFirst: { marginHorizontal: 16 },
});
