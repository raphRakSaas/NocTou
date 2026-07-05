import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { FloatingTabBar } from "@/components/FloatingTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "600",
        },
        sceneStyle: {
          backgroundColor: "#F8FAFC",
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#0F172A",
        tabBarInactiveTintColor: "#64748B",
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
          tabBarActiveBackgroundColor: "#E2E8F0",
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
          tabBarActiveBackgroundColor: "#DBEAFE",
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
          tabBarActiveBackgroundColor: "#FCE7F3",
        }}
      />
    </Tabs>
  );
}
