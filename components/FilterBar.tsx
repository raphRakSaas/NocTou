import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { EventDatePickerModal } from "@/components/EventDatePickerModal";
import { FilterOptionsSheet } from "@/components/FilterOptionsSheet";
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

type FilterPanel = "date" | "category" | "sort" | null;

const dateOptions: { label: string; value: EventDateFilter; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: "Toutes les dates", value: "all", icon: "apps-outline" },
  { label: "Aujourd'hui", value: "today", icon: "today-outline" },
  { label: "7 prochains jours", value: "week", icon: "calendar-outline" },
  { label: "30 prochains jours", value: "month", icon: "calendar-number-outline" },
];

const sortOptions: { label: string; value: EventSortMode; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: "Par date", value: "date", icon: "time-outline" },
  { label: "Par proximite", value: "proximity", icon: "navigate-outline" },
];

function getDateFilterLabel(filters: EventFilters): string {
  if (filters.selectedDate) {
    return formatIsoDateLabel(filters.selectedDate);
  }

  switch (filters.dateFilter) {
    case "today":
      return "Aujourd'hui";
    case "week":
      return "7 jours";
    case "month":
      return "30 jours";
    default:
      return "Date";
  }
}

function getCategoryLabel(category: string): string {
  return category === "all" ? "Categorie" : category;
}

function getSortLabel(sortMode: EventSortMode): string {
  return sortMode === "proximity" ? "Proche" : "Tri";
}

function hasActiveFilters(filters: EventFilters): boolean {
  return (
    filters.category !== "all" ||
    filters.dateFilter !== "all" ||
    filters.selectedDate !== null ||
    filters.sortMode === "proximity"
  );
}

export function FilterBar({
  categories,
  filters,
  onCategoryChange,
  onDateFilterChange,
  onSelectedDateChange,
  onSortModeChange,
  onReset,
}: FilterBarProps) {
  const { colors } = useTheme();
  const [activePanel, setActivePanel] = useState<FilterPanel>(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const pickerDate = useMemo(
    () => (filters.selectedDate ? parseEventDate(filters.selectedDate) : new Date()),
    [filters.selectedDate],
  );

  const categoryOptions = useMemo(
    () => [
      { label: "Toutes les categories", value: "all", icon: "grid-outline" as const },
      ...categories.map((category) => ({
        label: category,
        value: category,
        icon: getCategoryIcon(category),
      })),
    ],
    [categories],
  );

  const dateSheetValue = filters.selectedDate ? "custom" : filters.dateFilter;
  const isDateActive = filters.dateFilter !== "all" || filters.selectedDate !== null;
  const isCategoryActive = filters.category !== "all";
  const isSortActive = filters.sortMode === "proximity";

  return (
    <View className="gap-2">
      <View className="flex-row gap-2">
        <FilterTriggerButton
          icon="calendar-outline"
          label={getDateFilterLabel(filters)}
          isActive={isDateActive}
          onPress={() => setActivePanel("date")}
        />
        <FilterTriggerButton
          icon={filters.category === "all" ? "grid-outline" : getCategoryIcon(filters.category)}
          label={getCategoryLabel(filters.category)}
          isActive={isCategoryActive}
          onPress={() => setActivePanel("category")}
        />
        <FilterTriggerButton
          icon={filters.sortMode === "proximity" ? "navigate-outline" : "time-outline"}
          label={getSortLabel(filters.sortMode)}
          isActive={isSortActive}
          onPress={() => setActivePanel("sort")}
        />
      </View>

      {hasActiveFilters(filters) ? (
        <Pressable className="self-start flex-row items-center gap-1.5 px-1 py-1" onPress={onReset}>
          <Ionicons name="refresh-outline" size={14} color={colors.accent} />
          <Text className="text-sm font-medium" style={{ color: colors.accentSoftText }}>
            Reinitialiser les filtres
          </Text>
        </Pressable>
      ) : null}

      <FilterOptionsSheet
        visible={activePanel === "date"}
        title="Quand ?"
        options={dateOptions}
        selectedValue={dateSheetValue === "custom" ? ("none" as EventDateFilter) : dateSheetValue}
        onSelect={onDateFilterChange}
        onClose={() => setActivePanel(null)}
        footerAction={{
          label: filters.selectedDate ? formatIsoDateLabel(filters.selectedDate) : "Choisir une date",
          icon: "calendar-outline",
          isSelected: Boolean(filters.selectedDate),
          onPress: () => setIsDatePickerVisible(true),
        }}
      />

      <FilterOptionsSheet
        visible={activePanel === "category"}
        title="Quoi ?"
        options={categoryOptions}
        selectedValue={filters.category}
        onSelect={onCategoryChange}
        onClose={() => setActivePanel(null)}
      />

      <FilterOptionsSheet
        visible={activePanel === "sort"}
        title="Trier par"
        options={sortOptions}
        selectedValue={filters.sortMode}
        onSelect={onSortModeChange}
        onClose={() => setActivePanel(null)}
      />

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

interface FilterTriggerButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

function FilterTriggerButton({ icon, label, isActive, onPress }: FilterTriggerButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable className="flex-1" onPress={onPress}>
      <GlassSurface borderRadius={20}>
        <View
          className="flex-row items-center justify-center gap-1.5 px-3 py-3"
          style={{
            backgroundColor: isActive ? colors.chip.activeBackground : "transparent",
          }}
        >
          <Ionicons
            name={icon}
            size={15}
            color={isActive ? colors.chip.activeText : colors.textMuted}
          />
          <Text
            className="flex-1 text-sm font-semibold"
            style={{ color: isActive ? colors.chip.activeText : colors.text }}
            numberOfLines={1}
          >
            {label}
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={isActive ? colors.chip.activeText : colors.textMuted}
          />
        </View>
      </GlassSurface>
    </Pressable>
  );
}
