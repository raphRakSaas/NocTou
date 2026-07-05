import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { useTheme } from "@/hooks/useTheme";

const wordmarkEnterDurationMs = 520;
const wordmarkThemePulseMs = 140;

export function SortiRoseWordmark() {
  const { colors, isDark } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-8)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const hasAnimatedIn = useRef(false);

  useEffect(() => {
    if (!hasAnimatedIn.current) {
      hasAnimatedIn.current = true;
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: wordmarkEnterDurationMs,
          useNativeDriver: true,
        }),
        Animated.spring(translateX, {
          toValue: 0,
          friction: 8,
          tension: 70,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.94,
        duration: wordmarkThemePulseMs,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isDark, opacity, scale, translateX]);

  return (
    <Animated.Text
      accessibilityRole="header"
      style={{
        opacity,
        transform: [{ translateX }, { scale }],
        fontSize: 22,
        fontWeight: "600",
        color: colors.accent,
        letterSpacing: -0.4,
      }}
    >
      SortiRose
    </Animated.Text>
  );
}
