import { HeaderButton } from "@react-navigation/elements";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { FC } from "react";

import { useBaseUrl } from "@/hooks/use-base-url";
import { getAuthMeOptions } from "@/http/gen/@tanstack/react-query.gen";

export interface UserHeaderButtonProps {}

export const UserHeaderButton: FC<UserHeaderButtonProps> = () => {
  const { data: baseUrl } = useBaseUrl();
  const { data: user } = useQuery({ ...getAuthMeOptions() });

  if (!baseUrl || !user?.avatar) return undefined;

  return (
    <HeaderButton>
      <Image
        source={`${baseUrl}${user.avatar}`}
        style={{ width: 24, height: 24, borderRadius: 999 }}
      />
    </HeaderButton>
  );
};
