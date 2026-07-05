import { Linking, Pressable, Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

const sourceUrl =
  "https://data.toulouse-metropole.fr/explore/dataset/agenda-des-manifestations-culturelles-so-toulouse/";

export function Footer() {
  const { colors } = useTheme();

  return (
    <View className="px-5 py-4" style={{ borderTopColor: colors.border, borderTopWidth: 1 }}>
      <Text className="text-center text-xs" style={{ color: colors.textMuted }}>
        Donnees fournies par Toulouse Metropole.
      </Text>
      <Pressable className="mt-2" onPress={() => void Linking.openURL(sourceUrl)}>
        <Text className="text-center text-xs font-semibold" style={{ color: colors.accentSoftText }}>
          Consulter la source Open Data
        </Text>
      </Pressable>
    </View>
  );
}
