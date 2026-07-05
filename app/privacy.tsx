import { ScrollView, Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

export default function PrivacyScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
    >
      <View
        className="rounded-[32px] px-6 py-6"
        style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
      >
        <Text className="text-3xl font-semibold" style={{ color: colors.text }}>
          Politique de confidentialite
        </Text>
        <Text className="mt-4 text-base leading-7" style={{ color: colors.textMuted }}>
          NocTou est concu pour limiter la collecte de donnees personnelles. La majorite des
          informations reste stockee localement sur votre appareil.
        </Text>

        <LegalBlock
          colors={colors}
          title="Donnees locales"
          description="Vos favoris et votre preference de theme sont enregistres sur l appareil via le stockage local de l application."
        />
        <LegalBlock
          colors={colors}
          title="Geolocalisation"
          description="La position n est demandee que si vous activez le tri par proximite. Elle sert uniquement a calculer une distance avec les evenements."
        />
        <LegalBlock
          colors={colors}
          title="Services tiers"
          description="NocTou interroge des API publiques pour afficher les evenements et peut ouvrir des liens externes de reservation ou de cartographie."
        />
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
    <View className="mt-6 rounded-2xl px-4 py-4" style={{ backgroundColor: colors.background }}>
      <Text className="text-sm font-semibold" style={{ color: colors.text }}>
        {title}
      </Text>
      <Text className="mt-2 text-sm leading-6" style={{ color: colors.textMuted }}>
        {description}
      </Text>
    </View>
  );
}
