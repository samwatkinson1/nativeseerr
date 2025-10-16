import { ThemeProvider } from "@react-navigation/native";
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { AppState, LogBox, Platform, useColorScheme } from "react-native";

import { DarkTheme, DefaultTheme } from "@/const/theme";
import { client } from "@/http/gen/client.gen";
import { mapHttpErrors } from "@/http/interceptors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { experimental_prefetchInRender: true, retry: false },
  },
});

client.interceptors.error.use(mapHttpErrors);

LogBox.uninstall(); // fixme: disable logbox until expo-router handles suspense better

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
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="login"
            options={{
              presentation: "formSheet",
              contentStyle: { height: "100%" },
            }}
          />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
