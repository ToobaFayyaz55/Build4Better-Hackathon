import { useState } from "react";
import { ScrollView, View } from "react-native";
import DashboardHeader from "../../component/dashboard/DashboardHeader";
import ExpiringAlert from "../../component/dashboard/ExpiringAlert";
import FarmingTip from "../../component/dashboard/FarmingTip";
import QuickActions from "../../component/dashboard/QuickActions";
import StatsGrid from "../../component/dashboard/StatsGrid";
import { stats } from "../../constants/dashboard";

const HomeDashboard = ({ setActiveTab, onShowNotifications }) => {
  const [unreadNotifications] = useState(4);

  const handleStatPress = (statId) => {
    switch (statId) {
      case "produce":
      case "fresh":
        setActiveTab("inventory");
        break;
      case "equipment":
        setActiveTab("equipment");
        break;
      case "markets":
        setActiveTab("markets");
        break;
      default:
        break;
    }
  };

  const handleExpiringPress = () => {
    setActiveTab("inventory");
  };
  const handleNotificationPress = () => {
    router.push("/Notifications");
  };
  const handleAddProducePress = () => {
    setActiveTab("inventory");
  };
  const handleFindMarketsPress = () => {
    setActiveTab("markets");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DashboardHeader
        unreadNotifications={unreadNotifications}
        onNotificationPress={onShowNotifications}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
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
