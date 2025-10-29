import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

export default function TabsLayout() {
  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="discover">
        <Label>Discover</Label>
        {Platform.select({
          ios: <Icon sf="sparkles" />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="movies">
        <Label>Movies</Label>
        {Platform.select({
          ios: <Icon sf="film" />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="series">
        <Label>Series</Label>
        {Platform.select({
          ios: <Icon sf="tv" />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="requests">
        <Label>Requests</Label>
        {Platform.select({
          ios: <Icon sf="clock" />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        <Label>Search</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
