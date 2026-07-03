import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 px-8">
      <Text className="text-2xl font-semibold text-slate-950">Page introuvable</Text>
      <Text className="mt-3 text-center text-base leading-6 text-slate-600">
        Le contenu demande est introuvable ou indisponible.
      </Text>
      <Link href="/" className="mt-6 text-base font-semibold text-blue-700">
        Revenir a l accueil
      </Link>
    </View>
  );
}
