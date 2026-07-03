import { ActivityIndicator, Pressable, Text, View } from "react-native";

interface ScreenStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  isLoading?: boolean;
  onActionPress?: () => void;
}

export function ScreenState({
  title,
  description,
  actionLabel,
  isLoading = false,
  onActionPress,
}: ScreenStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      {isLoading ? <ActivityIndicator size="small" color="#1D4ED8" /> : null}
      <Text className="mt-4 text-center text-xl font-semibold text-slate-900">{title}</Text>
      <Text className="mt-2 text-center text-sm leading-6 text-slate-600">{description}</Text>
      {actionLabel && onActionPress ? (
        <Pressable
          className="mt-6 rounded-full bg-blue-700 px-5 py-3"
          onPress={onActionPress}
        >
          <Text className="font-semibold text-white">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
