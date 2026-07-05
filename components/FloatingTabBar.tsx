import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/useTheme";

const tabBarCompactHeight = 58;
const tabBarExpandedHeight = 76;
const floatingTabBarBottomOffset = 4;
const tabBarHeightAnimationMs = 180;
const tabBarPillPaddingHorizontal = 16;
const tabBarItemGap = 14;
const tabBarIconSize = 22;
const tabBarItemHitSlop = 10;

export const floatingTabBarHeight = tabBarExpandedHeight;

export function getFloatingTabBarClearance(safeAreaBottom: number, extraSpacing = 16): number {
  return tabBarExpandedHeight + Math.max(safeAreaBottom, 12) + floatingTabBarBottomOffset + extraSpacing;
}

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [labelsVisible, setLabelsVisible] = useState(false);
  const tabBarHeight = useRef(new Animated.Value(tabBarCompactHeight)).current;

  useEffect(() => {
    Animated.timing(tabBarHeight, {
      toValue: labelsVisible ? tabBarExpandedHeight : tabBarCompactHeight,
      duration: tabBarHeightAnimationMs,
      useNativeDriver: false,
    }).start();
  }, [labelsVisible, tabBarHeight]);

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        {
          bottom: Math.max(safeAreaInsets.bottom, 12) + floatingTabBarBottomOffset,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.pill,
          {
            backgroundColor: colors.tabBar.background,
            borderColor: colors.tabBar.border,
            shadowColor: colors.tabBar.shadow,
            height: tabBarHeight,
          },
        ]}
      >
        <View
          style={[
            styles.tabRow,
            {
              paddingHorizontal: tabBarPillPaddingHorizontal,
              gap: tabBarItemGap,
            },
          ]}
        >
          {state.routes.map((route, routeIndex) => {
            const isFocused = state.index === routeIndex;
            const { options } = descriptors[route.key];
            const label =
              typeof options.tabBarLabel === "string"
                ? options.tabBarLabel
                : typeof options.title === "string"
                  ? options.title
                  : route.name;
            const activeBackgroundColor = options.tabBarActiveBackgroundColor ?? colors.tabBar.activeBackground;
            const inactiveTintColor = options.tabBarInactiveTintColor ?? colors.tabBar.inactiveTint;
            const activeTintColor = options.tabBarActiveTintColor ?? colors.tabBar.activeTint;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (isFocused) {
                setLabelsVisible((currentValue) => !currentValue);
                return;
              }

              if (!event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }

              setLabelsVisible(true);
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <Pressable
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
                className="items-center justify-center"
                hitSlop={tabBarItemHitSlop}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <View
                  className="items-center justify-center rounded-full"
                  style={{
                    backgroundColor: isFocused ? activeBackgroundColor : "transparent",
                    minWidth: labelsVisible && isFocused ? 92 : 48,
                    minHeight: labelsVisible && isFocused ? 56 : 48,
                    paddingHorizontal: labelsVisible && isFocused ? 14 : 12,
                    paddingVertical: labelsVisible && isFocused ? 8 : 0,
                  }}
                >
                  {options.tabBarIcon?.({
                    focused: isFocused,
                    color: isFocused ? activeTintColor : inactiveTintColor,
                    size: tabBarIconSize,
                  })}
                  {labelsVisible && isFocused ? (
                    <Text
                      className="mt-1 text-[11px] font-semibold"
                      style={{ color: activeTintColor }}
                      numberOfLines={1}
                    >
                      {label}
                    </Text>
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  pill: {
    alignSelf: "center",
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 1,
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
