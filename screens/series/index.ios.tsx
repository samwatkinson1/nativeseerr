import { useInfiniteQuery } from "@tanstack/react-query";
import { Suspense } from "react";

import { InfiniteTitleList } from "@/components/infinite-title-list";
import { Loading } from "@/components/loading";
import { TvResult } from "@/http/gen";
import { getDiscoverTvInfiniteOptions } from "@/http/gen/@tanstack/react-query.gen";

export default function SeriesScreen() {
  const query = useInfiniteQuery({
    ...getDiscoverTvInfiniteOptions(),
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
