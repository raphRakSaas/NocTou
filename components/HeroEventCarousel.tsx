import { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

import { SortiRoseLogo } from "@/components/SortiRoseLogo";
import type { EventItem } from "@/types/event";

interface HeroEventCarouselProps {
  eventItems: EventItem[];
  favoriteCount: number;
  onPressEvent: (eventItem: EventItem) => void;
}

export function HeroEventCarousel({
  eventItems,
  favoriteCount,
  onPressEvent,
}: HeroEventCarouselProps) {
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlatList<EventItem>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const heroSlides = useMemo(
    () => eventItems.filter((eventItem) => eventItem.imageUrl || eventItem.imagePreviewUrl).slice(0, 6),
    [eventItems],
  );
  const heroWidth = Math.max(width - 32, 280);

  useEffect(() => {
    if (heroSlides.length <= 1) {
      return;
    }

    const intervalId = setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % heroSlides.length;

        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });

        return nextIndex;
      });
    }, 4200);

    return () => clearInterval(intervalId);
  }, [heroSlides.length]);

  if (heroSlides.length === 0) {
    return (
      <View className="rounded-[32px] bg-slate-950 px-5 pb-5 pt-6">
        <View className="flex-row items-center gap-3">
          <SortiRoseLogo size={40} />
          <View>
            <Text className="text-lg font-semibold text-white">SortiRose</Text>
            <Text className="text-sm text-white/70">Toulouse</Text>
          </View>
        </View>
        <Text className="mt-3 text-[32px] font-semibold leading-9 text-white">
          Les sorties qui donnent envie de sortir ce soir.
        </Text>
        <Text className="mt-3 max-w-[290px] text-sm leading-6 text-white/72">
          Une selection epuree pour parcourir Toulouse vite, bien, et sans bruit visuel.
        </Text>
        <View className="mt-5 flex-row flex-wrap gap-2">
          <View className="rounded-full bg-white/10 px-3 py-2">
            <Text className="text-xs font-semibold text-white/90">{favoriteCount} favoris</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="overflow-hidden rounded-[32px] bg-slate-950">
      <FlatList
        ref={flatListRef}
        data={heroSlides}
        horizontal
        pagingEnabled
        keyExtractor={(eventItem) => `hero-${eventItem.id}`}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPressEvent(item)}
            style={{ width: heroWidth, height: 320 }}
          >
            <Image
              source={{ uri: item.imageUrl ?? item.imagePreviewUrl ?? undefined }}
              resizeMode="cover"
              fadeDuration={120}
              style={{ width: "100%", height: "100%" }}
            />
            <View className="absolute inset-0 bg-black/35" />
            <View className="absolute inset-x-0 top-0 px-5 pb-6 pt-6">
              <View className="flex-row items-center justify-between">
                <View className="rounded-full bg-white/14 px-3 py-2">
                  <Text className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/92">
                    Toulouse en ete
                  </Text>
                </View>
                <View className="rounded-full bg-white/14 px-3 py-2">
                  <Text className="text-[11px] font-semibold text-white/92">{favoriteCount} favoris</Text>
                </View>
              </View>
              <Text className="mt-5 max-w-[260px] text-[32px] font-semibold leading-9 text-white">
                Les sorties qui donnent envie de sortir ce soir.
              </Text>
              <Text className="mt-3 max-w-[280px] text-sm leading-6 text-white/78">
                Des visuels plein cadre, des evenements en avant, et un scroll fluide pour capter
                l envie de sortir.
              </Text>
            </View>
            <View className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-16">
              <View className="self-start rounded-full bg-white/14 px-3 py-1.5">
                <Text className="text-xs font-semibold uppercase tracking-wide text-white">
                  {item.category}
                </Text>
              </View>
              <Text className="mt-3 text-[26px] font-semibold leading-8 text-white" numberOfLines={2}>
                {item.title}
              </Text>
              <Text className="mt-2 text-sm text-white/85">{item.displayDate}</Text>
              <Text className="mt-1 text-sm text-white/78" numberOfLines={1}>
                {item.venueName}
              </Text>
            </View>
          </Pressable>
        )}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          setActiveIndex(getCarouselIndex(event, heroWidth));
        }}
      />

      <View className="absolute bottom-5 right-5 flex-row gap-2">
        {heroSlides.map((eventItem, index) => (
          <View
            key={`dot-${eventItem.id}`}
            className={`rounded-full ${index === activeIndex ? "bg-white" : "bg-white/35"}`}
            style={{
              width: index === activeIndex ? 20 : 8,
              height: 8,
            }}
          />
        ))}
      </View>
    </View>
  );
}

function getCarouselIndex(
  event: NativeSyntheticEvent<NativeScrollEvent>,
  heroWidth: number,
): number {
  return Math.round(event.nativeEvent.contentOffset.x / heroWidth);
}
