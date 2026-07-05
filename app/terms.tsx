import { ScrollView, Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

export default function TermsScreen() {
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
          Conditions generales d utilisation
        </Text>
        <Text className="mt-4 text-base leading-7" style={{ color: colors.textMuted }}>
          NocTou est une application de consultation d evenements culturels a Toulouse. En utilisant
          l application, vous acceptez d acceder aux contenus a titre informatif.
        </Text>

        <LegalBlock
          colors={colors}
          title="Objet"
          description="NocTou centralise des informations publiques sur les sorties culturelles. L application ne garantit pas l exhaustivite ni la disponibilite permanente des evenements."
        />
        <LegalBlock
          colors={colors}
          title="Reservations"
          description="Les reservations se font sur les sites tiers indiques dans chaque fiche lorsque cette information est disponible."
        />
        <LegalBlock
          colors={colors}
          title="Responsabilite"
          description="Les horaires, tarifs et descriptions proviennent des sources officielles. Verifiez toujours les informations avant de vous deplacer."
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
