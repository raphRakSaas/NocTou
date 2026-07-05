import { Text, View } from "react-native";

interface IllustrativeImageBadgeProps {
  variant?: "compact" | "detail";
}

export function IllustrativeImageBadge({ variant = "compact" }: IllustrativeImageBadgeProps) {
  const label = variant === "detail" ? "Image illustrative" : "Illustration";

  return (
    <View
      className="rounded-full px-2.5 py-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
      accessibilityRole="text"
      accessibilityLabel="Image illustrative, non fournie par l'organisateur"
    >
      <Text className="text-[10px] font-semibold uppercase tracking-wide text-white/90">{label}</Text>
    </View>
  );
}
