import { useTheme } from "@react-navigation/core";
import { ImageBackground } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Spacer } from "@/components/spacer";
import { StatusBadgeMini } from "@/components/status-badge-mini";
import { TitlePill } from "@/components/title-pill";
import { MediaStatus } from "@/const/media";
import { MovieDetails, TvDetails } from "@/http/gen";

export interface TitleCardProps {
  title: MovieDetails | TvDetails;
}

export function TitleCard({ title }: TitleCardProps) {
  const { colors } = useTheme();

  const { posterPath, mediaInfo } = title;
  const mediaType = mediaInfo?.mediaType;
  const status = mediaInfo?.status;

  return (
    <View style={{ ...styles.base, ...styles.margin }}>
      <Link href={mediaType === "movie" ? `/movies/${title.id}` : `/series/${title.id}`}>
        <Link.Trigger>
          <ImageBackground
            source={`https://image.tmdb.org/t/p/w300_and_h450_face${posterPath}`}
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
  base: { width: 144, height: 216, flexDirection: "row", alignItems: "flex-start" },
  card: { padding: 4, borderStyle: "solid", borderWidth: 1 },
  margin: { marginBottom: 12 },
  radius: { borderRadius: 12 },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
});
