import { useTheme } from "@react-navigation/core";
import { SymbolView } from "expo-symbols";
import { FC, PropsWithChildren } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

export interface TagProps extends PressableProps {
  hideIcon?: boolean;
}

export const Tag: FC<PropsWithChildren<TagProps>> = ({ hideIcon = false, ...props }) => {
  const { colors, fonts } = useTheme();
  return (
    <Pressable
      {...props}
      // fixme
      style={
        StyleSheet.compose(
          [{ ...styles.link, backgroundColor: colors.card, borderColor: colors.border }],
          props.style as StyleProp<ViewStyle>
        ) as StyleProp<ViewStyle>
      }
    >
      <View style={styles.container}>
        {!hideIcon && <SymbolView name="tag" style={styles.icon} tintColor={colors.text} />}
        <Text style={{ ...styles.text, ...fonts.regular, color: colors.text }}>
          {props.children}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, borderWidth: 1 },
  container: { flexDirection: "row", alignItems: "center", gap: 4 },
  icon: { height: 16, width: 16 },
  text: { fontSize: 13, lineHeight: 18 },
});
