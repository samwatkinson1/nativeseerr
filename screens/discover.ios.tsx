import { useTheme } from "@react-navigation/core";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Suspense, use } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { GetSettingsDiscoverResponse } from "@/http/gen";
import { getSettingsDiscoverOptions } from "@/http/gen/@tanstack/react-query.gen";

function DiscoverList({
  query,
}: {
  query: UseQueryResult<GetSettingsDiscoverResponse>;
}) {
  const { colors, fonts } = useTheme();

  const _ = use(query.promise);
  console.log(_);

  return (
    <Text style={{ color: colors.text, ...fonts.regular, ...styles.body }}>
      /discover
    </Text>
  );
}

export default function DiscoverScreen() {
  const query = useQuery({ ...getSettingsDiscoverOptions() });

  return (
    <View style={styles.container}>
      <Suspense fallback={<ActivityIndicator size="small" />}>
        <DiscoverList query={query} />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  body: { fontSize: 17, lineHeight: 22 },
});
