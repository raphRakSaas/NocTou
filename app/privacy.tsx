import { Linking, Pressable, ScrollView, Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

const cnilComplaintUrl = "https://www.cnil.fr/fr/plaintes";

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
          NocTou est concue pour limiter au maximum la collecte de donnees personnelles. Aucun
          compte n est requis pour utiliser l application.
        </Text>

        <LegalBlock
          colors={colors}
          title="Responsable du traitement"
          description="[A COMPLETER] Raison sociale de l'editeur, adresse, contact : [A COMPLETER - email dedie a la confidentialite]."
        />
        <LegalBlock
          colors={colors}
          title="Donnees traitees"
          description="Favoris et preference de theme (clair/sombre) : stockes uniquement sur l'appareil (stockage local), jamais transmis a un serveur. Position geographique approximative : uniquement si vous activez le tri par proximite."
        />
        <LegalBlock
          colors={colors}
          title="Geolocalisation"
          description="La position n'est demandee, avec votre autorisation explicite via le systeme d'exploitation, que si vous activez le tri par proximite. Elle sert uniquement, en local sur votre appareil, a calculer une distance avec les evenements affiches. Elle n'est ni conservee ni transmise a un serveur de l'editeur. Base legale : consentement (article 6.1.a du RGPD). Vous pouvez retirer ce consentement a tout moment via les reglages de votre appareil."
        />
        <LegalBlock
          colors={colors}
          title="Duree de conservation"
          description="Les favoris et la preference de theme restent sur votre appareil jusqu'a ce que vous les supprimiez ou desinstalliez l'application. Aucune donnee n'est conservee par l'editeur en dehors de votre appareil."
        />
        <LegalBlock
          colors={colors}
          title="Destinataires et services tiers"
          description={
            "Pour afficher les sorties, l'application interroge directement, depuis votre appareil : " +
            "l'API Open Data de Toulouse Metropole, l'API OpenAgenda pour completer certains visuels, " +
            "et, ponctuellement, les pages publiques des sites de reservation tiers pour en extraire une image d'illustration. " +
            "Ces echanges peuvent reveler votre adresse IP a ces services tiers, independamment de tout clic de votre part. " +
            "Aucune donnee personnelle n'est vendue ni partagee a des fins publicitaires."
          }
        />
        <LegalBlock
          colors={colors}
          title="Vos droits"
          description="Conformement au RGPD, vous disposez d'un droit d'acces, de rectification, d'effacement, de limitation et d'opposition sur vos donnees. Les favoris et le theme etant stockes localement, vous pouvez les effacer directement en supprimant les donnees de l'application depuis les reglages de votre telephone. Pour toute autre demande, contactez [A COMPLETER - email]. Vous pouvez egalement introduire une reclamation aupres de la CNIL."
        />
        <LegalBlock
          colors={colors}
          title="Securite"
          description="Les donnees locales sont protegees par les mecanismes de sandboxing d'iOS et d'Android. Aucune donnee personnelle n'est transmise par l'application a un serveur controle par l'editeur."
        />
        <LegalBlock
          colors={colors}
          title="Mise a jour de cette politique"
          description="Cette politique peut evoluer, notamment en cas d'ajout de nouvelles fonctionnalites (compte utilisateur, notifications, mesure d'audience). Toute modification substantielle sera signalee dans l'application."
        />

        <Pressable
          className="mt-6 items-center rounded-full px-5 py-4"
          style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1 }}
          onPress={() => void Linking.openURL(cnilComplaintUrl)}
        >
          <Text className="font-semibold" style={{ color: colors.text }}>
            Deposer une reclamation aupres de la CNIL
          </Text>
        </Pressable>
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
