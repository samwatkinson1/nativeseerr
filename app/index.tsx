import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Redirect, router, useFocusEffect } from "expo-router";
import { getItem } from "expo-secure-store";
import { Suspense, use, useCallback, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { store } from "@/const/keys";
import { GetAuthMeResponse } from "@/http/gen";
import { getAuthMeOptions } from "@/http/gen/@tanstack/react-query.gen";
import { client } from "@/http/gen/client.gen";

function RedirectToDiscover({
  query,
}: {
  query: UseQueryResult<GetAuthMeResponse>;
}) {
  const data = use(query.promise);
  return <Redirect href={!data ? "/login/jellyfin" : "/discover"} />;
}

export function ErrorBoundary() {
  useFocusEffect(
    useCallback(() => {
      router.navigate("/login/jellyfin");
    }, [])
  );

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" />
    </View>
  );
}

export default function IndexScreen() {
  const query = useQuery({ ...getAuthMeOptions() });

  useEffect(() => {
    const url = getItem(store.serverUrl);
    if (url) client.setConfig({ baseUrl: `${url}/api/v1` });
  }, []);

  return (
    <View style={styles.container}>
      <Suspense fallback={<ActivityIndicator size="small" />}>
        <RedirectToDiscover query={query} />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
