import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Modal, Platform, Pressable, Text, TextInput, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { toIsoDateString } from "@/utils/events";

interface EventDatePickerModalProps {
  visible: boolean;
  selectedDate: Date;
  onConfirm: (dateValue: Date) => void;
  onCancel: () => void;
}

export function EventDatePickerModal({
  visible,
  selectedDate,
  onConfirm,
  onCancel,
}: EventDatePickerModalProps) {
  const { colors } = useTheme();
  const [draftDate, setDraftDate] = useState(selectedDate);
  const [webDateValue, setWebDateValue] = useState(toIsoDateString(selectedDate));

  useEffect(() => {
    if (visible) {
      setDraftDate(selectedDate);
      setWebDateValue(toIsoDateString(selectedDate));
    }
  }, [selectedDate, visible]);

  if (Platform.OS === "android" && visible) {
    return (
      <DateTimePicker
        value={draftDate}
        mode="date"
        display="default"
        onChange={(event: DateTimePickerEvent, dateValue?: Date) => {
          if (event.type === "dismissed" || !dateValue) {
            onCancel();
            return;
          }

          onConfirm(dateValue);
        }}
      />
    );
  }

  if (Platform.OS === "web") {
    if (!visible) {
      return null;
    }

    return (
      <Modal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
        <View className="flex-1 items-center justify-center px-6" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
          <View
            className="w-full max-w-sm rounded-[28px] p-5"
            style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
          >
            <Text className="text-lg font-semibold" style={{ color: colors.text }}>
              Choisir une date
            </Text>
            <TextInput
              value={webDateValue}
              onChangeText={setWebDateValue}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.textMuted}
              className="mt-4 rounded-2xl px-4 py-3 text-base"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
                borderWidth: 1,
                color: colors.text,
              }}
            />
            <View className="mt-5 flex-row gap-3">
              <Pressable
                className="flex-1 items-center rounded-full py-3"
                style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1 }}
                onPress={onCancel}
              >
                <Text className="font-semibold" style={{ color: colors.text }}>
                  Annuler
                </Text>
              </Pressable>
              <Pressable
                className="flex-1 items-center rounded-full py-3"
                style={{ backgroundColor: colors.accent }}
                onPress={() => {
                  const nextDate = new Date(`${webDateValue}T12:00:00`);

                  if (Number.isNaN(nextDate.getTime())) {
                    return;
                  }

                  onConfirm(nextDate);
                }}
              >
                <Text className="font-semibold text-white">Valider</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
      <View className="flex-1 justify-end" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
        <View
          className="rounded-t-[28px] px-5 pb-8 pt-4"
          style={{ backgroundColor: colors.surface, borderColor: colors.border, borderTopWidth: 1 }}
        >
          <Text className="mb-3 text-center text-base font-semibold" style={{ color: colors.text }}>
            Choisir une date
          </Text>
          <DateTimePicker
            value={draftDate}
            mode="date"
            display="spinner"
            locale="fr-FR"
            onChange={(_event: DateTimePickerEvent, dateValue?: Date) => {
              if (dateValue) {
                setDraftDate(dateValue);
              }
            }}
          />
          <View className="mt-2 flex-row gap-3">
            <Pressable
              className="flex-1 items-center rounded-full py-3"
              style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1 }}
              onPress={onCancel}
            >
              <Text className="font-semibold" style={{ color: colors.text }}>
                Annuler
              </Text>
            </Pressable>
            <Pressable
              className="flex-1 items-center rounded-full py-3"
              style={{ backgroundColor: colors.accent }}
              onPress={() => onConfirm(draftDate)}
            >
              <Text className="font-semibold text-white">Valider</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
