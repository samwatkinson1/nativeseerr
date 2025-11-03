import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";

import { Loading } from "@/components/loading";
import { MovieDetails } from "@/components/movie-details";
import { getMovieByMovieIdOptions } from "@/http/gen/@tanstack/react-query.gen";

export default function MovieIDScreen() {
  const { id } = useLocalSearchParams();

  const query = useQuery({ ...getMovieByMovieIdOptions({ path: { movieId: Number(id) } }) });

  return (
    <Suspense fallback={<Loading />}>
      <MovieDetails query={query} />
    </Suspense>
  );
}
