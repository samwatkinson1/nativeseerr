import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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
      <ScrollView
        horizontal
        contentContainerStyle={styles.content}
        scrollIndicatorInsets={{ right: 16 }}
      >
        {data.results.map((item) => {
          // fixme: remove non-null assertion
          return <TitleCard key={`recently-added-${item.id!}`} item={item} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16 },
  content: { gap: 16 },
});
