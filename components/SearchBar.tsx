import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

import { GlassSurface } from "@/components/GlassSurface";
import { useTheme } from "@/hooks/useTheme";

interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Rechercher une sortie...",
}: SearchBarProps) {
  const { colors } = useTheme();

  return (
    <GlassSurface borderRadius={999} style={{ marginTop: 8 }}>
      <View className="flex-row items-center gap-3 px-4 py-3">
        <Ionicons name="search-outline" size={18} color={colors.textMuted} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          className="flex-1 text-base"
          style={{ color: colors.text }}
        />
      </View>
    </GlassSurface>
  );
}
