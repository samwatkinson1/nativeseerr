import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Suspense, use } from "react";

import { Loading } from "@/components/loading";
import { TitleDetails } from "@/components/title-details";
import type { TvDetails } from "@/http/gen";
import { getTvByTvIdOptions } from "@/http/gen/@tanstack/react-query.gen";

interface TvDetailsProps {
  query: UseQueryResult<TvDetails>;
}

function TvDetails({ query }: TvDetailsProps) {
  const data = use(query.promise);
  // todo: empty state
  if (!data) return null;

  return <TitleDetails title={data} mediaType="tv" />;
}

export default function TvIdScreen() {
  const { id } = useLocalSearchParams();

  const query = useQuery({ ...getTvByTvIdOptions({ path: { tvId: Number(id) } }) });

  return (
    <Suspense fallback={<Loading />}>
      <TvDetails query={query} />
    </Suspense>
  );
}
