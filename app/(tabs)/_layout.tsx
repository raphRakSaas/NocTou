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
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.tabBar.activeTint,
        tabBarInactiveTintColor: colors.tabBar.inactiveTint,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
          paddingHorizontal: 6,
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          flex: 1,
          marginHorizontal: 2,
          borderRadius: 999,
          overflow: "hidden",
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          marginBottom: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          headerTitle: "NocTou",
          tabBarIconStyle: {
            marginTop: 1,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={18} color={color} />
          ),
          tabBarActiveBackgroundColor: colors.tabBar.activeHome,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Carte",
          headerTitle: "Carte des sorties",
          tabBarIconStyle: {
            marginTop: 1,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "map" : "map-outline"} size={18} color={color} />
          ),
          tabBarActiveBackgroundColor: colors.tabBar.activeMap,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoris",
          headerTitle: "Vos favoris",
          tabBarIconStyle: {
            marginTop: 1,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={18} color={color} />
          ),
          tabBarActiveBackgroundColor: colors.tabBar.activeFavorites,
        }}
      />
    </Tabs>
  );
}
