import { SFSymbol } from "expo-symbols";

import { Permission } from "@/const/permission";
import { MediaServerType } from "@/const/server";
import { MainSettings, MovieDetails } from "@/http/gen";
import { hasPermission } from "@/utils/has-permission";

function getAvailableMediaServerName(settings: MainSettings, is4k: boolean = false) {
  switch (settings.mediaServerType) {
    case MediaServerType.EMBY:
      return `${is4k ? "Play 4k" : "Play"} on Emby`;
    case MediaServerType.PLEX:
      return `${is4k ? "Play 4k" : "Play"} on Plex`;
    default:
      return `${is4k ? "Play 4k" : "Play"} on Jellyfin`;
  }
}

export interface MediaLinkItem {
  text: string;
  url: string;
  icon: SFSymbol;
}

export const getMediaLinks = (
  title: MovieDetails,
  settings: MainSettings,
  permissions: number = 0
) => {
  const mediaLinks: MediaLinkItem[] = [];

  if (
    title.mediaInfo?.mediaUrl &&
    hasPermission([Permission.REQUEST, Permission.REQUEST_MOVIE], permissions, "or")
  ) {
    mediaLinks.push({
      text: getAvailableMediaServerName(settings),
      url: title.mediaInfo?.mediaUrl,
      icon: "play",
    });
  }

  if (
    settings.movie4kEnabled &&
    title.mediaInfo?.mediaUrl4k &&
    hasPermission([Permission.REQUEST_4K, Permission.REQUEST_4K_MOVIE], permissions, "or")
  ) {
    mediaLinks.push({
      text: getAvailableMediaServerName(settings, true),
      url: title.mediaInfo?.mediaUrl4k,
      icon: "play",
    });
  }

  const trailerVideo = title.relatedVideos
    ?.filter((r) => r.type === "Trailer")
    .sort((a, b) => a.size - b.size)
    .pop();
  const trailerUrl =
    trailerVideo?.site === "YouTube" && settings.youtubeUrl != ""
      ? `${settings.youtubeUrl}${trailerVideo?.key}`
      : trailerVideo?.url;

  if (trailerUrl) {
    mediaLinks.push({ text: "Watch Trailer", url: trailerUrl, icon: "film" });
  }

  return mediaLinks;
};
