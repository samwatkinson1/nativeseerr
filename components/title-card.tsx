import { useTheme } from "@react-navigation/core";
import { ImageBackground } from "expo-image";
import { Link } from "expo-router";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { Spacer } from "@/components/spacer";
import { StatusBadgeMini } from "@/components/status-badge-mini";
import { TitlePill } from "@/components/title-pill";
import { MediaStatus } from "@/const/media";
import { MovieDetails, MovieResult, TvDetails, TvResult } from "@/http/gen";

export interface TitleCardProps {
  title: (MovieDetails & MovieResult) | (TvDetails & TvResult);
  style?: StyleProp<ViewStyle>;
}

export function TitleCard({ title, style }: TitleCardProps) {
  const { colors } = useTheme();

  const { posterPath, mediaInfo } = title;
  const mediaType = mediaInfo?.mediaType ?? title.mediaType;
  const status = mediaInfo?.status;

  return (
    <View
      style={StyleSheet.compose({ ...styles.base, ...styles.container, ...styles.margin }, style)}
    >
      <Link href={mediaType === "movie" ? `/movies/${title.id}` : `/series/${title.id}`}>
        <Link.Trigger>
          <ImageBackground
            source={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`}
            placeholder={require("@/assets/images/poster-not-found.png")}
            placeholderContentFit="cover"
            contentFit="contain"
            imageStyle={styles.radius}
            style={{ ...styles.base, ...styles.card, ...styles.radius, borderColor: colors.border }}
          >
            {mediaType && <TitlePill type={mediaType} />}
            <Spacer />
            {status && status !== MediaStatus.UNKNOWN && <StatusBadgeMini status={status} />}
          </ImageBackground>
        </Link.Trigger>
        <Link.Preview style={{ backgroundColor: colors.card }} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: "row", alignItems: "flex-start" },
  container: { width: 144, height: 216 },
  card: { width: "100%", height: "100%", padding: 4, borderStyle: "solid", borderWidth: 1 },
  margin: { marginBottom: 12 },
  radius: { borderRadius: 12 },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
});
