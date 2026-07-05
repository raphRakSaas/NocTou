import "../global.css";

import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/useTheme";
import { FavoritesProvider } from "@/providers/FavoritesProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

function RootNavigator() {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar style={colors.statusBarStyle} />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "600",
            color: colors.text,
          },
          headerBackTitle: "",
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <Pressable
                accessibilityLabel="Retour"
                className="ml-1 h-10 w-10 items-center justify-center rounded-full"
                hitSlop={8}
                style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1 }}
                onPress={() => router.back()}
              >
                <Ionicons name="chevron-back" size={20} color={colors.text} />
              </Pressable>
            ) : null,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "" }} />
        <Stack.Screen name="event/[id]" options={{ title: "" }} />
        <Stack.Screen name="settings" options={{ title: "" }} />
        <Stack.Screen name="legal" options={{ title: "" }} />
        <Stack.Screen name="terms" options={{ title: "" }} />
        <Stack.Screen name="privacy" options={{ title: "" }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnReconnect: true,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <FavoritesProvider>
            <RootNavigator />
          </FavoritesProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
