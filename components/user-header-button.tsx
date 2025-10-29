import { HeaderButton } from "@react-navigation/elements";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { FC } from "react";

import { useBaseUrl } from "@/hooks/use-base-url";
import { getAuthMeOptions } from "@/http/gen/@tanstack/react-query.gen";

export const UserHeaderButton: FC = () => {
  const { data: baseUrl } = useBaseUrl();
  const { data: user } = useQuery({ ...getAuthMeOptions() });

  if (!baseUrl || !user?.avatar) return undefined;

  return (
    <HeaderButton>
      <Image
        source={`${baseUrl}${user.avatar}`}
        style={{ width: 20, height: 20, borderRadius: 999 }}
      />
    </HeaderButton>
  );
};
