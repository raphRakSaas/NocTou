import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
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
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 20,
          height: 76,
          paddingTop: 7,
          paddingBottom: 9,
          paddingHorizontal: 8,
          borderTopWidth: 0,
          borderRadius: 999,
          backgroundColor: "#FFFFFF",
          shadowColor: "#0F172A",
          shadowOpacity: 0.12,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
          elevation: 10,
        },
        tabBarItemStyle: {
          flex: 1,
          marginHorizontal: 0,
          borderRadius: 999,
          overflow: "hidden",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginBottom: 2,
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
            <Ionicons name={focused ? "home" : "home-outline"} size={20} color={color} />
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
            <Ionicons name={focused ? "map" : "map-outline"} size={20} color={color} />
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
            <Ionicons name={focused ? "heart" : "heart-outline"} size={20} color={color} />
          ),
          tabBarActiveBackgroundColor: "#FCE7F3",
        }}
      />
    </Tabs>
  );
}
