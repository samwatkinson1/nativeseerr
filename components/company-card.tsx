import { useTheme } from "@react-navigation/core";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Href, Link } from "expo-router";
import { FC } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export interface Company {
  name: string;
  image: string;
  url: Href;
}

export interface CompanyCardProps {
  company: Company;
  style?: StyleProp<ViewStyle>;
}

export const CompanyCard: FC<CompanyCardProps> = ({ company, style }) => {
  const { colors } = useTheme();

  const { image, url } = company;

  return (
    <View
      style={StyleSheet.compose(
        { ...styles.base, ...styles.margin, ...styles.radius, borderColor: colors.border },
        style
      )}
    >
      <LinearGradient
        colors={["#1e2939", "#101828"]}
        locations={[0.63, 1]}
        style={{ ...styles.gradient, ...styles.radius }}
      />

      <Link href={url}>
        <Link.Trigger>
          <Image
            source={image}
            style={{ ...styles.poster, ...styles.radius }}
            contentFit="contain"
          />
        </Link.Trigger>
        <Link.Preview style={{ backgroundColor: colors.card }} />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    width: 224,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderWidth: 1,
  },
  gradient: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  poster: { width: 160, height: 64 },
  margin: { marginBottom: 12 },
  radius: { borderRadius: 12 },
});
