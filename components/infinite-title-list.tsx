import { LegendList } from "@legendapp/list";
import { DefinedUseInfiniteQueryResult } from "@tanstack/react-query";
import { FC, use } from "react";
import { useWindowDimensions } from "react-native";

import { TitleCard } from "@/components/title-card";
import { MovieResult, TvResult } from "@/http/gen";

export interface MoviesListProps {
  query: DefinedUseInfiniteQueryResult<(MovieResult | TvResult)[]>;
}

export const InfiniteTitleList: FC<MoviesListProps> = ({ query }) => {
  const window = useWindowDimensions();

  const data = use(query.promise);

  const aspectRatio = 1.5;
  const columns = window.width >= 700 ? 4 : 3;
  const paddingHorizontal = 16;
  const columnGap = paddingHorizontal / 2;
  const width = window.width / columns - paddingHorizontal;
  const height = width * aspectRatio;

  // todo: empty state
  if (!data.length) return null;

  return (
    <LegendList
      data={data}
      maintainVisibleContentPosition
      recycleItems
      contentContainerStyle={{ paddingHorizontal, columnGap }}
      extraData={{ width: window.width }}
      numColumns={columns}
      refreshing={query.isRefetching}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => <TitleCard title={item} style={{ width, height }} />}
      onEndReached={() => query.fetchNextPage()}
      onRefresh={() => query.refetch()}
    />
  );
};
