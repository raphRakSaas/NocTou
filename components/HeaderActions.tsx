import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { ReactNode } from "react";
import { Pressable, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

interface HeaderActionsProps {
  trailingContent?: ReactNode;
}

export function HeaderActions({ trailingContent }: HeaderActionsProps) {
  const { colors, isDark, toggleThemeMode } = useTheme();

  return (
    <View className="mr-1 flex-row items-center gap-3">
      {trailingContent}
      <Pressable
        accessibilityLabel={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
        className="h-9 w-9 items-center justify-center rounded-full"
        hitSlop={8}
        style={{ backgroundColor: colors.glass.background, borderColor: colors.glass.border, borderWidth: 1 }}
        onPress={() => void toggleThemeMode()}
      >
        <Ionicons
          name={isDark ? "sunny-outline" : "moon-outline"}
          size={18}
          color={colors.text}
        />
      </Pressable>
      <Pressable
        accessibilityLabel="Ouvrir les parametres"
        className="h-9 w-9 items-center justify-center rounded-full"
        hitSlop={8}
        style={{ backgroundColor: colors.glass.background, borderColor: colors.glass.border, borderWidth: 1 }}
        onPress={() => router.push("/settings")}
      >
        <Ionicons name="settings-outline" size={18} color={colors.text} />
      </Pressable>
    </View>
  );
}
