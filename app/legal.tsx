import { Linking, Pressable, ScrollView, Text, View } from "react-native";

import { Footer } from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";

const datasetUrl =
  "https://data.toulouse-metropole.fr/explore/dataset/agenda-des-manifestations-culturelles-so-toulouse/";

export default function LegalScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
    >
      <View
        className="rounded-[32px] px-6 py-6"
        style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
      >
        <Text className="text-3xl font-semibold" style={{ color: colors.text }}>
          Mentions legales
        </Text>
        <Text className="mt-4 text-base leading-7" style={{ color: colors.textMuted }}>
          NocTou centralise les sorties culturelles de Toulouse a partir des donnees Open Data
          publiques mises a disposition par Toulouse Metropole.
        </Text>

        <View className="mt-6 gap-4">
          <LegalBlock
            colors={colors}
            title="Source des donnees"
            description="Agenda des manifestations culturelles - So Toulouse, publie par Toulouse Metropole."
          />
          <LegalBlock
            colors={colors}
            title="Usage"
            description="Cette application ne modifie pas les donnees sources et n'agit que comme interface de consultation."
          />
          <LegalBlock
            colors={colors}
            title="Reservation"
            description="Les liens de reservation renvoient vers les sites tiers fournis par la source Open Data lorsqu'ils sont disponibles."
          />
        </View>

        <Pressable
          className="mt-8 items-center rounded-full bg-blue-700 px-5 py-4"
          onPress={() => void Linking.openURL(datasetUrl)}
        >
          <Text className="font-semibold text-white">Ouvrir la page Open Data</Text>
        </Pressable>
      </View>

      <View className="mt-4">
        <Footer />
      </View>
    </ScrollView>
  );
}

interface LegalBlockProps {
  title: string;
  description: string;
  colors: ReturnType<typeof useTheme>["colors"];
}

function LegalBlock({ title, description, colors }: LegalBlockProps) {
  return (
    <View className="rounded-2xl px-4 py-4" style={{ backgroundColor: colors.background }}>
      <Text className="text-sm font-semibold" style={{ color: colors.text }}>
        {title}
      </Text>
      <Text className="mt-2 text-sm leading-6" style={{ color: colors.textMuted }}>
        {description}
      </Text>
    </View>
  );
}
