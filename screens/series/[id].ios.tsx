import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";
import { View } from "react-native";

import { Loading } from "@/components/loading";
import { getTvByTvIdOptions } from "@/http/gen/@tanstack/react-query.gen";

export default function TvIdScreen() {
  const { id } = useLocalSearchParams();

  const _ = useQuery({ ...getTvByTvIdOptions({ path: { tvId: Number(id) } }) });

  return (
    <Suspense fallback={<Loading />}>
      <View />
    </Suspense>
  );
}
