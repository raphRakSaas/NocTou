import { Linking, Pressable, ScrollView, Text, View } from "react-native";

import { Footer } from "@/components/Footer";

const datasetUrl =
  "https://data.toulouse-metropole.fr/explore/dataset/agenda-des-manifestations-culturelles-so-toulouse/";

export default function LegalScreen() {
  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>
      <View className="rounded-[32px] border border-slate-200 bg-white px-6 py-6">
        <Text className="text-3xl font-semibold text-slate-950">Mentions legales</Text>
        <Text className="mt-4 text-base leading-7 text-slate-700">
          NocTou centralise les sorties culturelles de Toulouse a partir des donnees Open Data
          publiques mises a disposition par Toulouse Metropole.
        </Text>

        <View className="mt-6 gap-4">
          <LegalBlock
            title="Source des donnees"
            description="Agenda des manifestations culturelles - So Toulouse, publie par Toulouse Metropole."
          />
          <LegalBlock
            title="Usage"
            description="Cette application ne modifie pas les donnees sources et n'agit que comme interface de consultation."
          />
          <LegalBlock
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
}

function LegalBlock({ title, description }: LegalBlockProps) {
  return (
    <View className="rounded-2xl bg-slate-50 px-4 py-4">
      <Text className="text-sm font-semibold text-slate-900">{title}</Text>
      <Text className="mt-2 text-sm leading-6 text-slate-700">{description}</Text>
    </View>
  );
}
