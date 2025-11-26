import { ThemeProvider } from "@react-navigation/native";
import { useTanStackQueryDevTools } from "@rozenite/tanstack-query-plugin";
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { AppState, LogBox, Platform, useColorScheme } from "react-native";

import { DarkTheme, DefaultTheme } from "@/const/theme";
import { client } from "@/http/gen/client.gen";
import { mapHttpErrors } from "@/http/interceptors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { experimental_prefetchInRender: true, retry: false, staleTime: 5 * 60 * 1000 },
  },
});

client.interceptors.error.use(mapHttpErrors);

LogBox.uninstall(); // fixme: disable logbox until expo-router handles suspense better

SplashScreen.setOptions({ duration: 1000, fade: true });

export default function RootLayout() {
  const scheme = useColorScheme();

  useTanStackQueryDevTools(queryClient);

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

  useEffect(() => {
    const { colors } = scheme === "dark" ? DarkTheme : DefaultTheme;
    void SystemUI.setBackgroundColorAsync(colors.background);
  }, [scheme]);

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
