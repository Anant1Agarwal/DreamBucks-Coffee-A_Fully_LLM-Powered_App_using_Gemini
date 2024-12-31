import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#285F43",
        }}
      >
      {/* <Tabs> */}
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="home" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="ChatRoom"
          options={{
            headerShown: true,
            tabBarStyle: { display:"flex" },
            title: "Chat Bot",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="robot" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="orderDetails"
          options={{
            headerShown: true,
            tabBarStyle: { display: "flex" },
            title: "Cart",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="shopping-cart" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
