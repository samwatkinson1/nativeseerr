import { useQuery } from "@tanstack/react-query";
import { getItemAsync } from "expo-secure-store";

import { store } from "@/const/keys";

export const useBaseUrl = () => {
  return useQuery({
    queryKey: [store.serverUrl],
    queryFn: () => getItemAsync(store.serverUrl),
  });
};
