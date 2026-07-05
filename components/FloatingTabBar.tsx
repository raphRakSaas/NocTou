import { BottomTabBar, type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/useTheme";

const tabBarHorizontalInset = 28;
export const floatingTabBarHeight = 76;
const floatingTabBarBottomOffset = 4;

export function getFloatingTabBarClearance(safeAreaBottom: number, extraSpacing = 16): number {
  return floatingTabBarHeight + Math.max(safeAreaBottom, 12) + floatingTabBarBottomOffset + extraSpacing;
}

export function FloatingTabBar(props: BottomTabBarProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        {
          bottom: Math.max(safeAreaInsets.bottom, 12) + 4,
          paddingHorizontal: tabBarHorizontalInset,
        },
      ]}
    >
      <View
        style={[
          styles.pill,
          {
            backgroundColor: colors.tabBar.background,
            borderColor: colors.tabBar.border,
            shadowColor: colors.tabBar.shadow,
          },
        ]}
      >
        <BottomTabBar {...props} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  pill: {
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 1,
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
  },
});
