import CookieManager from "@react-native-cookies/cookies";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await CookieManager.clearAll();
    },
    onSuccess: () => {
      void queryClient.resetQueries();
    },
  });
};
