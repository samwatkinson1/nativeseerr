import { Octicons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";

import { MediaStatus } from "@/const/media";

export interface StatusBadgeMiniProps {
  status: MediaStatus;
}

export function StatusBadgeMini({ status }: StatusBadgeMiniProps) {
  return (
    <Text style={{ ...styles.container, ...styles.border, ...styles[status] }}>
      {icons[status]}
    </Text>
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
  container: { padding: 2, textAlign: "center" },
  border: { borderRadius: 999, borderStyle: "solid", borderWidth: 1 },
  [MediaStatus.UNKNOWN]: {},
  [MediaStatus.PENDING]: {
    backgroundColor: "#615fff",
    borderColor: "#7c86ff",
    color: "#e0e7ff",
  },
  [MediaStatus.PROCESSING]: {
    backgroundColor: "#f0b100",
    borderColor: "#fdc700",
    color: "#fef9c2",
  },
  [MediaStatus.PARTIALLY_AVAILABLE]: {
    backgroundColor: "#00c950",
    borderColor: "#05df72",
    color: "#dcfce7",
  },
  [MediaStatus.AVAILABLE]: {
    backgroundColor: "#00c950",
    borderColor: "#05df72",
    color: "#dcfce7",
  },
  [MediaStatus.BLACKLISTED]: {
    backgroundColor: "#fb2c36",
    borderColor: "#ffffff",
    color: "#ffffff",
  },
  [MediaStatus.DELETED]: {
    backgroundColor: "#fb2c36",
    borderColor: "#ff6467",
    color: "#ffe2e2",
  },
});
