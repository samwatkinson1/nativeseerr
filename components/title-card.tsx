import { useTheme } from "@react-navigation/core";
import { ImageBackground } from "expo-image";
import { Link } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Spacer } from "@/components/spacer";
import { StatusBadgeMini } from "@/components/status-badge-mini";
import { TitlePill } from "@/components/title-pill";
import { MediaStatus } from "@/const/media";
import { MovieDetails, TvDetails } from "@/http/gen";

export interface TitleCardProps {
  item: MovieDetails & TvDetails;
}

export function TitleCard({ item }: TitleCardProps) {
  const { colors } = useTheme();

  return (
    <Link href={`/movies/${item.id}`}>
      <Link.Trigger>
        <ImageBackground
          source={`https://image.tmdb.org/t/p/w300_and_h450_face${item.posterPath}`}
          contentFit="contain"
          style={{
            ...styles.container,
            ...styles.border,
            ...styles.card,
            borderColor: colors.border,
          }}
        >
          {item.mediaInfo?.mediaType && (
            <TitlePill type={item.mediaInfo.mediaType} />
          )}
          <Spacer />
          {item.mediaInfo?.status &&
            item.mediaInfo.status !== MediaStatus.UNKNOWN && (
              <StatusBadgeMini status={item.mediaInfo.status} />
            )}
        </ImageBackground>
      </Link.Trigger>
      <Link.Preview style={{ backgroundColor: colors.card }} />
    </Link>
  );
}

function TitleCardLoading() {
  return (
    <View style={{ ...styles.container, ...styles.loading }}>
      <ActivityIndicator size="small" />
    </View>
  );
}

TitleCard.Loading = TitleCardLoading;

const styles = StyleSheet.create({
  container: { width: 144, height: 216, overflow: "hidden", marginBottom: 16 },
  card: { padding: 4, flexDirection: "row", alignItems: "flex-start" },
  border: { borderRadius: 12, borderStyle: "solid", borderWidth: 1 },
  loading: { alignItems: "center", justifyContent: "center" },
});
