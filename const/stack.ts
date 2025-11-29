import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const formSheet: NativeStackNavigationOptions = {
  presentation: "formSheet",
  sheetAllowedDetents: "fitToContents",
  sheetGrabberVisible: true,
  contentStyle: { backgroundColor: "transparent" },
  headerTitle: "Filters",
};
