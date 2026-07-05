import { Image, View, type ImageStyle, type StyleProp, type ViewStyle } from "react-native";

import { IllustrativeImageBadge } from "@/components/IllustrativeImageBadge";

interface EventImageWithBadgeProps {
  imageUrl: string;
  isIllustrativeFallback: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  badgeVariant?: "compact" | "detail";
  badgePosition?: "bottom-left" | "top-left";
  fadeDuration?: number;
  resizeMode?: "cover" | "contain";
}

export function EventImageWithBadge({
  imageUrl,
  isIllustrativeFallback,
  containerStyle,
  imageStyle,
  badgeVariant = "compact",
  badgePosition = "bottom-left",
  fadeDuration = 100,
  resizeMode = "cover",
}: EventImageWithBadgeProps) {
  const badgePositionClass =
    badgePosition === "top-left" ? "absolute left-2 top-2" : "absolute bottom-2 left-2";

  return (
    <View style={containerStyle}>
      <Image
        source={{ uri: imageUrl }}
        resizeMode={resizeMode}
        fadeDuration={fadeDuration}
        style={imageStyle}
        accessibilityIgnoresInvertColors
        importantForAccessibility="no"
      />
      {isIllustrativeFallback ? (
        <View className={badgePositionClass}>
          <IllustrativeImageBadge variant={badgeVariant} />
        </View>
      ) : null}
    </View>
  );
}
