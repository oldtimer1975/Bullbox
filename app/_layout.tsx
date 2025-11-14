import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#e63946",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarStyle: {
          height: 66,
          paddingBottom: 10,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="courier"
        options={{
          title: "Futár",
          tabBarIcon: ({ color }) => <Ionicons name="bicycle" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="package"
        options={{
          title: "Csomag",
          tabBarIcon: ({ color }) => <Ionicons name="cube" size={20} color={color} />,
        }}
      />
      {/* add the rest of your tabs as Screens here with correct names and icons */}
    </Tabs>
  );
}
