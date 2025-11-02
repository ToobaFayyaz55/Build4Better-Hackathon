import { useState } from "react";
import { View } from "react-native";
import Footer from "../component/Footer";
import SplashScreen from "./(auth)/SplashScreen";
import KisaanPost from "./(bulletin)/KisaanPost";
import HomeDashboard from "./(dashboard)/Dashboard";
import NotificationsScreen from "./(dashboard)/Notifications";
import EquipmentHub from "./(equipment)/EquipmentHub";
import InventoryScreen from "./(inventory)/InventoryScreen";
import SahoolatBazaar from "./(market)/Market";


const Layout = () => {
  const [activeTab, setActiveTab] = useState("home"); // default home
  const [showNotifications, setShowNotifications] = useState(false);

  const renderScreen = () => {
    if (showNotifications) {
      return (
        <NotificationsScreen
          setActiveTab={setActiveTab}
          onClose={() => setShowNotifications(false)}
        />
      );
    }

    switch (activeTab) {
      case "home":
        return (
          <HomeDashboard
            onShowNotifications={() => setShowNotifications(true)}
            setActiveTab={setActiveTab}
          />
        );
      case "inventory":
        return <InventoryScreen />;
        case "markets":
          return <SahoolatBazaar />;
      case "equipment":
        return <EquipmentHub />;
      case "community":
        return <KisaanPost />;
      default:
        return <SplashScreen/>;
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{renderScreen()}</View>
      <Footer active={activeTab} onNavigate={setActiveTab} />
    </View>
  );
};

export default Layout;
