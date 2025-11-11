import { useTheme } from "@react-navigation/core";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { CastCard } from "@/components/cast-card";
import { Cast } from "@/http/gen";

export interface MovieCastSliderProps {
  cast: Cast[];
}

export function MovieCastSlider({ cast }: MovieCastSliderProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <Text style={{ ...styles.title2, ...fonts.heavy, paddingLeft: 16, color: colors.text }}>
        Cast
      </Text>
      <ScrollView horizontal scrollIndicatorInsets={{ left: 16, right: 16 }}>
        {cast.map((item, i) => {
          return (
            <CastCard
              key={`movie-cast-${item.id}`}
              cast={item}
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
