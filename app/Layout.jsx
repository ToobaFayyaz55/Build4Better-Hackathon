// component/Layout.jsx
import { useState } from "react";
import { View } from "react-native";
import Footer from "../component/Footer";
import SplashScreen from "./(auth)/SplashScreen";
import KisaanPost from "./(bulletin)/KisaanPost";
import Dashboard from "./(dashboard)/Dashboard";
import EquipmentHub from "./(equipment)/EquipmentHub";
import InventoryScreen from "./(inventory)/InventoryScreen";
import MarketWelcome from "./(market)/Market";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("home"); // default home

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <Dashboard />;
      case "inventory":
        return <InventoryScreen />;
        case "markets":
          return <MarketWelcome />;
      case "equipment":
        return <EquipmentHub />;
      case "community":
        return <KisaanPost />;
      default:
        return <SplashScreen />;
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
