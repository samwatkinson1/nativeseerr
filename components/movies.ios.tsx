import { useTheme } from "@react-navigation/core";
import { StyleSheet, Text, View } from "react-native";

export default function MoviesScreen() {
  const { colors, fonts } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: colors.text, ...fonts.regular, ...styles.body }}>
        /movies
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { fontSize: 17, lineHeight: 22 },
});
