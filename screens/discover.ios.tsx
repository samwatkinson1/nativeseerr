import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

import { DiscoverList } from "@/components/discover-list";
import { Loading } from "@/components/loading";
import { getSettingsDiscoverOptions } from "@/http/gen/@tanstack/react-query.gen";

export default function DiscoverScreen() {
  const query = useQuery({ ...getSettingsDiscoverOptions() });
  return (
    <Suspense fallback={<Loading />}>
      <DiscoverList query={query} />
    </Suspense>
  );
}
