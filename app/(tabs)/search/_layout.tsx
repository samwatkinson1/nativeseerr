import { router, Stack } from "expo-router";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

export default function Layout() {
  function handleChangeText(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    router.setParams({ query: e.nativeEvent.text });
  }

  return (
    <Stack
      screenOptions={{
        headerSearchBarOptions: {
          placeholder: "Search Movies & TV",
          hideNavigationBar: false,
          onChangeText: handleChangeText,
        },
        headerTitle: "Search",
        headerTransparent: true,
      }}
    />
  );
}
