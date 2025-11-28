import { useTheme } from "@react-navigation/core";
import { GlassView, GlassViewProps } from "expo-glass-effect";
import { SymbolView } from "expo-symbols";
import { FC, PropsWithChildren } from "react";
import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";

export interface TagProps extends GlassViewProps {
  hideIcon?: boolean;
  onPress?: PressableProps["onPress"];
}

export const Tag: FC<PropsWithChildren<TagProps>> = ({ hideIcon = false, onPress, ...props }) => {
  const { colors, fonts } = useTheme();
  return (
    <GlassView
      glassEffectStyle="clear"
      {...props}
      isInteractive
      style={StyleSheet.compose(styles.link, props.style)}
    >
      <Pressable onPress={onPress}>
        <View style={styles.container}>
          {!hideIcon && <SymbolView name="tag" style={styles.icon} tintColor={colors.text} />}
          <Text style={{ ...styles.text, ...fonts.regular, color: colors.text }}>
            {props.children}
          </Text>
        </View>
      </Pressable>
    </GlassView>
  );
};

const styles = StyleSheet.create({
  link: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  container: { flexDirection: "row", alignItems: "center", gap: 4 },
  icon: { height: 16, width: 16 },
  text: { fontSize: 13, lineHeight: 18 },
});
