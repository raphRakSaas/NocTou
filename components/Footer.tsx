import { Linking, Pressable, Text, View } from "react-native";

const sourceUrl =
  "https://data.toulouse-metropole.fr/explore/dataset/agenda-des-manifestations-culturelles-so-toulouse/";

export function Footer() {
  return (
    <View className="border-t border-slate-200 px-5 py-4">
      <Text className="text-center text-xs text-slate-500">Donnees fournies par Toulouse Metropole.</Text>
      <Pressable className="mt-2" onPress={() => void Linking.openURL(sourceUrl)}>
        <Text className="text-center text-xs font-semibold text-blue-700">Consulter la source Open Data</Text>
      </Pressable>
    </View>
  );
}
