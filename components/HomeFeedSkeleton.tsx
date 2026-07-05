import { View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

export function HomeFeedSkeleton() {
  const { colors } = useTheme();

  return (
    <View className="flex-1 px-4 pt-4" style={{ backgroundColor: colors.background }}>
      <View className="h-[320px] rounded-[32px]" style={{ backgroundColor: colors.surfaceMuted }} />
      <View className="mt-6 flex-row gap-2">
        <View className="h-10 flex-1 rounded-full" style={{ backgroundColor: colors.surfaceMuted }} />
        <View className="h-10 flex-1 rounded-full" style={{ backgroundColor: colors.surfaceMuted }} />
        <View className="h-10 flex-1 rounded-full" style={{ backgroundColor: colors.surfaceMuted }} />
      </View>
      <View className="mt-6 flex-row gap-3">
        <View className="h-[220px] flex-1 rounded-[28px]" style={{ backgroundColor: colors.surfaceMuted }} />
        <View className="h-[220px] flex-1 rounded-[28px]" style={{ backgroundColor: colors.surfaceMuted }} />
      </View>
      <View className="mt-4 gap-4">
        <View className="h-[180px] rounded-[28px]" style={{ backgroundColor: colors.surface }} />
        <View className="h-[180px] rounded-[28px]" style={{ backgroundColor: colors.surface }} />
      </View>
    </View>
  );
}
