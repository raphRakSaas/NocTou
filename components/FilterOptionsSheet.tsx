import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/useTheme";

export interface FilterSheetOption<T extends string> {
  label: string;
  value: T;
  icon?: keyof typeof Ionicons.glyphMap;
}

interface FilterOptionsSheetProps<T extends string> {
  visible: boolean;
  title: string;
  options: FilterSheetOption<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
  onClose: () => void;
  footerAction?: {
    label: string;
    icon?: keyof typeof Ionicons.glyphMap;
    isSelected?: boolean;
    onPress: () => void;
  };
}

export function FilterOptionsSheet<T extends string>({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
  footerAction,
}: FilterOptionsSheetProps<T>) {
  const { colors } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View className="flex-1 justify-end" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
        <Pressable className="flex-1" onPress={onClose} />
        <View
          className="rounded-t-[28px] px-5 pt-4"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderTopWidth: 1,
            paddingBottom: Math.max(safeAreaInsets.bottom, 16) + 8,
            maxHeight: "70%",
          }}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-semibold" style={{ color: colors.text }}>
              {title}
            </Text>
            <Pressable
              className="h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: colors.surfaceMuted }}
              onPress={onClose}
            >
              <Ionicons name="close" size={18} color={colors.textMuted} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {options.map((option) => {
              const isSelected = option.value === selectedValue;

              return (
                <Pressable
                  key={option.value}
                  className="mb-2 flex-row items-center gap-3 rounded-2xl px-4 py-3.5"
                  style={{
                    backgroundColor: isSelected ? colors.chip.activeBackground : colors.surfaceMuted,
                    borderColor: isSelected ? colors.chip.activeBackground : colors.border,
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    onSelect(option.value);
                    onClose();
                  }}
                >
                  {option.icon ? (
                    <Ionicons
                      name={option.icon}
                      size={18}
                      color={isSelected ? colors.chip.activeText : colors.textMuted}
                    />
                  ) : null}
                  <Text
                    className="flex-1 text-base font-medium"
                    style={{ color: isSelected ? colors.chip.activeText : colors.text }}
                  >
                    {option.label}
                  </Text>
                  {isSelected ? (
                    <Ionicons name="checkmark-circle" size={20} color={colors.chip.activeText} />
                  ) : null}
                </Pressable>
              );
            })}
          </ScrollView>

          {footerAction ? (
            <Pressable
              className="mt-3 flex-row items-center justify-center gap-2 rounded-2xl px-4 py-3.5"
              style={{
                backgroundColor: footerAction.isSelected ? colors.chip.activeBackground : colors.accentSoft,
                borderColor: footerAction.isSelected ? colors.chip.activeBackground : colors.border,
                borderWidth: 1,
              }}
              onPress={() => {
                footerAction.onPress();
                onClose();
              }}
            >
              {footerAction.icon ? (
                <Ionicons
                  name={footerAction.icon}
                  size={18}
                  color={footerAction.isSelected ? colors.chip.activeText : colors.accentSoftText}
                />
              ) : null}
              <Text
                className="text-base font-semibold"
                style={{ color: footerAction.isSelected ? colors.chip.activeText : colors.accentSoftText }}
              >
                {footerAction.label}
              </Text>
              {footerAction.isSelected ? (
                <Ionicons name="checkmark-circle" size={20} color={colors.chip.activeText} />
              ) : null}
            </Pressable>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}
