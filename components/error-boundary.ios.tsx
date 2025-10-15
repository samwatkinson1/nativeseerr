import { ContentUnavailableView, Host } from "@expo/ui/swift-ui";
import { ErrorBoundaryProps, router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

import { UnauthorizedError } from "@/http/errors";

// todo: generic error messaging
export default function ErrorBoundary({ error }: ErrorBoundaryProps) {
  useFocusEffect(
    useCallback(() => {
      if (error instanceof UnauthorizedError) {
        router.navigate("/login");
      }
    }, [error])
  );

  return (
    <Host style={styles.container}>
      <ContentUnavailableView
        systemImage="slash.circle"
        title="Not logged in"
        description="Login with your Seerr account to continue."
      />
    </Host>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
