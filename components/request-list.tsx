import { LegendList } from "@legendapp/list";
import { UseQueryResult, useSuspenseQueries } from "@tanstack/react-query";
import { FC, use } from "react";
import { View } from "react-native";

import { RequestItem } from "@/components/request-item";
import { useBaseUrl } from "@/hooks/use-base-url";
import { GetRequestResponse, MediaRequest, MovieDetails, TvDetails } from "@/http/gen";
import { getMovieByMovieIdOptions, getTvByTvIdOptions } from "@/http/gen/@tanstack/react-query.gen";

interface RequestListItemsProps {
  items: MediaRequest[];
  baseUrl: string | null;
}

function RequestListItems({ items, baseUrl }: RequestListItemsProps) {
  const { titles } = useSuspenseQueries({
    queries: items.map((item) => {
      const id = item.media!.tmdbId!; // fixme: remove non-null assertion
      return item.media!.mediaType === "movie"
        ? getMovieByMovieIdOptions({ path: { movieId: id } })
        : getTvByTvIdOptions({ path: { tvId: id } });
    }),
    combine(queries) {
      return { titles: queries.map((item) => item.data) };
    },
  });

  return (
    <LegendList
      data={items}
      extraData={{ titles }}
      contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
      estimatedItemSize={312}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item, extraData }) => {
        const { titles } = extraData as { titles: (MovieDetails | TvDetails)[] };
        // fixme: nullables
        const title = titles.find((data) => data.mediaInfo?.tmdbId === item.media?.tmdbId);
        if (!title) return null; // todo: error state
        return (
          <RequestItem
            key={`request-list-${item.id}`}
            request={item}
            title={title}
            baseUrl={baseUrl}
          />
        );
      }}
    />
  );
}

export interface RequestListProps {
  query: UseQueryResult<GetRequestResponse>;
}

export const RequestList: FC<RequestListProps> = ({ query }) => {
  const baseUrlQuery = useBaseUrl();
  const baseUrl = use(baseUrlQuery.promise);

  const data = use(query.promise);
  // todo: empty state
  if (!data.results?.length) return null;

  return (
    <View style={{ flex: 1 }}>
      <RequestListItems items={data.results} baseUrl={baseUrl} />
    </View>
  );
};
