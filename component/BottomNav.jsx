// components/BottomNav.jsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

const BottomNav = ({ active, onNavigate }) => {
  const navItems = [
    { key: "home", label: "Home", icon: "home-outline", iconSet: "Ionicons" },
    { key: "inventory", label: "Inventory", icon: "package", iconSet: "Feather" },
    { key: "markets", label: "map-pin", iconSet: "Feather" },
    { key: "equipment", label: "wrench", iconSet: "Feather" },
    { key: "community", label: "chatbubble-outline", iconSet: "Ionicons" },
  ];

  const renderIcon = (item, isActive) => {
    const color = isActive ? "#bd9e4b" : "#9ca3af"; // primary vs gray
    if (item.iconSet === "Ionicons") {
      return <Ionicons name={item.icon} size={22} color={color} />;
    }
    if (item.iconSet === "Feather") {
      return <Feather name={item.icon} size={22} color={color} />;
    }
    return null;
  };

  return (
    <View className="flex-row justify-around items-center bg-white border-t border-gray-200 py-3">
      {navItems.map((item) => {
        const isActive = active === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            className="items-center"
            onPress={() => onNavigate && onNavigate(item.key)}
          >
            {renderIcon(item, isActive)}
            <Text
              className={`text-xs mt-1 ${
                isActive ? "text-primary font-semibold" : "text-gray-400"
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNav;
