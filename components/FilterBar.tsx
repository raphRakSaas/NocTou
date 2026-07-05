import { Pressable, ScrollView, Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import type { EventDateFilter, EventFilters, EventSortMode } from "@/types/event";

interface FilterBarProps {
  categories: string[];
  filters: EventFilters;
  onCategoryChange: (category: string) => void;
  onDateFilterChange: (dateFilter: EventDateFilter) => void;
  onSortModeChange: (sortMode: EventSortMode) => void;
  onProximityToggle: (isEnabled: boolean) => void;
  onReset: () => void;
}

const dateOptions: { label: string; value: EventDateFilter }[] = [
  { label: "Toutes les dates", value: "all" },
  { label: "Aujourd'hui", value: "today" },
  { label: "7 jours", value: "week" },
  { label: "30 jours", value: "month" },
];

const sortOptions: { label: string; value: EventSortMode }[] = [
  { label: "Par date", value: "date" },
  { label: "Par proximite", value: "proximity" },
];

export function FilterBar({
  categories,
  filters,
  onCategoryChange,
  onDateFilterChange,
  onSortModeChange,
  onProximityToggle,
  onReset,
}: FilterBarProps) {
  const { colors } = useTheme();

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between px-1">
        <View>
          <Text className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: colors.textMuted }}>
            Explorer
          </Text>
          <Text className="mt-1 text-lg font-semibold" style={{ color: colors.text }}>
            Filtres rapides
          </Text>
        </View>
        <Pressable
          className="rounded-full px-4 py-2"
          style={{ backgroundColor: colors.primaryButton }}
          onPress={onReset}
        >
          <Text className="text-sm font-semibold" style={{ color: colors.primaryButtonText }}>
            Reset
          </Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2 pr-4">
          {sortOptions.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              isActive={filters.sortMode === option.value}
              onPress={() => onSortModeChange(option.value)}
            />
          ))}
          {dateOptions.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              isActive={filters.dateFilter === option.value}
              onPress={() => onDateFilterChange(option.value)}
            />
          ))}
          <FilterChip
            label={filters.proximityEnabled ? "Proximite active" : "Proximite"}
            isActive={filters.proximityEnabled}
            onPress={() => onProximityToggle(!filters.proximityEnabled)}
          />
        </View>
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2 pr-4">
          <FilterChip
            label="Toutes"
            isActive={filters.category === "all"}
            onPress={() => onCategoryChange("all")}
          />
          {categories.map((category) => (
            <FilterChip
              key={category}
              label={category}
              isActive={filters.category === category}
              onPress={() => onCategoryChange(category)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

function FilterChip({ label, isActive, onPress }: FilterChipProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      className="rounded-full border px-4 py-2"
      style={{
        backgroundColor: isActive ? colors.chip.activeBackground : colors.chip.background,
        borderColor: isActive ? colors.chip.activeBackground : colors.chip.border,
      }}
      onPress={onPress}
    >
      <Text
        className="text-sm font-medium"
        style={{ color: isActive ? colors.chip.activeText : colors.chip.text }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
