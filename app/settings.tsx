import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import type { ReactNode } from "react";

import { useTheme } from "@/hooks/useTheme";

const datasetUrl =
  "https://data.toulouse-metropole.fr/explore/dataset/agenda-des-manifestations-culturelles-so-toulouse/";

export default function SettingsScreen() {
  const { colors, isDark, setThemeMode, themeMode } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
    >
      <View
        className="items-center rounded-[32px] px-6 py-8"
        style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
      >
        <View
          className="h-20 w-20 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.background, borderColor: colors.border, borderWidth: 1 }}
        >
          <Text className="text-3xl font-bold" style={{ color: colors.text }}>
            I
          </Text>
        </View>
        <Text className="mt-4 text-2xl font-semibold" style={{ color: colors.text }}>
          Parametres
        </Text>
        <Text className="mt-2 text-center text-sm leading-6" style={{ color: colors.textMuted }}>
          Personnalisez NocTou, consultez les sources et les informations legales.
        </Text>
      </View>

      <SettingsSection colors={colors} title="Apparence">
        <ThemeOption
          colors={colors}
          isSelected={themeMode === "light"}
          label="Mode clair"
          onPress={() => void setThemeMode("light")}
        />
        <ThemeOption
          colors={colors}
          isSelected={themeMode === "dark"}
          label="Mode sombre"
          onPress={() => void setThemeMode("dark")}
        />
        <Text className="mt-3 text-xs leading-5" style={{ color: colors.textMuted }}>
          Vous pouvez aussi basculer le theme depuis l icone en haut a droite de l accueil.
        </Text>
      </SettingsSection>

      <SettingsSection colors={colors} title="Donnees">
        <SettingsLink
          colors={colors}
          description="Agenda culturel publie par Toulouse Metropole."
          icon="globe-outline"
          label="Source Open Data"
          onPress={() => void Linking.openURL(datasetUrl)}
        />
      </SettingsSection>

      <SettingsSection colors={colors} title="Legal">
        <SettingsLink
          colors={colors}
          description="Credits, usage des donnees et responsabilites."
          icon="document-text-outline"
          label="Mentions legales"
          onPress={() => router.push("/legal")}
        />
        <SettingsLink
          colors={colors}
          description="Conditions generales d utilisation de NocTou."
          icon="shield-checkmark-outline"
          label="CGU"
          onPress={() => router.push("/terms")}
        />
        <SettingsLink
          colors={colors}
          description="Comment vos donnees locales sont traitees."
          icon="lock-closed-outline"
          label="Politique de confidentialite"
          onPress={() => router.push("/privacy")}
        />
      </SettingsSection>

      <View className="mt-2 px-2">
        <Text className="text-center text-xs" style={{ color: colors.textMuted }}>
          NocTou v1.0.0 · {isDark ? "Theme sombre" : "Theme clair"}
        </Text>
      </View>
    </ScrollView>
  );
}

interface SettingsSectionProps {
  title: string;
  colors: ReturnType<typeof useTheme>["colors"];
  children: ReactNode;
}

function SettingsSection({ title, colors, children }: SettingsSectionProps) {
  return (
    <View className="mt-4">
      <Text className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: colors.textMuted }}>
        {title}
      </Text>
      <View
        className="gap-3 rounded-[28px] p-4"
        style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
      >
        {children}
      </View>
    </View>
  );
}

interface ThemeOptionProps {
  label: string;
  isSelected: boolean;
  colors: ReturnType<typeof useTheme>["colors"];
  onPress: () => void;
}

function ThemeOption({ label, isSelected, colors, onPress }: ThemeOptionProps) {
  return (
    <Pressable
      className="flex-row items-center justify-between rounded-2xl px-4 py-3"
      style={{
        backgroundColor: isSelected ? colors.background : "transparent",
        borderColor: isSelected ? colors.border : "transparent",
        borderWidth: 1,
      }}
      onPress={onPress}
    >
      <Text className="text-base font-medium" style={{ color: colors.text }}>
        {label}
      </Text>
      {isSelected ? <Ionicons name="checkmark-circle" size={20} color={colors.text} /> : null}
    </Pressable>
  );
}

interface SettingsLinkProps {
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  colors: ReturnType<typeof useTheme>["colors"];
  onPress: () => void;
}

function SettingsLink({ label, description, icon, colors, onPress }: SettingsLinkProps) {
  return (
    <Pressable
      className="flex-row items-center gap-3 rounded-2xl px-3 py-3"
      style={{ backgroundColor: colors.background }}
      onPress={onPress}
    >
      <View
        className="h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
      >
        <Ionicons name={icon} size={18} color={colors.text} />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold" style={{ color: colors.text }}>
          {label}
        </Text>
        <Text className="mt-1 text-sm leading-5" style={{ color: colors.textMuted }}>
          {description}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}
