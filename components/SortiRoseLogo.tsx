import { Image, Text, View, type ImageStyle, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "@/hooks/useTheme";

const sortiRoseLogoSource = require("@/assets/SortiRose.png");

interface SortiRoseLogoProps {
  size?: number;
  showWordmark?: boolean;
  subtitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

export function SortiRoseLogo({
  size = 40,
  showWordmark = false,
  subtitle,
  containerStyle,
  imageStyle,
}: SortiRoseLogoProps) {
  const { colors } = useTheme();

  return (
    <View className="flex-row items-center gap-3" style={containerStyle}>
      <Image
        source={sortiRoseLogoSource}
        accessibilityLabel="SortiRose"
        resizeMode="contain"
        style={[{ width: size, height: size }, imageStyle]}
      />
      {showWordmark || subtitle ? (
        <View className="flex-shrink">
          {showWordmark ? (
            <Text className="text-xl font-semibold" style={{ color: colors.accent }}>
              SortiRose
            </Text>
          ) : null}
          {subtitle ? (
            <Text
              className={`text-sm ${showWordmark ? "mt-0.5" : ""}`}
              style={{ color: colors.textMuted }}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
