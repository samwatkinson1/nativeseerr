import {
  Button,
  Host,
  HStack,
  Image as SwiftImage,
  Text as SwiftText,
  VStack,
} from "@expo/ui/swift-ui";
import { ignoreSafeArea, padding } from "@expo/ui/swift-ui/modifiers";
import { useTheme } from "@react-navigation/core";
import { useHeaderHeight } from "@react-navigation/elements";
import { format } from "date-fns";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

import { TitleDetailsProps } from "@/components/title-details";
import { rgbToRgba } from "@/utils/rgb-to-rgba";

export interface TitleDetailsHeaderProps extends TitleDetailsProps {}

export const TitleDetailsHeader: FC<TitleDetailsHeaderProps> = ({ title, mediaType }) => {
  const header = useHeaderHeight();
  const { colors, fonts } = useTheme();

  const { posterPath, genres = [] } = title;

  const titleName = mediaType === "movie" ? title.title : title.name;
  const titleReleaseDate = mediaType === "movie" ? title.releaseDate : title.firstAirDate;

  // todo: https://github.com/seerr-team/seerr/blob/main/src/components/MovieDetails/index.tsx#L232-L236
  // todo: https://github.com/seerr-team/seerr/blob/main/src/components/TvDetails/index.tsx#L227-L232
  const discoverRegion = "US";

  const contentRating =
    mediaType === "movie"
      ? title.releases?.results
          ?.find(({ iso_3166_1 }) => iso_3166_1 === discoverRegion)
          ?.release_dates?.find(({ certification }) => certification)?.certification
      : title.contentRatings?.results?.find(({ iso_3166_1 }) => iso_3166_1 === discoverRegion)
          ?.rating;

  const seasonCount = title.seasons?.filter(
    ({ seasonNumber, episodeCount }) => seasonNumber !== 0 && episodeCount !== 0
  ).length;
  const length = mediaType === "movie" ? `${title.runtime} minutes` : `${seasonCount} seasons`;

  return (
    <LinearGradient
      colors={[rgbToRgba(colors.card, 0), rgbToRgba(colors.background, 100)]}
      style={{ ...styles.container, marginTop: header }}
    >
      <Image
        source={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${posterPath}`}
        style={styles.poster}
      />

      <View>
        <Text style={{ ...styles.title, ...fonts.heavy, color: colors.text }}>
          {titleName} {titleReleaseDate ? `(${format(titleReleaseDate, "yyyy")})` : ""}
        </Text>

        <View style={styles.attributes}>
          <View style={{ ...styles.border, ...styles.rating, borderColor: colors.text }}>
            <Text style={{ ...styles.footnote, ...fonts.medium, color: colors.text }}>
              {contentRating}
            </Text>
          </View>
          <View style={{ ...styles.divider, ...styles.border, borderColor: colors.text }} />
          <Text style={{ ...styles.footnote, ...fonts.medium, color: colors.text }}>{length}</Text>
          <View style={{ ...styles.divider, ...styles.border, borderColor: colors.text }} />
          <Text style={{ ...styles.footnote, ...fonts.medium, color: colors.text }}>
            {genres.map((item) => item.name).join(", ")}
          </Text>
        </View>
      </View>

      <Host matchContents style={{ minWidth: "100%" }}>
        <VStack spacing={8} alignment="center" modifiers={[ignoreSafeArea()]}>
          <HStack spacing={8} alignment="center">
            <Button variant="glass">
              <SwiftImage systemName="eye.slash" size={16} modifiers={[padding({ all: 6 })]} />
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
                <SwiftText weight="bold">Watch Trailer</SwiftText>
              </HStack>
            </Button>
          </HStack>

          <Button variant="glassProminent">
            <HStack spacing={8} modifiers={[padding({ all: 4 })]}>
              <SwiftImage systemName="arrow.down.to.line.compact" size={16} />
              <SwiftText weight="bold">Request</SwiftText>
            </HStack>
          </Button>
        </VStack>
      </Host>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingBottom: 16, alignItems: "center", gap: 16 },
  poster: { width: 128, height: 192, borderRadius: 12 },
  attributes: { gap: 6, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  border: { borderWidth: StyleSheet.hairlineWidth, borderStyle: "solid" },
  rating: { borderRadius: 4, borderWidth: 1, paddingHorizontal: 2 },
  divider: { height: "100%" },
  title: { fontSize: 28, lineHeight: 34, textAlign: "center" },
  footnote: { fontSize: 12, lineHeight: 16 },
});
