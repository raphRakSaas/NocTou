import { Linking, Pressable, ScrollView, Text, View } from "react-native";

import { Footer } from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";

const datasetUrl =
  "https://data.toulouse-metropole.fr/explore/dataset/agenda-des-manifestations-culturelles-so-toulouse/";
const licenceUrl = "https://www.etalab.gouv.fr/wp-content/uploads/2014/05/Licence_Ouverte.pdf";

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
          SortiRose est un projet personnel, developpe et publie a titre non professionnel par un
          developpeur independant. Conformement a l article 6-III de la loi n. 2004-575 du 21 juin
          2004 pour la confiance dans l economie numerique (LCEN), les editeurs non professionnels
          peuvent ne pas rendre publiques certaines informations d identification, des lors que
          celles-ci restent accessibles a l hebergeur ou a la plateforme de distribution.
        </Text>

        <View className="mt-6 gap-4">
          <LegalBlock
            colors={colors}
            title="Editeur de l'application"
            description="Raphael, developpeur independant, editeur non professionnel au sens de la LCEN. Contact : raphael.rakotonaivo.saas@gmail.com."
          />
          <LegalBlock
            colors={colors}
            title="Hebergement"
            description="SortiRose est distribuee via l'App Store (Apple Inc.) et le Google Play Store (Google Ireland Limited). L'application ne dispose pas de serveur propre : elle interroge directement, depuis l'appareil de l'utilisateur, les API publiques listees ci-dessous."
          />
          <LegalBlock
            colors={colors}
            title="Propriete intellectuelle"
            description="La structure, le design, les textes et le code de l'application SortiRose sont la propriete de l'editeur, sauf mention contraire. Les donnees d'evenements affichees restent la propriete de leurs producteurs respectifs (Toulouse Metropole, lieux culturels, organisateurs)."
          />
          <LegalBlock
            colors={colors}
            title="Source des donnees"
            description="Agenda des manifestations culturelles - So Toulouse, publie en Open Data par Toulouse Metropole sous Licence Ouverte / Open Licence version 2.0 (Etalab). Cette licence autorise la reutilisation gratuite des donnees, sous reserve de mentionner leur source et leur date de derniere mise a jour, ce que fait SortiRose sur chaque ecran listant des sorties."
          />
          <LegalBlock
            colors={colors}
            title="Enrichissement des visuels"
            description="Certains visuels sont recuperes via l'API OpenAgenda ou, a defaut, extraits automatiquement de la page de reservation du site tiers indique par la source Open Data (recuperation de la miniature publique de la page). L'editeur ne revendique aucun droit sur ces visuels, qui restent la propriete de leurs auteurs ou des organisateurs des evenements. Toute demande de retrait d'un visuel peut etre adressee a raphael.rakotonaivo.saas@gmail.com."
          />
          <LegalBlock
            colors={colors}
            title="Usage"
            description="Cette application ne modifie pas les donnees sources et n'agit que comme interface de consultation. Elle ne garantit ni l'exactitude ni l'exhaustivite des informations affichees."
          />
          <LegalBlock
            colors={colors}
            title="Reservation"
            description="Les liens de reservation renvoient vers des sites tiers independants de SortiRose. L'editeur n'est pas partie aux transactions qui y sont effectuees et decline toute responsabilite quant a leur execution."
          />
        </View>

        <View className="mt-6 flex-row gap-3">
          <Pressable
            className="flex-1 items-center rounded-full bg-blue-700 px-5 py-4"
            onPress={() => void Linking.openURL(datasetUrl)}
          >
            <Text className="text-center font-semibold text-white">Page Open Data</Text>
          </Pressable>
          <Pressable
            className="flex-1 items-center rounded-full px-5 py-4"
            style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1 }}
            onPress={() => void Linking.openURL(licenceUrl)}
          >
            <Text className="text-center font-semibold" style={{ color: colors.text }}>
              Texte de la licence
            </Text>
          </Pressable>
        </View>
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
