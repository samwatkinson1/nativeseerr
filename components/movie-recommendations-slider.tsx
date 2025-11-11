import { useTheme } from "@react-navigation/core";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { TitleCard } from "@/components/title-card";
import { getMovieByMovieIdRecommendationsOptions } from "@/http/gen/@tanstack/react-query.gen";

export interface MovieRecommendationsSliderProps {
  id: number;
}

export function MovieRecommendationsSlider({ id }: MovieRecommendationsSliderProps) {
  const { colors, fonts } = useTheme();

  const query = useQuery({ ...getMovieByMovieIdRecommendationsOptions({ path: { movieId: id } }) });

  const data = use(query.promise);
  if (!data.results?.length) return null;

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <Text style={{ ...styles.title2, ...fonts.heavy, paddingLeft: 16, color: colors.text }}>
        Recommendations
      </Text>
      <ScrollView horizontal scrollIndicatorInsets={{ left: 16, right: 16 }}>
        {data.results.map((title, i) => {
          return (
            <TitleCard
              key={`movie-recommendations-${title.id}`}
              title={title}
              style={i === 0 ? styles.cardFirst : styles.card}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  title2: { fontSize: 22, lineHeight: 28 },
  card: { marginRight: 16 },
  cardFirst: { marginHorizontal: 16 },
});
