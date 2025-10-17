import { StyleSheet, View } from "react-native";

import { MovieTitleCard } from "@/components/movie-title-card";
import { TVTitleCard } from "@/components/tv-title-card";
import { MediaInfo } from "@/http/gen";

export interface TitleCardProps {
  item: MediaInfo;
}

export function TitleCard({ item }: TitleCardProps) {
  return (
    <View style={styles.container}>
      {item.mediaType === "movie" ? (
        <MovieTitleCard item={item} />
      ) : (
        <TVTitleCard item={item} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: 144, height: 216, marginBottom: 16 },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
});
