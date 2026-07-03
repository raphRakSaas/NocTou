import { Image, Pressable, Text, View } from "react-native";

import type { EventItem } from "@/types/event";

interface EventRailCardProps {
  eventItem: EventItem;
  onPress: () => void;
}

export function EventRailCard({ eventItem, onPress }: EventRailCardProps) {
  const railImageUrl = eventItem.imagePreviewUrl ?? eventItem.imageUrl;

  return (
    <Pressable
      className="mr-4 w-[268px] overflow-hidden rounded-[28px] border border-slate-200 bg-white"
      onPress={onPress}
    >
      {railImageUrl ? (
        <Image
          source={{ uri: railImageUrl }}
          resizeMode="cover"
          fadeDuration={100}
          style={{ width: "100%", height: 152 }}
        />
      ) : (
        <View className="h-[152px] bg-slate-100" />
      )}

      <View className="px-4 py-4">
        <Text className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          {eventItem.category}
        </Text>
        <Text className="mt-2 text-xl font-semibold leading-7 text-slate-950" numberOfLines={2}>
          {eventItem.title}
        </Text>
        <Text className="mt-2 text-sm text-slate-600">{eventItem.displayDate}</Text>
        <Text className="mt-1 text-sm text-slate-500" numberOfLines={1}>
          {eventItem.venueName}
        </Text>
      </View>
    </Pressable>
  );
}
