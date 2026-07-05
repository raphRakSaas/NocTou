import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { FloatingTabBar } from "@/components/FloatingTabBar";
import { HeaderActions } from "@/components/HeaderActions";
import { useTheme } from "@/hooks/useTheme";

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShadowVisible: false,
        headerTransparent: true,
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "600",
          color: colors.text,
        },
        headerRight: () => <HeaderActions />,
        sceneStyle: {
          backgroundColor: colors.background,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.tabBar.activeTint,
        tabBarInactiveTintColor: colors.tabBar.inactiveTint,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          height: 0,
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={20} color={color} />
          ),
          tabBarActiveBackgroundColor: colors.tabBar.activeBackground,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Carte",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "map" : "map-outline"} size={20} color={color} />
          ),
          tabBarActiveBackgroundColor: colors.tabBar.activeBackground,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoris",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={20} color={color} />
          ),
          tabBarActiveBackgroundColor: colors.tabBar.activeBackground,
        }}
      />
    </Tabs>
  );
}
