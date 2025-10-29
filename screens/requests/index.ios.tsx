import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";

import { RequestsParams } from "@/app/(tabs)/requests/_layout";
import { Loading } from "@/components/loading";
import { RequestList } from "@/components/request-list";
import { getRequestOptions } from "@/http/gen/@tanstack/react-query.gen";

export default function RequestsScreen() {
  const { filter, mediaType, sort, sortDirection } = useLocalSearchParams<RequestsParams>();

  const query = useQuery({
    // todo: infinite query
    ...getRequestOptions({ query: { take: 10, filter, mediaType, sort, sortDirection } }),
  });

  return (
    <Suspense fallback={<Loading />}>
      <RequestList query={query} />
    </Suspense>
  );
}
