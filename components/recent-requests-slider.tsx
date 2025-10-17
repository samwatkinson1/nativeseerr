import { useQuery, useSuspenseQueries } from "@tanstack/react-query";
import { use } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { RequestCard } from "@/components/request-card";
import { SliderHeader } from "@/components/slider-header";
import { useBaseUrl } from "@/hooks/use-base-url";
import { MediaRequest } from "@/http/gen";
import {
  getMovieByMovieIdOptions,
  getRequestOptions,
  getTvByTvIdOptions,
} from "@/http/gen/@tanstack/react-query.gen";

interface RecentRequestsItemsProps {
  items: MediaRequest[];
  baseUrl: string | null;
}

function RecentRequestsItems({ items, baseUrl }: RecentRequestsItemsProps) {
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
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {items.map((request) => {
        // fixme: nullables
        const title = titles.find((data) => data.mediaInfo?.tmdbId === request.media?.tmdbId);
        if (!title) return null; // todo: error state
        return (
          <RequestCard
            key={`recent-requests-${request.id}`}
            request={request}
            title={title}
            baseUrl={baseUrl}
          />
        );
      })}
    </ScrollView>
  );
}

export function RecentRequestsSlider() {
  const query = useQuery({
    ...getRequestOptions({ query: { filter: "all", take: 10, sort: "modified", skip: 0 } }),
  });

  const baseUrlQuery = useBaseUrl();
  const baseUrl = use(baseUrlQuery.promise);

  const data = use(query.promise);
  if (!data.results) return null;

  return (
    <View style={styles.container}>
      <SliderHeader href="/requests" title="Recent Requests" />
      <RecentRequestsItems items={data.results} baseUrl={baseUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
});
