import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";

import { MoviesParams } from "@/app/(tabs)/movies/_layout";
import { InfiniteTitleList } from "@/components/infinite-title-list";
import { Loading } from "@/components/loading";
import { MovieResult } from "@/http/gen";
import { getDiscoverMoviesInfiniteOptions } from "@/http/gen/@tanstack/react-query.gen";

export default function MoviesScreen() {
  const { sort, sortDirection } = useLocalSearchParams<MoviesParams>();

  const query = useInfiniteQuery({
    ...getDiscoverMoviesInfiniteOptions({ query: { sortBy: `${sort}.${sortDirection}` } }),
    initialPageParam: 1,
    getNextPageParam: ({ page = 1 }) => page + 1,
    select({ pages }) {
      // fixme: remove cast
      return pages.flatMap((page) => page.results as MovieResult[]);
    },
  });

  return (
    <Suspense fallback={<Loading />}>
      <InfiniteTitleList query={query} />
    </Suspense>
  );
}
