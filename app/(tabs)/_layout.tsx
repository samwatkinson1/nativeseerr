import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

export default function TabsLayout() {
  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="discover" options={{ title: "" }}>
        {Platform.select({
          ios: <Icon sf="sparkles" />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="movies" options={{ title: "" }}>
        {Platform.select({
          ios: <Icon sf="film" />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="series" options={{ title: "" }}>
        {Platform.select({
          ios: <Icon sf="tv" />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="requests" options={{ title: "" }}>
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
