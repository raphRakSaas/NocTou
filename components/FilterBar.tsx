import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState, type ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { EventDatePickerModal } from "@/components/EventDatePickerModal";
import { GlassSurface } from "@/components/GlassSurface";
import { getCategoryIcon } from "@/constants/categoryIcons";
import { useTheme } from "@/hooks/useTheme";
import type { EventDateFilter, EventFilters, EventSortMode } from "@/types/event";
import { formatIsoDateLabel, parseEventDate, toIsoDateString } from "@/utils/events";

interface FilterBarProps {
  categories: string[];
  filters: EventFilters;
  onCategoryChange: (category: string) => void;
  onDateFilterChange: (dateFilter: EventDateFilter) => void;
  onSelectedDateChange: (selectedDate: string | null) => void;
  onSortModeChange: (sortMode: EventSortMode) => void;
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
  { label: "Proximite", value: "proximity", icon: "navigate-outline" },
];

export function FilterBar({
  categories,
  filters,
  onCategoryChange,
  onDateFilterChange,
  onSelectedDateChange,
  onSortModeChange,
  onReset,
}: FilterBarProps) {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const pickerDate = useMemo(
    () => (filters.selectedDate ? parseEventDate(filters.selectedDate) : new Date()),
    [filters.selectedDate],
  );
  const selectedDateLabel = filters.selectedDate ? formatIsoDateLabel(filters.selectedDate) : "Choisir";

  return (
    <View className="gap-3">
      <ChipRow>
        {sortOptions.map((option) => (
          <FilterChip
            key={option.value}
            icon={option.icon}
            label={option.label}
            isActive={filters.sortMode === option.value}
            onPress={() => onSortModeChange(option.value)}
          />
        ))}
        <FilterChip icon="refresh-outline" label="Reset" isActive={false} onPress={onReset} />
      </ChipRow>

      <ChipRow>
        {dateOptions.map((option) => (
          <FilterChip
            key={option.value}
            icon={option.icon}
            label={option.label}
            isActive={!filters.selectedDate && filters.dateFilter === option.value}
            onPress={() => onDateFilterChange(option.value)}
          />
        ))}
        <FilterChip
          icon="calendar-outline"
          label={selectedDateLabel}
          isActive={Boolean(filters.selectedDate)}
          onPress={() => setIsDatePickerVisible(true)}
        />
      </ChipRow>

      <ChipRow>
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
      </ChipRow>

      <EventDatePickerModal
        visible={isDatePickerVisible}
        selectedDate={pickerDate}
        onCancel={() => setIsDatePickerVisible(false)}
        onConfirm={(dateValue) => {
          onSelectedDateChange(toIsoDateString(dateValue));
          setIsDatePickerVisible(false);
        }}
      />
    </View>
  );
}

function ChipRow({ children }: { children: ReactNode }) {
  const { colors } = useTheme();

  return (
    <View style={{ position: "relative" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2 pr-4">{children}</View>
      </ScrollView>
      <LinearGradient
        colors={["transparent", colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        pointerEvents="none"
        style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 28 }}
      />
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
            numberOfLines={1}
          >
            {label}
          </Text>
        </View>
      </GlassSurface>
    </Pressable>
  );
}
