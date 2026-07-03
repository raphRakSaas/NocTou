import "../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { FavoritesProvider } from "@/providers/FavoritesProvider";

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
        <FavoritesProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: "600",
              },
              contentStyle: {
                backgroundColor: "#F8FAFC",
              },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="event/[id]" options={{ title: "Sortie" }} />
            <Stack.Screen name="legal" options={{ title: "Mentions legales" }} />
          </Stack>
        </FavoritesProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
