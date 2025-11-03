import {
  Button,
  Host,
  HStack,
  Image as SwiftImage,
  Text as SwiftText,
  VStack,
} from "@expo/ui/swift-ui";
import { ignoreSafeArea, padding } from "@expo/ui/swift-ui/modifiers";
import { LegendList } from "@legendapp/list";
import { useTheme } from "@react-navigation/core";
import { useHeaderHeight } from "@react-navigation/elements";
import { UseQueryResult } from "@tanstack/react-query";
import { format } from "date-fns";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Stack, useIsPreview } from "expo-router";
import { FC, use } from "react";
import { PlatformColor, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from "react-native-reanimated";

import { Tag } from "@/components/tag";
import { MovieDetails as _MovieDetails } from "@/http/gen";
import { rgbToRgba } from "@/utils/rgb-to-rgba";
import { sortCrewPriority } from "@/utils/sort-crew-priority";

export interface MovieDetailsProps {
  query: UseQueryResult<_MovieDetails>;
}

export const MovieDetails: FC<MovieDetailsProps> = ({ query }) => {
  const header = useHeaderHeight();
  const isPreview = useIsPreview();
  const { colors, dark, fonts } = useTheme();

  const ref = useAnimatedRef<Animated.ScrollView>();
  const offset = useScrollOffset(ref);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(offset.value, [0, styles.background.height / 1.5], [0, 1]) };
  });

  const title = use(query.promise);

  // todo: https://github.com/seerr-team/seerr/blob/main/src/components/MovieDetails/index.tsx#L232-L236
  const discoverRegion = "US";

  const contentRating = title.releases?.results
    ?.find(({ iso_3166_1 }) => iso_3166_1 === discoverRegion)
    ?.release_dates?.find(({ certification }) => certification)?.certification;

  const crew = sortCrewPriority(title.credits?.crew).slice(0, 6);

  return (
    <>
      {!isPreview && (
        <Stack.Screen
          options={{
            headerBackground: () => (
              <Animated.View
                style={[
                  { height: header, backgroundColor: colors.background },
                  headerAnimatedStyle,
                ]}
              />
            ),
          }}
        />
      )}

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

        <Animated.ScrollView
          ref={ref}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: header }}
        >
          <LinearGradient
            colors={[rgbToRgba(colors.card, 0), rgbToRgba(colors.background, 100)]}
            style={{ ...styles.header, marginTop: header }}
          >
            <Image
              source={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${title.posterPath}`}
              style={styles.poster}
            />

            <View style={{ gap: 4 }}>
              <Text style={{ ...styles.title, ...fonts.heavy, color: colors.text }}>
                {title.title} {title.releaseDate ? `(${format(title.releaseDate, "yyyy")})` : ""}
              </Text>

              <View style={styles.attributes}>
                <View style={{ ...styles.border, ...styles.rating, borderColor: colors.text }}>
                  <Text style={{ ...styles.footnote, ...fonts.medium, color: colors.text }}>
                    {contentRating}
                  </Text>
                </View>
                <View style={{ ...styles.divider, ...styles.border, borderColor: colors.text }} />
                <Text style={{ ...styles.footnote, ...fonts.medium, color: colors.text }}>
                  {`${title.runtime} minutes`}
                </Text>
                <View style={{ ...styles.divider, ...styles.border, borderColor: colors.text }} />
                {title.genres && title.genres.length > 0 && (
                  <Text style={{ ...styles.footnote, ...fonts.medium, color: colors.text }}>
                    {title.genres
                      .slice(0, 3)
                      .map((item) => item.name)
                      .join(", ")}
                  </Text>
                )}
              </View>
            </View>

            <Host matchContents style={{ minWidth: "100%" }}>
              <VStack spacing={8} alignment="center" modifiers={[ignoreSafeArea()]}>
                <HStack spacing={8} alignment="center">
                  <Button variant="glass">
                    <SwiftImage
                      systemName="eye.slash"
                      size={16}
                      modifiers={[padding({ all: 6 })]}
                    />
                  </Button>

                  <Button variant="glass">
                    <SwiftImage
                      systemName="star"
                      size={16}
                      color="gold"
                      modifiers={[padding({ all: 6 })]}
                    />
                  </Button>

                  <Button variant="glass">
                    <HStack spacing={8} modifiers={[padding({ all: 4 })]}>
                      <SwiftImage systemName="film" size={16} />
                      <SwiftText>Watch Trailer</SwiftText>
                    </HStack>
                  </Button>
                </HStack>

                <Button variant="glassProminent">
                  <HStack spacing={8} modifiers={[padding({ all: 4 })]}>
                    <SwiftImage systemName="arrow.down.to.line.compact" size={16} />
                    <SwiftText>Request</SwiftText>
                  </HStack>
                </Button>
              </VStack>
            </Host>
          </LinearGradient>

          <View style={{ ...styles.overview, backgroundColor: colors.background }}>
            <Text style={{ ...styles.title2, ...styles.tagline }}>{title.tagline}</Text>

            <View style={{ gap: 8 }}>
              <Text style={{ ...styles.title2, ...fonts.heavy, color: colors.text }}>Overview</Text>
              <Text style={{ ...styles.body, ...fonts.regular, color: colors.text }}>
                {title.overview}
              </Text>
            </View>

            {crew.length > 0 && (
              <View>
                <LegendList
                  data={crew}
                  extraData={{ dark }}
                  numColumns={2}
                  keyExtractor={(item) => `${item.creditId}`}
                  renderItem={({ item }) => (
                    <View style={{ paddingBottom: 24 }}>
                      <Text style={{ ...styles.body, ...fonts.heavy, color: colors.text }}>
                        {item.job}
                      </Text>
                      <Text style={{ ...styles.body, ...fonts.regular, color: colors.text }}>
                        {item.name}
                      </Text>
                    </View>
                  )}
                />

                {/* todo: crew sheet */}
                <Link
                  href="/"
                  style={{ ...styles.callout, ...fonts.regular, color: colors.primary }}
                >
                  View full crew
                </Link>
              </View>
            )}

            {/* todo: keywords link */}
            {title.keywords && title.keywords.length > 0 && (
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {title.keywords.map((keyword) => (
                  <Link key={`${keyword.id}-${keyword.name}`} href="/" asChild>
                    <Tag>{keyword.name}</Tag>
                  </Link>
                ))}
              </View>
            )}

            {/* todo: media facts */}
            <View>
              <View style={{ borderBottomWidth: 1, borderColor: colors.border }}>
                <View style={styles.mediaFact}>
                  <Text style={{ ...styles.body, ...fonts.bold, color: colors.text }}>Status</Text>
                  <Text
                    style={{
                      ...styles.body,
                      ...fonts.regular,
                      color: PlatformColor("secondaryLabel"),
                    }}
                  >
                    {title.status}
                  </Text>
                </View>
              </View>
            </View>

            {/* todo: sliders */}
          </View>
        </Animated.ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: "absolute", inset: 0, height: 493, alignItems: "center" },
  header: { flex: 1, paddingHorizontal: 16, paddingBottom: 16, alignItems: "center", gap: 16 },
  poster: { width: 128, height: 192, borderRadius: 6 },
  attributes: { gap: 6, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  border: { borderWidth: StyleSheet.hairlineWidth, borderStyle: "solid" },
  rating: { borderRadius: 4, borderWidth: 1, paddingHorizontal: 2 },
  divider: { height: "100%" },
  title: { fontSize: 28, lineHeight: 34, textAlign: "center" },
  footnote: { fontSize: 12, lineHeight: 16 },
  overview: { flex: 1, paddingHorizontal: 16, paddingBottom: 16, gap: 16 },
  title2: { fontSize: 22, lineHeight: 28 },
  body: { fontSize: 17, lineHeight: 22 },
  callout: { fontSize: 16, lineHeight: 21, textAlign: "right" },
  tagline: { fontStyle: "italic", color: PlatformColor("secondaryLabel") },
  mediaFact: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 8,
  },
});
