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
          SortiRose est une application de consultation d evenements culturels a Toulouse, developpee
          et editee a titre personnel par un developpeur independant. En utilisant l application,
          vous acceptez les presentes conditions generales d utilisation (CGU).
        </Text>

        <LegalBlock
          colors={colors}
          title="Objet"
          description="SortiRose centralise des informations publiques sur les sorties culturelles a Toulouse. L application ne garantit pas l exhaustivite, l exactitude ni la disponibilite permanente des evenements affiches, ces donnees provenant de sources tierces."
        />
        <LegalBlock
          colors={colors}
          title="Acces au service"
          description="L application est proposee gratuitement et sans creation de compte. L acces necessite une connexion internet. L editeur ne garantit pas une disponibilite continue du service, notamment en cas de maintenance ou d indisponibilite des sources de donnees tierces (Toulouse Metropole, OpenAgenda)."
        />
        <LegalBlock
          colors={colors}
          title="Reservations"
          description="Les reservations et achats de billets se font exclusivement sur les sites tiers indiques dans chaque fiche evenement, lorsque cette information est disponible. SortiRose n intervient pas dans ces transactions et n est pas responsable des conditions de vente, des paiements ou de la relation contractuelle entre l utilisateur et l organisateur ou la billetterie."
        />
        <LegalBlock
          colors={colors}
          title="Propriete intellectuelle"
          description="L application, son design, son code et sa marque sont proteges et restent la propriete de l editeur. Les donnees d evenements et visuels affiches restent la propriete de leurs producteurs et auteurs respectifs, reutilises conformement aux licences applicables."
        />
        <LegalBlock
          colors={colors}
          title="Responsabilite"
          description="Les horaires, tarifs et descriptions proviennent des sources officielles listees dans les mentions legales. Verifiez toujours ces informations aupres de l organisateur avant de vous deplacer. L editeur ne saurait etre tenu responsable des consequences d une information erronee, incomplete ou perimee provenant d une source tierce."
        />
        <LegalBlock
          colors={colors}
          title="Modification des CGU"
          description="L editeur se reserve le droit de modifier les presentes CGU a tout moment, notamment pour les adapter a l evolution des fonctionnalites de l application. La version applicable est celle disponible dans l application au moment de son utilisation."
        />
        <LegalBlock
          colors={colors}
          title="Droit applicable et litiges"
          description="Les presentes CGU sont soumises au droit francais. En cas de litige et a defaut de resolution amiable, les tribunaux francais competents seront seuls saisis."
        />
        <LegalBlock
          colors={colors}
          title="Contact"
          description="Pour toute question relative aux presentes CGU : raphael.rakotonaivo.saas@gmail.com."
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
