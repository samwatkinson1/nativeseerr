import { useTheme } from "@react-navigation/core";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  PlatformColor,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { Cast } from "@/http/gen";
import { rgbToRgba } from "@/utils/rgb-to-rgba";

export interface CastCardProps {
  cast: Cast;
  style?: StyleProp<ViewStyle>;
}

export function CastCard({ cast, style }: CastCardProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={StyleSheet.compose({ ...styles.container, ...styles.margin }, style)}>
      <Link href={`/person/${cast.id}`} asChild>
        <Link.Trigger>
          <Pressable
            style={{
              ...styles.card,
              ...styles.radius,
              borderColor: colors.border,
              backgroundColor: colors.card,
            }}
          >
            <LinearGradient
              colors={[rgbToRgba(colors.card, 0), rgbToRgba(colors.background, 100)]}
              locations={[0.67, 1]}
              style={{ ...StyleSheet.absoluteFillObject, ...styles.radius }}
            />

            <View style={styles.imageContainer}>
              <Image
                source={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${cast.profilePath}`}
                contentFit="cover"
                style={styles.image}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <Text
                style={{ ...styles.body, ...fonts.bold, textAlign: "center", color: colors.text }}
              >
                {cast.name}
              </Text>
              <Text style={{ ...styles.subhead, ...fonts.regular, textAlign: "center" }}>
                {cast.character}
              </Text>
            </View>
          </Pressable>
        </Link.Trigger>
        <Link.Preview style={{ backgroundColor: colors.card }} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: 144, height: 216 },
  card: {
    width: "100%",
    height: "100%",
    padding: 4,
    borderStyle: "solid",
    borderWidth: 1,
    gap: 16,
  },
  radius: { borderRadius: 12 },
  imageContainer: { width: "100%", height: "50%", marginTop: 8, alignItems: "center" },
  image: { borderRadius: 9999, width: "75%", height: "100%" },
  margin: { marginBottom: 12 },
  body: { fontSize: 17, lineHeight: 22 },
  subhead: { fontSize: 15, lineHeight: 20, color: PlatformColor("secondaryLabel") },
});
