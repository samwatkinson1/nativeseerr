import { ThemeProvider } from "@react-navigation/core";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, useColorScheme } from "react-native";

export default function RootLayout() {
  const scheme = useColorScheme();
  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <NativeTabs>
        <NativeTabs.Trigger name="explore">
          <Label>Explore</Label>
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
  );
}
