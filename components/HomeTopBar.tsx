import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HeaderActions } from "@/components/HeaderActions";
import { useTheme } from "@/hooks/useTheme";

const headerContentTopSpacing = 8;

export function HomeTopBar() {
  const { colors } = useTheme();

  return (
    <SafeAreaView edges={["top"]}>
      <View
        className="mb-2 flex-row items-center justify-between"
        style={{ paddingTop: headerContentTopSpacing }}
      >
        <View className="flex-row items-center gap-2">
          <Ionicons name="location-outline" size={18} color={colors.accent} />
          <View>
            <Text className="text-xs" style={{ color: colors.textMuted }}>
              Localisation
            </Text>
            <Text className="text-lg font-semibold" style={{ color: colors.text }}>
              Toulouse
            </Text>
          </View>
        </View>
        <HeaderActions />
      </View>
    </SafeAreaView>
  );
}
