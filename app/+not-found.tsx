import { Unmatched, usePathname } from "expo-router";

export default function NotFound() {
  const pathname = usePathname();
  console.warn("+not-found", { pathname });
  return <Unmatched />;
}
