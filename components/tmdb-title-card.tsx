import { useQuery } from "@tanstack/react-query";
import { use } from "react";

import { TitleCard } from "@/components/title-card";
import { MediaInfo } from "@/http/gen";
import {
  getMovieByMovieIdOptions,
  getTvByTvIdOptions,
} from "@/http/gen/@tanstack/react-query.gen";

export interface TMDBTitleCardProps {
  item: MediaInfo;
}

export function TMDBTitleCard({ item }: TMDBTitleCardProps) {
  const movie = useQuery({
    ...getMovieByMovieIdOptions({ path: { movieId: item.tmdbId! } }),
    enabled: !item.tmdbId || item.mediaType === "movie",
  });

  const tv = useQuery({
    ...getTvByTvIdOptions({ path: { tvId: item.tmdbId! } }),
    enabled: !item.tmdbId || item.mediaType === "tv",
  });

  if (!item.tmdbId || !item.mediaType) return null;

  const title =
    item.mediaType === "movie" ? use(movie.promise) : use(tv.promise);

  // todo: error state
  if (!title) return null;

  return <TitleCard item={title} />;
}
