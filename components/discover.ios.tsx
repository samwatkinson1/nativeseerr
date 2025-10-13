import { useTheme } from "@react-navigation/core";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Suspense, use } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function DiscoverList({ query }: { query: UseQueryResult }) {
  const { colors, fonts } = useTheme();

  const _data = use(query.promise);

  return (
    <Text style={{ color: colors.text, ...fonts.regular, ...styles.body }}>
      /discover
    </Text>
  );
}

export default function DiscoverScreen() {
  const query = useQuery({
    queryKey: ["settings", "discover"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      return res.json();
    },
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <DiscoverList query={query} />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { fontSize: 17, lineHeight: 22 },
});
