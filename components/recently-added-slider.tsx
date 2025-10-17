import { LegendList } from "@legendapp/list";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { StyleSheet, View } from "react-native";

import { SliderHeader } from "@/components/slider-header";
import { TitleCard } from "@/components/title-card";
import { getMediaOptions } from "@/http/gen/@tanstack/react-query.gen";

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
      <LegendList
        data={data.results}
        horizontal
        contentContainerStyle={styles.content}
        scrollIndicatorInsets={{ right: 16 }}
        // fixme: remove non-null assertion
        keyExtractor={(item) => `recently-added-${item.id!}`}
        renderItem={({ item }) => <TitleCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16 },
  content: { gap: 16 },
});
