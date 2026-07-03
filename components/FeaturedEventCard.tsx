import { Image, Pressable, Text, View } from "react-native";

import type { EventItem } from "@/types/event";

interface FeaturedEventCardProps {
  eventItem: EventItem;
  onPress: () => void;
}

export function FeaturedEventCard({ eventItem, onPress }: FeaturedEventCardProps) {
  const featuredImageUrl = eventItem.imageUrl ?? eventItem.imagePreviewUrl;

  if (!featuredImageUrl) {
    return null;
  }

  return (
    <Pressable
      className="mr-4 w-[286px] overflow-hidden rounded-[28px] bg-slate-900"
      onPress={onPress}
    >
      <Image
        source={{ uri: featuredImageUrl }}
        resizeMode="cover"
        fadeDuration={120}
        style={{ width: "100%", height: 208 }}
      />
      <View className="absolute inset-0 bg-black/28" />
      <View className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-12">
        <View className="self-start rounded-full bg-white/20 px-3 py-1">
          <Text className="text-xs font-semibold uppercase tracking-wide text-white">
            {eventItem.category}
          </Text>
        </View>
        <Text className="mt-3 text-[24px] font-semibold leading-7 text-white">{eventItem.title}</Text>
        <Text className="mt-2 text-sm text-white/85">{eventItem.displayDate}</Text>
        <Text className="mt-1 text-sm text-white/75">{eventItem.venueName}</Text>
      </View>
    </Pressable>
  );
}
