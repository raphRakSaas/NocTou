import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";

import { getCategoryIcon } from "@/constants/categoryIcons";
import { GlassSurface } from "@/components/GlassSurface";
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

const dateOptions: { label: string; value: EventDateFilter; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: "Toutes", value: "all", icon: "apps-outline" },
  { label: "Aujourd'hui", value: "today", icon: "today-outline" },
  { label: "7 jours", value: "week", icon: "calendar-outline" },
  { label: "30 jours", value: "month", icon: "calendar-number-outline" },
];

const sortOptions: { label: string; value: EventSortMode; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: "Date", value: "date", icon: "time-outline" },
  { label: "Proche", value: "proximity", icon: "navigate-outline" },
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
  return (
    <View className="gap-3">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2 pr-4">
          {sortOptions.map((option) => (
            <FilterChip
              key={option.value}
              icon={option.icon}
              label={option.label}
              isActive={filters.sortMode === option.value}
              onPress={() => onSortModeChange(option.value)}
            />
          ))}
          {dateOptions.map((option) => (
            <FilterChip
              key={option.value}
              icon={option.icon}
              label={option.label}
              isActive={filters.dateFilter === option.value}
              onPress={() => onDateFilterChange(option.value)}
            />
          ))}
          <FilterChip
            icon="locate-outline"
            label={filters.proximityEnabled ? "Proche actif" : "Proche"}
            isActive={filters.proximityEnabled}
            onPress={() => onProximityToggle(!filters.proximityEnabled)}
          />
          <FilterChip icon="refresh-outline" label="Reset" isActive={false} onPress={onReset} />
        </View>
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2 pr-4">
          <FilterChip
            icon="grid-outline"
            label="Toutes"
            isActive={filters.category === "all"}
            onPress={() => onCategoryChange("all")}
          />
          {categories.map((category) => (
            <FilterChip
              key={category}
              icon={getCategoryIcon(category)}
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
  icon: keyof typeof Ionicons.glyphMap;
  isActive: boolean;
  onPress: () => void;
}

function FilterChip({ label, icon, isActive, onPress }: FilterChipProps) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <GlassSurface borderRadius={999}>
        <View
          className="flex-row items-center gap-2 px-4 py-2.5"
          style={{
            backgroundColor: isActive ? colors.chip.activeBackground : "transparent",
          }}
        >
          <Ionicons name={icon} size={14} color={isActive ? colors.chip.activeText : colors.textMuted} />
          <Text
            className="text-sm font-medium"
            style={{ color: isActive ? colors.chip.activeText : colors.text }}
          >
            {label}
          </Text>
        </View>
      </GlassSurface>
    </Pressable>
  );
}
