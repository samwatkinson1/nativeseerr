import { useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { Redirect, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Suspense, use, useCallback } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Loading } from "@/components/loading";
import { useBaseUrl } from "@/hooks/use-base-url";
import { client } from "@/http/gen/client.gen";

interface RedirectToDiscoverProps {
  query: UseQueryResult<string | null>;
}

function RedirectToDiscover({ query }: RedirectToDiscoverProps) {
  const qc = useQueryClient();
  const data = use(query.promise);

  useFocusEffect(
    useCallback(() => {
      if (!data) return router.navigate("/login/jellyfin");

      client.setConfig({ baseUrl: `${data}/api/v1` });
      void qc.resetQueries();
    }, [data, qc])
  );

  if (!data) return <Loading />;
  return <Redirect href="/discover" />;
}

export function ErrorBoundary() {
  useFocusEffect(
    useCallback(() => {
      router.navigate("/login/jellyfin");
    }, [])
  );

  return <Loading />;
}

export default function IndexScreen() {
  const { key } = useLocalSearchParams<{ key: string }>();

  const query = useBaseUrl();

  return (
    <View key={key} style={styles.container}>
      <Suspense fallback={<ActivityIndicator size="small" />}>
        <RedirectToDiscover query={query} />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
