import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Redirect, router, useFocusEffect } from "expo-router";
import { Suspense, use, useCallback } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { GetAuthMeResponse } from "@/http/gen";
import { getAuthMeOptions } from "@/http/gen/@tanstack/react-query.gen";

function RedirectToDiscover({
  query,
}: {
  query: UseQueryResult<GetAuthMeResponse>;
}) {
  const data = use(query.promise);
  return <Redirect href={!data ? "/login" : "/discover"} />;
}

export function ErrorBoundary() {
  useFocusEffect(
    useCallback(() => {
      router.navigate("/login");
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
