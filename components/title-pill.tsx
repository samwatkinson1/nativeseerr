import { useTheme } from "@react-navigation/core";
import { StyleSheet } from "react-native";

import { Pill } from "@/components/pill";
import { MediaInfo } from "@/http/gen";

export interface TitlePillProps {
  type: Exclude<MediaInfo["mediaType"], undefined>;
}

export function TitlePill({ type }: TitlePillProps) {
  const { fonts } = useTheme();
  return (
    <Pill
      title={type === "movie" ? "MOVIE" : "SERIES"}
      contentContainerStyle={styles[type]}
      style={{ ...styles.text, ...fonts.bold }}
    />
  );
}

const styles = StyleSheet.create({
  movie: { backgroundColor: "#155dfc" },
  tv: { backgroundColor: "#9810fa" },
  text: { color: "white", fontSize: 12 },
});
