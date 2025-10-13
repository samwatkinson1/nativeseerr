import { ThemeProvider } from "@react-navigation/core";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { useEffect } from "react";
import { AppState, Platform, useColorScheme } from "react-native";

const queryClient = new QueryClient({
  defaultOptions: { queries: { experimental_prefetchInRender: true } },
});

export default function RootLayout() {
  const scheme = useColorScheme();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (status) => {
      if (Platform.OS === "web") return;
      focusManager.setFocused(status === "active");
    });

    onlineManager.setEventListener((setOnline) => {
      const eventSubscription = Network.addNetworkStateListener((state) => {
        setOnline(!!state.isConnected);
      });
      return eventSubscription.remove;
    });

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <NativeTabs>
          <NativeTabs.Trigger name="discover">
            <Label>Discover</Label>
            {Platform.select({
              ios: <Icon sf="sparkles" />,
            })}
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="movies">
            <Label>Movies</Label>
            {Platform.select({
              ios: <Icon sf={{ default: "film", selected: "film.fill" }} />,
            })}
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="series">
            <Label>Series</Label>
            {Platform.select({
              ios: <Icon sf={{ default: "tv", selected: "tv.fill" }} />,
            })}
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="requests">
            <Label>Requests</Label>
            {Platform.select({
              ios: <Icon sf={{ default: "clock", selected: "clock.fill" }} />,
            })}
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="search" role="search">
            <Label>Search</Label>
          </NativeTabs.Trigger>
        </NativeTabs>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
