import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Suspense, use } from "react";

import { Loading } from "@/components/loading";
import { TitleDetails } from "@/components/title-details";
import type { MovieDetails } from "@/http/gen";
import { getMovieByMovieIdOptions } from "@/http/gen/@tanstack/react-query.gen";

interface MovieDetailsProps {
  query: UseQueryResult<MovieDetails>;
}

function MovieDetails({ query }: MovieDetailsProps) {
  const data = use(query.promise);
  // todo: empty state
  if (!data) return null;

  return <TitleDetails title={data} mediaType="movie" />;
}

export default function MovieIDScreen() {
  const { id } = useLocalSearchParams();

  const query = useQuery({ ...getMovieByMovieIdOptions({ path: { movieId: Number(id) } }) });

  return (
    <Suspense fallback={<Loading />}>
      <MovieDetails query={query} />
    </Suspense>
  );
}
