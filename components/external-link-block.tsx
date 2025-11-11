import { useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { openURL } from "expo-linking";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { MediaServerType } from "@/const/server";
import { getSettingsMainOptions } from "@/http/gen/@tanstack/react-query.gen";

export interface ExternalLinkBlockProps {
  mediaType: "movie" | "tv";
  tmdbId?: number | null;
  tvdbId?: number | null;
  imdbId?: string | null;
  rtUrl?: string | null;
  mediaUrl?: string | null;
}

export const ExternalLinkBlock: FC<ExternalLinkBlockProps> = ({
  mediaType,
  tmdbId,
  tvdbId,
  imdbId,
  rtUrl,
  mediaUrl,
}) => {
  const { data: settings } = useSuspenseQuery({ ...getSettingsMainOptions() });

  return (
    <View style={styles.container}>
      {mediaUrl && (
        <Pressable onPress={() => openURL(mediaUrl)}>
          {settings.mediaServerType === MediaServerType.PLEX ? (
            <Image
              style={styles.image}
              contentFit="contain"
              source={require("@/assets/images/plex.svg")}
            />
          ) : settings.mediaServerType === MediaServerType.EMBY ? (
            <Image
              style={styles.image}
              contentFit="contain"
              source={require("@/assets/images/emby.svg")}
            />
          ) : (
            <Image
              style={styles.image}
              contentFit="contain"
              source={require("@/assets/images/jellyfin.svg")}
            />
          )}
        </Pressable>
      )}
      {tmdbId && (
        <Pressable onPress={() => openURL(`https://www.themoviedb.org/${mediaType}/${tmdbId}`)}>
          <Image
            style={styles.image}
            contentFit="contain"
            source={require("@/assets/images/tmdb.svg")}
          />
        </Pressable>
      )}
      {tvdbId && mediaType === "tv" && (
        <Pressable onPress={() => openURL(`http://www.thetvdb.com/?tab=series&id=${tvdbId}`)}>
          <Image
            style={styles.image}
            contentFit="contain"
            source={require("@/assets/images/tvdb.svg")}
          />
        </Pressable>
      )}
      {imdbId && (
        <Pressable onPress={() => openURL(`https://www.imdb.com/title/${imdbId}`)}>
          <Image
            style={styles.image}
            contentFit="contain"
            source={require("@/assets/images/imdb.svg")}
          />
        </Pressable>
      )}
      {rtUrl && (
        <Pressable onPress={() => openURL(rtUrl)}>
          <Image
            style={styles.image}
            contentFit="contain"
            source={require("@/assets/images/rt.svg")}
          />
        </Pressable>
      )}
      {tmdbId && (
        <Pressable
          onPress={() =>
            openURL(
              `https://trakt.tv/search/tmdb/${tmdbId}?id_type=${
                mediaType === "movie" ? "movie" : "show"
              }`
            )
          }
        >
          <Image
            style={styles.image}
            contentFit="contain"
            source={require("@/assets/images/trakt.svg")}
          />
        </Pressable>
      )}
      {tmdbId && mediaType === "movie" && (
        <Pressable onPress={() => openURL(`https://letterboxd.com/tmdb/${tmdbId}`)}>
          <Image
            style={styles.image}
            contentFit="contain"
            source={require("@/assets/images/letterboxd.svg")}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", justifyContent: "space-evenly" },
  image: { width: 40, height: 30 },
});
