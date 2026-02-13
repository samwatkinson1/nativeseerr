import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

export default function TabsLayout() {
  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="discover" unstable_nativeProps={{ title: "" }}>
        {Platform.select({
          ios: <NativeTabs.Trigger.Icon sf="sparkles" />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="movies" unstable_nativeProps={{ title: "" }}>
        {Platform.select({
          ios: <NativeTabs.Trigger.Icon sf="film" />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="series" unstable_nativeProps={{ title: "" }}>
        {Platform.select({
          ios: <NativeTabs.Trigger.Icon sf="tv" />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="requests" unstable_nativeProps={{ title: "" }}>
        {Platform.select({
          ios: <NativeTabs.Trigger.Icon sf="clock" />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
