import { useQuery } from "@tanstack/react-query";
import { getColors } from "react-native-image-colors";

export const useContrastColour = (url: string) => {
  return useQuery({
    throwOnError: false,
    queryKey: ["contrastColour", btoa(url)],
    queryFn: () => getColors(url),
    select: (result) => {
      let colour;

      if (result.platform === "android") colour = result.average;
      if (result.platform === "ios") colour = result.background;
      if (!colour) return;

      const match = colour.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
      if (!match) return;

      const [_, r, g, b] = match;
      const y = parseInt(r, 16) * 0.299 + parseInt(g, 16) * 0.587 + parseInt(b, 16) * 0.114;
      return y > 186 ? "black" : "white";
    },
  });
};
