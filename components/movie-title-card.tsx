import { useTheme } from "@react-navigation/core";
import { useQuery } from "@tanstack/react-query";
import { ImageBackground } from "expo-image";
import { Link } from "expo-router";
import { use } from "react";
import { StyleSheet } from "react-native";

import { Spacer } from "@/components/spacer";
import { StatusBadgeMini } from "@/components/status-badge-mini";
import { TitlePill } from "@/components/title-pill";
import { MediaStatus } from "@/const/media";
import { MediaInfo } from "@/http/gen";
import { getMovieByMovieIdOptions } from "@/http/gen/@tanstack/react-query.gen";

export interface MovieTitleCardProps {
  item: MediaInfo;
}

export function MovieTitleCard({ item }: MovieTitleCardProps) {
  const { colors } = useTheme();

  const query = useQuery({
    // fixme: remove non-null assertion
    ...getMovieByMovieIdOptions({ path: { movieId: item.tmdbId! } }),
  });

  const title = use(query.promise);
  // todo: error state
  if (!title) return null;

  return (
    <Link href={`/movies/${item.id}`}>
      <Link.Trigger>
        <ImageBackground
          source={`https://image.tmdb.org/t/p/w300_and_h450_face${title.posterPath}`}
          contentFit="contain"
          style={{ ...styles.container, borderColor: colors.border }}
        >
          {title.mediaInfo?.mediaType && (
            <TitlePill type={title.mediaInfo.mediaType} />
          )}
          <Spacer />
          {title.mediaInfo?.status &&
            title.mediaInfo.status !== MediaStatus.UNKNOWN && (
              <StatusBadgeMini status={title.mediaInfo.status} />
            )}
        </ImageBackground>
      </Link.Trigger>
      <Link.Preview style={{ backgroundColor: colors.card }} />
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 144,
    height: 216,
    overflow: "hidden",
    padding: 4,
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 1,
  },
});
