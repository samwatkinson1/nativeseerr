import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useTheme,
} from "@react-navigation/native";
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

import { client } from "@/http/gen/client.gen";
import { mapHttpErrors } from "@/http/interceptors";

const queryClient = new QueryClient({
  defaultOptions: { queries: { experimental_prefetchInRender: true } },
});

client.interceptors.error.use(mapHttpErrors);
// fixme: disable logbox until expo-router handles suspense better
LogBox.uninstall();

function App() {
  const { colors } = useTheme();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="login"
        options={{
          presentation: "formSheet",
          contentStyle: { backgroundColor: colors.card },
        }}
      />
    </Stack>
  );
}

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
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
