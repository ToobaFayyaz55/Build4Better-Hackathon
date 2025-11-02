import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import DashboardHeader from "../../component/dashboard/DashboardHeader";
import ExpiringAlert from "../../component/dashboard/ExpiringAlert";
import FarmingTip from "../../component/dashboard/FarmingTip";
import QuickActions from "../../component/dashboard/QuickActions";
import StatsGrid from "../../component/dashboard/StatsGrid";

const HomeDashboard = () => {
  const router = useRouter();
  const [unreadNotifications] = useState(4);

  // Stats data
  const stats = [
    {
      id: "produce",
      title: "Total Produce",
      value: "12",
      description: "Items in inventory",
      icon: "package",
      color: "#bd9e4b",
    },
    {
      id: "fresh",
      title: "Fresh Items",
      value: "8",
      description: "Good condition",
      icon: "leaf",
      color: "#22c55e",
    },
    {
      id: "equipment",
      title: "Equipment",
      value: "5",
      description: "Available to share",
      icon: "tool",
      color: "#f59e0b",
    },
    {
      id: "markets",
      title: "Markets",
      value: "3",
      description: "Within 10km",
      icon: "trending-up",
      color: "#3b82f6",
    },
  ];

  // Navigation handlers
  const handleStatPress = (statId) => {
    if (statId === "produce") router.push("/inventory");
    else if (statId === "fresh") router.push("/inventory?filter=fresh");
    else if (statId === "equipment") router.push("/equipment");
    else if (statId === "markets") router.push("/market");
  };

  const handleExpiringPress = () => {
    router.push("/(inventory)/InventoryScreen?filter=expiring");
  };

  const handleNotificationPress = () => {
    router.push("/(dashboard)/Notifications");
  };

  const handleAddProducePress = () => {
    router.push("/(inventory)/InventoryScreen");
  };

  const handleFindMarketsPress = () => {
    router.push("/(market)/Market");
  };

  return (
    <View className="flex-1 bg-white">
      <DashboardHeader
        unreadNotifications={unreadNotifications}
        onNotificationPress={handleNotificationPress}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <StatsGrid stats={stats} onStatPress={handleStatPress} />
        <ExpiringAlert onPress={handleExpiringPress} />
        <QuickActions
          onAddProducePress={handleAddProducePress}
          onFindMarketsPress={handleFindMarketsPress}
        />
        <FarmingTip />
      </ScrollView>
    </View>
  );
};

export default HomeDashboard;
