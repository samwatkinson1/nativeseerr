import { Host, Image } from "@expo/ui/swift-ui";
import { HeaderButton } from "@react-navigation/elements";
import { Stack } from "expo-router";

import { UserHeaderButton } from "@/components/user-header-button";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTitle: "",
        headerBackVisible: true,
        headerLeft: ({ canGoBack }) => (!canGoBack ? <SortHeaderButton /> : null),
        headerRight: () => <UserHeaderButton />,
      }}
    />
  );
}

function SortHeaderButton() {
  return (
    <HeaderButton>
      <Host matchContents>
        <Image systemName={"arrow.up.arrow.down"} size={16} />
      </Host>
    </HeaderButton>
  );
}
