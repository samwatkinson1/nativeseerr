import { Octicons } from "@expo/vector-icons";
import { GlassView } from "expo-glass-effect";
import { StyleSheet, Text } from "react-native";

import { MediaStatus } from "@/const/media";

export interface StatusBadgeMiniProps {
  status: MediaStatus;
}

export function StatusBadgeMini({ status }: StatusBadgeMiniProps) {
  const { backgroundColor, color } = styles[status];
  return (
    <GlassView glassEffectStyle="clear" style={{ ...styles.container, backgroundColor }}>
      <Text style={{ textAlign: "center", color }}>{icons[status]}</Text>
    </GlassView>
  );
}

const icons = {
  [MediaStatus.UNKNOWN]: <Octicons name="question" />,
  [MediaStatus.PENDING]: <Octicons name="bell-fill" />,
  [MediaStatus.PROCESSING]: <Octicons name="clock-fill" />,
  [MediaStatus.PARTIALLY_AVAILABLE]: <Octicons name="dash" />,
  [MediaStatus.AVAILABLE]: <Octicons name="check-circle-fill" />,
  [MediaStatus.BLACKLISTED]: <Octicons name="eye-closed" />,
  [MediaStatus.DELETED]: <Octicons name="trash" />,
};

const styles = StyleSheet.create({
  container: { padding: 4, textAlign: "center", borderRadius: 999 },
  [MediaStatus.UNKNOWN]: { backgroundColor: "#000000", color: "#ffffff" },
  [MediaStatus.PENDING]: { backgroundColor: "#615fff", color: "#e0e7ff" },
  [MediaStatus.PROCESSING]: { backgroundColor: "#f0b100", color: "#fef9c2" },
  [MediaStatus.PARTIALLY_AVAILABLE]: { backgroundColor: "#00c950", color: "#dcfce7" },
  [MediaStatus.AVAILABLE]: { backgroundColor: "#00c950", color: "#dcfce7" },
  [MediaStatus.BLACKLISTED]: { backgroundColor: "#fb2c36", color: "#ffffff" },
  [MediaStatus.DELETED]: { backgroundColor: "#fb2c36", color: "#ffe2e2" },
});
