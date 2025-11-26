import { Button, ContextMenu, Host } from "@expo/ui/swift-ui";
import { HeaderButton } from "@react-navigation/elements";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { FC } from "react";

import { useBaseUrl } from "@/hooks/use-base-url";
import { useSignOut } from "@/hooks/use-sign-out";
import { getAuthMeOptions } from "@/http/gen/@tanstack/react-query.gen";

export const UserHeaderButton: FC = () => {
  const { data: baseUrl } = useBaseUrl();
  const { data: user } = useQuery({ ...getAuthMeOptions() });

  const signOut = useSignOut();

  if (!baseUrl || !user?.avatar) return undefined;

  return (
    <Host matchContents>
      <ContextMenu>
        <ContextMenu.Trigger>
          <HeaderButton>
            <Image
              source={`${baseUrl}${user.avatar}`}
              style={{ width: 20, height: 20, borderRadius: 999 }}
            />
          </HeaderButton>
        </ContextMenu.Trigger>
        <ContextMenu.Items>
          <Button
            systemImage="rectangle.portrait.and.arrow.right"
            role="destructive"
            onPress={() => signOut.mutate()}
          >
            Sign Out
          </Button>
        </ContextMenu.Items>
      </ContextMenu>
    </Host>
  );
};
