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
      style={{ ...styles.base, ...styles[type], fontSize: 12, ...fonts.medium }}
    />
  );
}

const styles = StyleSheet.create({
  base: { fontSize: 12, color: "white", borderStyle: "solid", borderWidth: 1 },
  movie: { backgroundColor: "#155dfc", borderColor: "#2b7fff" },
  tv: { backgroundColor: "#9810fa", borderColor: "#ad46ff" },
});
