import { BlurView } from "expo-blur";
import type { ReactNode } from "react";
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "@/hooks/useTheme";

interface GlassSurfaceProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  intensity?: number;
}

export function GlassSurface({
  children,
  style,
  borderRadius = 24,
  intensity = 28,
}: GlassSurfaceProps) {
  const { colors, isDark } = useTheme();
  const shellStyle = {
    borderRadius,
    borderColor: colors.glass.border,
    borderWidth: 1,
    overflow: "hidden" as const,
  };

  if (Platform.OS === "ios") {
    return (
      <View style={[shellStyle, style]}>
        <BlurView intensity={intensity} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFillObject} />
        <View style={{ backgroundColor: colors.glass.background }}>{children}</View>
      </View>
    );
  }

  return (
    <View style={[shellStyle, { backgroundColor: colors.glass.background }, style]}>{children}</View>
  );
}
