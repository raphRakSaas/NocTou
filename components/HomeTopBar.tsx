import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HeaderActions } from "@/components/HeaderActions";
import { SortiRoseLogo } from "@/components/SortiRoseLogo";
import { SortiRoseWordmark } from "@/components/SortiRoseWordmark";

const headerContentTopSpacing = 8;
const headerLogoSize = 36;

export function HomeTopBar() {
  return (
    <SafeAreaView edges={["top"]}>
      <View
        className="mb-4 flex-row items-center justify-between"
        style={{ paddingTop: headerContentTopSpacing }}
      >
        <View className="flex-row items-center gap-2.5">
          <SortiRoseLogo size={headerLogoSize} />
          <SortiRoseWordmark />
        </View>
        <HeaderActions />
      </View>
    </SafeAreaView>
  );
}
