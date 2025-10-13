import { ContentUnavailableView, Host } from "@expo/ui/swift-ui";
import { ErrorBoundaryProps } from "expo-router";

// todo: add retry action when available
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <Host style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ContentUnavailableView
        systemImage="slash.circle"
        title={error.name}
        description={error.message}
      />
    </Host>
  );
}

export { default } from "@/components/discover";
