import { View } from "react-native";

export function HomeFeedSkeleton() {
  return (
    <View className="flex-1 bg-slate-50 px-4 pt-4">
      <View className="h-[320px] rounded-[32px] bg-slate-200" />

      <View className="mt-5 h-12 rounded-full bg-slate-100" />

      <View className="mt-6">
        <View className="h-5 w-36 rounded-full bg-slate-200" />
        <View className="mt-4 flex-row gap-4">
          <View className="h-[250px] flex-1 rounded-[28px] bg-slate-200" />
          <View className="h-[250px] flex-1 rounded-[28px] bg-slate-100" />
        </View>
      </View>

      <View className="mt-6">
        <View className="h-5 w-40 rounded-full bg-slate-200" />
        <View className="mt-4 h-[180px] rounded-[28px] bg-white" />
        <View className="mt-4 h-[180px] rounded-[28px] bg-white" />
      </View>
    </View>
  );
}
