import { useTheme } from "@react-navigation/core";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { PlatformColor, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import { StatusBadgeMini } from "@/components/status-badge-mini";
import { MediaStatus } from "@/const/media";
import { MediaRequest, MovieDetails, TvDetails } from "@/http/gen";

export interface RequestCardProps {
  baseUrl: string | null;
  request: MediaRequest;
  title: MovieDetails & TvDetails;
  style?: StyleProp<ViewStyle>;
}

export function RequestCard({ baseUrl, request, title, style }: RequestCardProps) {
  const { colors, fonts } = useTheme();

  const { requestedBy } = request;
  const avatar = baseUrl && requestedBy?.avatar ? `${baseUrl}${requestedBy?.avatar}` : "";
  const displayName = requestedBy?.displayName;

  const { backdropPath, posterPath, mediaInfo } = title;
  const mediaType = mediaInfo?.mediaType;
  const status = mediaInfo?.status;

  return (
    <View style={StyleSheet.compose({ ...styles.base, ...styles.margin }, style)}>
      <ImageBackground
        source={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdropPath}`}
        contentFit="cover"
        imageStyle={{ ...styles.radius }}
        style={{ ...styles.base, ...styles.card, ...styles.radius, borderColor: colors.border }}
      >
        <LinearGradient
          colors={["rgba(17, 24, 39, 0.47)", "rgba(17, 24, 39, 1)"]}
          start={[0, 0]}
          end={[1, 1.65]}
          locations={[0, 0.75]}
          style={{ ...styles.gradient, ...styles.radius }}
        />

        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ ...styles.title, ...fonts.heavy }}>
            {title.title || title.name}
          </Text>

          {/* todo: permissions */}
          <View style={styles.requestor}>
            {avatar && <Image source={avatar} style={styles.avatar} />}
            <Text numberOfLines={1} style={{ ...styles.displayName, ...fonts.bold }}>
              {displayName}
            </Text>
          </View>

          {/* todo: status badge component */}
          {status && status !== MediaStatus.UNKNOWN && <StatusBadgeMini status={status} />}
        </View>

        <Link href={mediaType === "movie" ? `/movies/${title.id}` : `/series/${title.id}`}>
          <Link.Trigger>
            <Image
              source={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`}
              style={styles.poster}
            />
          </Link.Trigger>
          <Link.Preview style={{ backgroundColor: colors.card }} />
        </Link>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { width: 288, height: 152, flexDirection: "row" },
  card: { padding: 16, borderStyle: "solid", borderWidth: 1, gap: 16 },
  gradient: { position: "absolute", inset: 0 },
  margin: { marginBottom: 12 },
  radius: { borderRadius: 12 },
  poster: { width: 80, height: 120, borderRadius: 6 },
  title: { color: "white", fontSize: 17, lineHeight: 22 },
  requestor: { flexDirection: "row", gap: 4, paddingBottom: 4 },
  avatar: { width: 20, height: 20, borderRadius: 999 },
  displayName: { color: PlatformColor("systemGray"), fontSize: 15, lineHeight: 20 },
});
