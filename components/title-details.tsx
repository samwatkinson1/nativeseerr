import { useTheme } from "@react-navigation/core";
import { useHeaderHeight } from "@react-navigation/elements";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from "react-native-reanimated";

import { TitleDetailsHeader } from "@/components/title-details-header";
import { MovieDetails, TvDetails } from "@/http/gen";
import { rgbToRgba } from "@/utils/rgb-to-rgba";

export interface TitleDetailsProps {
  title: MovieDetails & TvDetails;
  mediaType: "movie" | "tv";
}

export const TitleDetails: FC<TitleDetailsProps> = ({ title, mediaType }) => {
  const header = useHeaderHeight();
  const { colors } = useTheme();

  const ref = useAnimatedRef<Animated.ScrollView>();
  const offset = useScrollOffset(ref);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(offset.value, [0, styles.background.height / 1.5], [0, 1]) };
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerBackground: () => (
            <Animated.View
              style={[{ height: header, backgroundColor: colors.background }, headerAnimatedStyle]}
            />
          ),
        }}
      />

      <View style={styles.container}>
        <ImageBackground
          source={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${title.backdropPath}`}
          contentFit="cover"
          style={styles.background}
        >
          <LinearGradient
            colors={[rgbToRgba(colors.card, 0), rgbToRgba(colors.background, 100)]}
            style={styles.background}
          />
        </ImageBackground>

        <Animated.ScrollView ref={ref} scrollEventThrottle={16}>
          <TitleDetailsHeader title={title} mediaType={mediaType} />
          <View style={{ height: 200, backgroundColor: colors.background }} />
        </Animated.ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: "absolute", inset: 0, height: 493, alignItems: "center" },
});
