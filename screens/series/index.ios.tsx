import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";

import { SeriesParams } from "@/app/(tabs)/series/_layout";
import { InfiniteTitleList } from "@/components/infinite-title-list";
import { Loading } from "@/components/loading";
import { TvResult } from "@/http/gen";
import { getDiscoverTvInfiniteOptions } from "@/http/gen/@tanstack/react-query.gen";

export default function SeriesScreen() {
  const { sort, sortDirection } = useLocalSearchParams<SeriesParams>();

  const query = useInfiniteQuery({
    ...getDiscoverTvInfiniteOptions({ query: { sortBy: `${sort}.${sortDirection}` } }),
    initialPageParam: 1,
    getNextPageParam: ({ page = 1 }) => page + 1,
    select({ pages }) {
      // fixme: remove cast
      return pages.flatMap((page) => page.results as TvResult[]);
    },
  });

  return (
    <Suspense fallback={<Loading />}>
      <InfiniteTitleList query={query} />
    </Suspense>
  );
}
