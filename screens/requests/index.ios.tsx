import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

import { Loading } from "@/components/loading";
import { RequestList } from "@/components/request-list";
import { getRequestOptions } from "@/http/gen/@tanstack/react-query.gen";

export default function RequestsScreen() {
  const query = useQuery({
    ...getRequestOptions({
      query: { take: 999, filter: "all", mediaType: "all", sort: "added", sortDirection: "desc" },
    }),
  });

  return (
    <Suspense fallback={<Loading />}>
      <RequestList query={query} />
    </Suspense>
  );
}
