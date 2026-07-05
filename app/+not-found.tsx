import { Link } from "expo-router";
import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <View className="flex-1 items-center justify-center px-8" style={{ backgroundColor: colors.background }}>
      <Text className="text-2xl font-semibold" style={{ color: colors.text }}>
        Page introuvable
      </Text>
      <Text className="mt-3 text-center text-base leading-6" style={{ color: colors.textMuted }}>
        Le contenu demande est introuvable ou indisponible.
      </Text>
      <Link href="/" className="mt-6 text-base font-semibold" style={{ color: colors.accentSoftText }}>
        Revenir a l accueil
      </Link>
    </View>
  );
}
