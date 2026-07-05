import "../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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
            backgroundColor: colors.headerBackground,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "600",
            color: colors.text,
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="event/[id]" options={{ title: "Sortie" }} />
        <Stack.Screen name="settings" options={{ title: "Parametres" }} />
        <Stack.Screen name="legal" options={{ title: "Mentions legales" }} />
        <Stack.Screen name="terms" options={{ title: "CGU" }} />
        <Stack.Screen name="privacy" options={{ title: "Confidentialite" }} />
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
